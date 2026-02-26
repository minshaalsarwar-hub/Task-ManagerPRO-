import { useState, useEffect } from 'react'
import EditTaskModal from './EditTaskModal'

const UserTaskDashboard = ({ currentUser, setCurrentUser }) => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingTask, setEditingTask] = useState(null)

  // 🔹 Notification toggle state
  const [notificationsOn, setNotificationsOn] = useState(true)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === currentUser.email)
    if (user?.tasks) setTasks(user.tasks)
    if (user?.notificationsOn !== undefined) setNotificationsOn(user.notificationsOn)
  }, [currentUser])

  const saveTasks = updatedTasks => {
    setTasks(updatedTasks)
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map(u =>
      u.email === currentUser.email ? { ...u, tasks: updatedTasks } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setCurrentUser(prev => ({ ...prev, tasks: updatedTasks }))
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, tasks: updatedTasks }))
  }

  const saveNotifications = newState => {
    setNotificationsOn(newState)
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map(u =>
      u.email === currentUser.email ? { ...u, notificationsOn: newState } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setCurrentUser(prev => ({ ...prev, notificationsOn: newState }))
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, notificationsOn: newState }))
  }

  const addTask = () => {
    if (!title.trim()) return
    const newTask = { id: Date.now(), title, description, completed: false }
    saveTasks([...tasks, newTask])
    clearForm()

    // 🔔 Browser notification if enabled
    if (notificationsOn) {
      if (Notification.permission === "granted") {
        new Notification("Task Added!", { body: newTask.title, icon: "/favicon.ico" })
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Task Added!", { body: newTask.title, icon: "/favicon.ico" })
          }
        })
      }
    }
  }

  const clearForm = () => { setTitle(''); setDescription('') }

  const deleteTask = id => saveTasks(tasks.filter(t => t.id !== id))
  const completeTask = id => saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const updateTask = updatedTask => { saveTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t))); setEditingTask(null) }

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed

  return (
    <div className="user-dashboard">
      <div className="welcome-box">
        <h2>Welcome, {currentUser.firstName}!</h2>
        <p>Manage your tasks efficiently with our task manager</p>
      </div>

      <div className="stats-row">
        <div className="stat-card"><h3>{total}</h3><p>Total Tasks</p></div>
        <div className="stat-card"><h3>{completed}</h3><p>Completed</p></div>
        <div className="stat-card"><h3>{pending}</h3><p>Pending</p></div>
      </div>

      <div className="tasks-row">
        {/* Add Task Box */}
        <div className="add-task-box">
          <h3>Add New Task</h3>
          <input type="text" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Task description" value={description} onChange={e => setDescription(e.target.value)} />
          <div className="btn-group">
            <button onClick={addTask} className="btn-primary">Add Task</button>
            <button onClick={clearForm} className="btn-secondary">Clear</button>
          </div>

          {/* 🔹 Notification Toggle */}
          <div className="notif-toggle" onClick={() => saveNotifications(!notificationsOn)}>
            <span>Notifications</span>
            <div className={`toggle-switch ${notificationsOn ? 'on' : ''}`}>
              <div className="switch-knob"></div>
            </div>
          </div>
        </div>

        {/* Show Tasks */}
        <div className="show-task-box">
          <h3>Your Tasks</h3>
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <div className="task-actions">
                <button className="complete-btn" onClick={() => completeTask(task.id)}>✔</button>
                <button className="edit-btn" onClick={() => setEditingTask(task)}>✏</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Edit Modal */}
      {editingTask && (
        <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} onSave={updateTask} />
      )}
    </div>
  )
}

export default UserTaskDashboard
