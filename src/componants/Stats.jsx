const Stats = ({ totalTasks, completedTasks, progress }) => {
  return (
    <div className="stats-section">
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-number">10,000+</div>
        <div className="stat-label">Happy Users</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-number">5,00,000+</div>
        <div className="stat-label">Active Tasks</div>
        {/* <div className="stat-subtext">{completedTasks} completed</div> */}
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-number">99.9%</div>
        <div className="stat-label">Satisfaction</div>
        <div className="progress-circle">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="27" fill="none" stroke="#e2e8f0" strokeWidth="4"/>
            <circle cx="30" cy="30" r="27" fill="none" stroke="url(#gradient)" 
              strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${progress * 1.7} 170`}
              transform="rotate(-90 30 30)"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
            <text x="30" y="35" textAnchor="middle" fontSize="12" fill="#4a5568" fontWeight="600">
              {progress}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Stats