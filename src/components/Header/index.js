import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <nav>
        <div className="header-container">
          <Link to="/">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </li>
          </Link>
          <ul className="nav-menu">
            <Link to="/">
              <li className="home">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="jobs">Jobs</li>
            </Link>
          </ul>
          <button type="button" className="btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Header)
