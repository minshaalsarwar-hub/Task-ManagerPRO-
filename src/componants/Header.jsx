const Header = ({ onGetStarted, onLoginClick, showHeader }) => {
  // showHeader = true agar homepage ya landing page pe ho, false agar dashboard pe ho
  if (!showHeader) return null; // dashboard ke liye header hide

  return (
    <header className="header-section">
      <h1 className="title">TaskManagerPro</h1>

      <div className="subheader">
        <h2 className="subtitle">Organize Your Tasks</h2>
        <h3 className="tagline">Smartly & Efficiently</h3>
      </div>
      
      <p className="description">
        The ultimate task management solution for teams and individuals. 
        Stay organized, boost productivity, and achieve your goals faster.
      </p>
      
      <div className="buttons">
       <div className="buttons">
  <button className="home-btn get-started-btn" onClick={onGetStarted}>
    Get Started Free
  </button>
  <button className="home-btn login-btn" onClick={onLoginClick}>
    Login
  </button>
</div>

      </div>
    </header>
  )
}

export default Header
