import './index.css'

const SalaryList = props => {
  const {salaryLists, updatingSalary} = props
  const {salaryRangeId, label} = salaryLists

  const salaryUpdating = () => {
    updatingSalary(salaryRangeId)
  }

  return (
    <li className="listElement">
      <input type="radio" id={salaryRangeId} onChange={salaryUpdating} />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryList
