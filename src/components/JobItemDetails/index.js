import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiTwotoneStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBagFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {apiJobStatus: false, jobResult: {}}

  componentDidMount() {
    this.gettingResult()
  }

  gettingResult = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedJobDetails = {
        jobDetails: data.job_details.map(eachJob => ({
          companyLogo: eachJob.company_logo_url,
          website: eachJob.company_website_url,
          employment: eachJob.employment_type,
          id: eachJob.id,
          description: eachJob.job_description,
          title: eachJob.title,
          skillsRequired: eachJob.skills.map(eachSkill => ({
            skillsImage: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompanyDescription: eachJob.life_at_company.description,
          lifeAtCompanyImage: eachJob.life_at_company.image_url,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
        })),
        similarJobs: data.similar_jobs.map(eachSimilar => ({
          companyLogo: eachSimilar.company_logo_url,
          typeOfEmployment: eachSimilar.employment_type,
          id: eachSimilar.id,
          description: eachSimilar.description,
          location: eachSimilar.location,
          rating: eachSimilar.rating,
          title: eachSimilar.title,
        })),
      }
      this.setState({
        jobResult: updatedJobDetails,
        apiJobStatus: true,
      })
    }
  }

  jobView = () => {
    const {jobResult} = this.state
    const {jobDetails, similarJobs} = jobResult

    return (
      <div>
        <div className="listOfJobs">
          <div>
            <img src={jobDetails.companyLogo} alt="job details company logo" />
            <div>
              <h1>{jobDetails.title}</h1>
              <p>
                <AiTwotoneStar />
                {jobDetails.rating}
              </p>
            </div>
          </div>
          <div>
            <div>
              <GoLocation />
              <p>{jobDetails.location}</p>
              <BsFillBagFill />
              <p>{jobDetails.employment}</p>
            </div>
            <h1>{jobDetails.packagePerAnnum} LPA</h1>
          </div>
          <hr />
          <div>
            <div>
              <h1>Description</h1>
              <a href={jobDetails.website}>Visit</a>
            </div>
            <p>{jobDetails.description}</p>
          </div>
          <div>
            <h1>Skills</h1>
            <ul>
              {jobDetails.skillsRequired.map(eachL => (
                <li kay={eachL.name}>
                  <img src={eachL.skillsImage} alt={eachL.name} />
                  <p>{eachL.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Life at Company</h1>
            <div>
              <p>{jobDetails.lifeAtCompanyDescription}</p>
              <img src={jobDetails.lifeAtCompanyImage} alt="life at company" />
            </div>
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(eachS => (
              <li key={eachS.id}>
                <div>
                  <img src={eachS.companyLogo} alt="similar job company logo" />
                  <div>
                    <h1>{eachS.title}</h1>
                    <div>
                      <AiTwotoneStar />
                      <p>{eachS.rating}</p>
                    </div>
                  </div>
                  <h1>Description</h1>
                  <p>{eachS.description}</p>
                  <div>
                    <GoLocation />
                    <p>{eachS.location}</p>
                    <BsFillBagFill />
                    <p>{eachS.typeOfEmployment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiJobStatus} = this.state
    return (
      <div>
        <Header />
        <div>{apiJobStatus ? this.jobView() : this.loadingView()}</div>
      </div>
    )
  }
}
export default JobItemDetails
