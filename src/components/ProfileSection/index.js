import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class ProfileSection extends Component {
  state = {profileDetails: {}}

  componentDidMount() {
    this.renderingProfileSection()
  }

  retryButton = () => {
    this.renderingProfileSection()
  }

  renderingProfileSection = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.profile_details.map(eachProfile => ({
        name: eachProfile.name,
        imageUrl: eachProfile.profile_image_url,
        shortBio: eachProfile.short_bio,
      }))
      this.setState({profileDetails: updatedData})
    } else {
      return (
        <div>
          <button type="button" onClick={this.retryButton}>
            Retry
          </button>
        </div>
      )
    }
    const {profileDetails} = this.state
    return (
      <div className="profile">
        <img src={profileDetails.imageUrl} alt="profile" />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.shortBio}</p>
      </div>
    )
  }

  render() {
    return <div>{this.renderingProfileSection()}</div>
  }
}

export default ProfileSection
