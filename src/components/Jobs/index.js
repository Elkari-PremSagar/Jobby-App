import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import ProfileCard from '../ProfileCard'
import JobsFilterGroup from '../JobsFilterGroup'
import JobCard from '../JobCard'
import FailureView from '../FailureView'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const locationsList = [
  {label: 'Hyderabad', locationId: 'HYDERABAD'},
  {label: 'Bangalore', locationId: 'BANGALORE'},
  {label: 'Chennai', locationId: 'CHENNAI'},
  {label: 'Delhi', locationId: 'DELHI'},
  {label: 'Mumbai', locationId: 'MUMBAI'},
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: {},
    seacrhInput: '',
    activeEmploymentTypes: [],
    activeSalaryRange: '',
    activeLocations: [],
    profileStatus: apiStatusConstants.initial,
    jobsStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchProfile()
    this.fetchJobs()
  }

  fetchProfile = async () => {
    this.setState({profileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: profile,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileStatus: apiStatusConstants.failure,
      })
    }
  }

  fetchJobs = async () => {
    this.setState({jobsStatus: apiStatusConstants.inProgress})
    const {
      activeEmploymentTypes,
      activeSalaryRange,
      seacrhInput,
      activeLocations,
    } = this.state
    const employmentQuery = activeEmploymentTypes.join(',')
    const locationQuery = activeLocations.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentQuery}&minimum_package=${activeSalaryRange}&search=${seacrhInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const filteredJobs =
        activeLocations.length === 0
          ? data.jobs
          : data.jobs.filter(job =>
              activeLocations.includes(job.location.toUpperCase()),
            )

      const updatedJobs = filteredJobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobsList: updatedJobs,
        jobsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsStatus: apiStatusConstants.failure})
    }
  }

  onRetryJobs = () => {
    this.fetchJobs()
  }

  onRetryProfile = () => {
    this.fetchProfile()
  }

  onChangeSearchInput = event => {
    this.setState({seacrhInput: event.target.value})
  }

  onSearch = () => this.fetchJobs()

  onEnterSeacrh = event => {
    if (event.key === 'Enter') {
      this.fetchJobs()
    }
  }

  updateEmploymantType = typeId => {
    this.setState(prevState => {
      const isSelected = prevState.activeEmploymentTypes.includes(typeId)
      const updatedList = isSelected
        ? prevState.activeEmploymentTypes.filter(id => id !== typeId)
        : [...prevState.activeEmploymentTypes, typeId]
      return {activeEmploymentTypes: updatedList}
    }, this.fetchJobs)
  }

  updateSalaryRange = salaryId => {
    this.setState({activeSalaryRange: salaryId}, this.fetchJobs)
  }

  updateLocation = locationId => {
    this.setState(prevState => {
      const isSelected = prevState.activeLocations.includes(locationId)
      const updatedList = isSelected
        ? prevState.activeLocations.filter(id => id !== locationId)
        : [...prevState.activeLocations, locationId]
      return {activeLocations: updatedList}
    }, this.fetchJobs)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDisplayJobs = () => {
    const {jobsList} = this.state
    return jobsList.length === 0 ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderProfile = () => {
    const {profileStatus, profileData} = this.state
    switch (profileStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return <ProfileCard profileData={profileData} />
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.onRetryProfile} />
      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsStatus} = this.state

    switch (jobsStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderDisplayJobs()
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.onRetryJobs} />
      default:
        return null
    }
  }

  render() {
    const {seacrhInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="jobs-filter-section">
            {this.renderProfile()}
            <JobsFilterGroup
              onChangeEmployment={this.updateEmploymantType}
              onChangeSalary={this.updateSalaryRange}
              onChangeLocation={this.updateLocation}
              locationsList={locationsList}
            />
            <div className="jobs-section">
              <div className="seacrh-input-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={seacrhInput}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSeacrh}
                />
                <button
                  type="button"
                  onClick={this.onSearch}
                  data-testid="searchButton"
                  className="search-button"
                >
                  <BsSearch />
                </button>
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
