import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickEvent = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <div className="mainContainer">
      <nav className="headerPage">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="unOrderList">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <button type="button" className="logoutButton" onClick={onClickEvent}>
          Logout
        </button>
      </nav>
      <hr className="horizontalLine" />
    </div>
  )
}
export default withRouter(Header)
