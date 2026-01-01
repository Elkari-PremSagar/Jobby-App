import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsFilterGroup extends Component {
  onChangeEmployment = event => {
    const {onChangeEmployment} = this.props
    onChangeEmployment(event.target.value)
  }

  onChangeSalary = event => {
    const {onChangeSalary} = this.props
    onChangeSalary(event.target.value)
  }

  onChangeLocation = event => {
    const {onChangeLocation} = this.props
    onChangeLocation(event.target.value)
  }

  renderEmploymentFilters = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={this.onChangeEmployment}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryFilters = () => (
    <div>
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              name="salary"
              onChange={this.onChangeSalary}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderLocationFilters = () => {
    const {locationsList} = this.props
    return (
      <div className="filter-section">
        <h1 className="filter-heading">Location</h1>
        <ul className="filters-list">
          {locationsList.map(each => (
            <li key={each.locationId} className="filter-item">
              <input
                type="checkbox"
                id={each.locationId}
                value={each.locationId}
                onChange={this.onChangeLocation}
              />
              <label htmlFor={each.locationId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderEmploymentFilters()}
        <hr />
        {this.renderSalaryFilters()}
        <hr />
        {this.renderLocationFilters()}
      </div>
    )
  }
}
export default JobsFilterGroup
