import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseDetailsList: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getUpdatedData = eachCourse => ({
    id: eachCourse.id,
    name: eachCourse.name,
    imageUrl: eachCourse.image_url,
    description: eachCourse.description,
  })

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getUpdatedData(data.course_details)
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {courseDetailsList} = this.state
    const {imageUrl, name, description} = courseDetailsList
    console.log(imageUrl, name, description)
    return (
      <div className="course-details-container">
        <img src={imageUrl} alt={name} className="course-picture" />
        <div className="name-description-container">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#000" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <Link to="/">
          <button type="button" className="retry-button">
            Retry
          </button>
        </Link>
      </div>
    </>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderCourseDetails()}</div>
      </>
    )
  }
}

export default CourseItemDetails
