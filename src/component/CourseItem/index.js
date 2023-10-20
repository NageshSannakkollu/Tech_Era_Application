import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {name, logoUrl, id} = courseDetails
  return (
    <Link to={`/courses/${id}`}>
      <li className="course-list-container">
        <img src={logoUrl} alt={name} className="logo-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
