import { useState } from 'react'

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#f56565'
      case 'medium': return '#ed8936'
      case 'low': return '#48bb78'
      default: return '#a0aec0'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="task-left">
        <button 
          className={`checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => toggleTask(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <span className="checkmark">✓</span>
          ) : null}
        </button>
        
        <div className="task-content">
          <span className="task-text">{task.text}</span>
          <div className="task-meta">
            <span 
              className="priority-badge"
              style={{ 
                backgroundColor: getPriorityColor(task.priority) + '20',
                color: getPriorityColor(task.priority)
              }}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="due-date">
              <span className="date-icon">📅</span>
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        {isHovered && (
          <>
            <button 
              className="action-btn edit-btn"
              aria-label="Edit task"
            >
              ✏️
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TaskItem