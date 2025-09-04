import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const JobCard = ({jobDetails}) => {
  const {
    id,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    companyLogoUrl,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-card">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <p className="rating-text">
              <FaStar className="star-icon" />
              {rating}
            </p>
          </div>
        </div>

        <div className="job-info">
          <div className="location-employment">
            <MdLocationOn className="info-icon" />
            <p className="info-text">{location}</p>
          </div>
          <div className="info-item">
            <MdWork />
            <p className="info-text">{employmentType}</p>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr />
        <h2 className="description-heading">Description</h2>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
