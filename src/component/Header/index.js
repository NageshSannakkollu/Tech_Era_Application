import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <Link to="/">
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo-image"
      />
    </div>
  </Link>
)

export default Header
