import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItems from '../JobItems'
import EmployeeList from '../EmployeeList'
import SalaryList from '../SalaryList'

import './index.css'

const constant = {
  initializer: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    apiStatus: constant.initializer,
    resultantList: [],
    employeeFilter: '',
    packageFilter: '',
    searchInput: '',
  }

  componentDidMount() {
    this.renderingSearchResults()
  }

  updatingSearch = event => {
    this.setState(
      {searchInput: event.target.value},
      this.renderingSearchResults,
    )
  }

  employeeUpdate = id => {
    this.setState({employeeFilter: id}, this.renderingSearchResults)
  }

  employmentTypeDetails = () => {
    const {employmentTypesList} = this.props
    return (
      <div>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(each => (
            <EmployeeList
              key={each.employmentTypeId}
              lists={each}
              employeeFilter={this.employeeUpdate}
            />
          ))}
        </ul>
      </div>
    )
  }

  salaryUpdate = id => {
    this.setState({packageFilter: id}, this.renderingSearchResults)
  }

  salaryRendering = () => {
    const {salaryRangesList} = this.props
    return (
      <div>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachSalary => (
            <SalaryList
              key={eachSalary.salaryRangeId}
              salaryLists={eachSalary}
              updatingSalary={this.salaryUpdate}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderingSearchResults = async () => {
    this.setState({apiStatus: constant.loading})
    const {employeeFilter, packageFilter, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/employment_type=${employeeFilter}&minimum_package=${packageFilter}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employment: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePA: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({resultantList: updatedList, apiStatus: constant.success})
    } else {
      this.setState({apiStatus: constant.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failedLoading = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt=" failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.renderingSearchResults}>
        Retry
      </button>
    </div>
  )

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs try other filters</p>
    </div>
  )

  successView = () => {
    const {resultantList} = this.state
    const lengthOf = resultantList.length

    return (
      <div>
        {lengthOf > 0 ? (
          <ul>
            {resultantList.map(each => (
              <JobItems jobsList={each} key={each.id} />
            ))}
          </ul>
        ) : (
          this.failureView()
        )}
      </div>
    )
  }

  renderingResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case constant.loading:
        return this.loadingView()
      case constant.success:
        return this.successView()
      case constant.failure:
        return this.failedLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <div>
            <hr />
            {this.employmentTypeDetails()}
            <hr />
            {this.salaryRendering()}
          </div>
          <div>
            <div>
              <input
                type="search"
                placeholder="Search"
                onChange={this.updatingSearch}
              />
              <button type="button" testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderingResults()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
