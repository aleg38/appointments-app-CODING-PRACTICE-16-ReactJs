// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStared} = props

  const {id, title, date, isStared} = appointmentDetails

  const onClickFavoriteIcon = () => {
    toggleIsStared(id)
  }

  const starImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="header-container">
        <p className="title-line">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="favorite-icon-container"
          onClick={onClickFavoriteIcon}
        >
          <img src={starImgUrl} alt="star" className="favorite-icon" />
        </button>
      </div>

      <p className="date-line">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
