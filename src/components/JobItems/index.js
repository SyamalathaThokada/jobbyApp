import {Link} from 'react-router-dom'

import {AiTwotoneStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const JobItems = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employment,
    id,
    jobDescription,
    location,
    packagePA,
    rating,
    title,
  } = jobsList

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div className="listOfJobs">
          <div>
            <img src={companyLogoUrl} alt="company logo" />
            <div>
              <h1>{title}</h1>
              <p>
                <AiTwotoneStar />
                {rating}
              </p>
            </div>
          </div>
          <div>
            <div>
              <GoLocation />
              <p>{location}</p>
              <BsFillBagFill />
              <p>{employment}</p>
            </div>
            <h1>{packagePA} LPA</h1>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobItems
