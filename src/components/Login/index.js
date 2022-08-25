import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', displayError: false, errorMsg: ''}

  userNameUpdate = event => {
    this.setState({username: event.target.value})
  }

  passwordUpdate = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureMessage = errorMsg => {
    this.setState({displayError: true, errorMsg})
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.failureMessage(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, displayError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="mainContainer">
        <div className="subContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <form onSubmit={this.onSubmittingForm}>
            <label htmlFor="userId">USERNAME</label>
            <input
              id="userId"
              type="text"
              value={username}
              onChange={this.userNameUpdate}
              placeholder="Username"
            />
            <label htmlFor="passwordId">PASSWORD</label>
            <input
              id="passwordId"
              value={password}
              type="password"
              onChange={this.passwordUpdate}
              placeholder="Password"
            />
            <button type="submit">Login</button>
            {displayError && <p className="errorPara">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
