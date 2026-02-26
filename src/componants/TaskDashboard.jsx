import { useState } from 'react'
import TaskItem from './TaskItem'


const TaskDashboard = ({ 
  tasks,
  toggleTask, 
  addTask, 
  deleteTask, 
  filter, 
  setFilter, 
  clearCompleted,
  progress,
  totalTasks
}) => {
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask)
      setNewTask('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h3 className="dashboard-title">Task Dashboard</h3>
          <div className="dashboard-subtitle">
            <span className="task-count">{tasks.filter(t => t.completed).length} of {tasks.length} completed</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-badge">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-badge completed">
            <span className="stat-number">{tasks.filter(t => t.completed).length}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>
      </div>

      <div className="task-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className="clear-btn"
          onClick={clearCompleted}
          disabled={tasks.filter(t => t.completed).length === 0}
        >
          Clear Completed
        </button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h4>No tasks found</h4>
            <p>Add a new task to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>

      <div className="add-task">
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="task-input"
          />
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button 
            onClick={handleAddTask}
            className="add-btn"
            disabled={!newTask.trim()}
          >
            <span className="add-icon">+</span>
            Add Task
          </button>
        </div>
        <div className="task-tips">
          <span className="tip">💡 Press Enter to add quickly</span>
          <span className="tip">✨ Drag to reorder tasks</span>
        </div>
      </div>
    </div>
  )
}

export default TaskDashboard