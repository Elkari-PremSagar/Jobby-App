import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Header from '../Header'
import FailureView from '../FailureView'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJob = {
        id: data.job_details.id,
        title: data.job_details.title,
        rating: data.job_details.rating,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        employmentType: data.job_details.employment_type,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        jobDescription: data.job_details.job_description,

        skills: data.job_details.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }
      const updatedSimilarJobs = data.similar_jobs.map(job => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        location: job.location,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
      }))
      this.setState({
        jobData: updatedJob,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSkills = skills => (
    <ul>
      {skills.map(skill => (
        <li key={skill.name}>
          <img src={skill.imageUrl} alt={skill.name} />
          <p>{skill.name}</p>
        </li>
      ))}
    </ul>
  )

  renderJobDetails = () => {
    const {jobData, similarJobs} = this.state
    const {
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobData
    return (
      <div>
        <div>
          <div>
            <img src={companyLogoUrl} alt="job details company logo" />
            <div>
              <h1>{title}</h1>
              <p>
                <FaStar />
                {rating}
              </p>
            </div>
          </div>

          <div>
            <div>
              <MdLocationOn />
              <p className="job_location">{location}</p>
            </div>
            <div>
              <MdWork />
              <p className="employment_type">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <h2>Description</h2>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferer noreferrer"
            className="company_website_url"
          >
            Visit
          </a>
          <p>{jobDescription}</p>
          <h2>Skills</h2>
          {this.renderSkills(skills)}
          <h2>Life At Company</h2>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h2>Similar Jobs</h2>
        <ul>
          {similarJobs.map(job => (
            <SimilarJobItem job={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.fetchJobDetails} />
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}
export default JobItemDetails
