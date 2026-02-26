const DashboardHeader = ({ currentUser, onLogout }) => {
  const firstLetter = currentUser.firstName.charAt(0).toUpperCase()

  return (
    <header className="dashboard-header-main">
      {/* Left */}
           <div className="header-left">
          <h1 className="app-title">
             TaskManagerPro<span>Pro</span>
           </h1>
           </div>


      {/* Right */}
      <div className="user-area">
        <div className="user-avatar">{firstLetter}</div>

        <div className="user-info">
          <span className="user-name">
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </div>

        <button className="btn btn-secondary logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
