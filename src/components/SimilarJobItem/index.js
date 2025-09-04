import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const SimilarJobItem = ({job}) => {
  const {
    title,
    rating,
    location,
    employmentType,
    jobDescription,
    companyLogoUrl,
  } = job
  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <p>
            <FaStar />
            {rating}
          </p>
        </div>
      </div>
      <h2>Description</h2>
      <p>{jobDescription}</p>
      <div>
        <div>
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div>
          <MdWork />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
