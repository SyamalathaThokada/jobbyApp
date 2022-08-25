import './index.css'

const EmployeeList = props => {
  const {lists, employeeFilter} = props
  const {employmentTypeId, label} = lists

  const employeeUpdate = () => {
    employeeFilter(employmentTypeId)
  }

  return (
    <li className="listElement">
      <input type="checkbox" id={employmentTypeId} onChange={employeeUpdate} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmployeeList
