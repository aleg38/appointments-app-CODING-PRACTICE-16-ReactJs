// Write your code here

import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStared = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTextInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStared: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointmentFilter => eachAppointmentFilter.isStared === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="app-card-container">
          <div className="form-and-image-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onClickAdd}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  onChange={this.onChangeTextInput}
                  className="input-style"
                  value={titleInput}
                  placeholder="Title"
                />

                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  placeholder="dd/mm/yyyy"
                  className="input-style"
                />

                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <div>
            <hr className="horizontal-line" />
          </div>
          <div className="appointments-container">
            <h1 className="appointment-text">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {filteredAppointmentsList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                toggleIsStared={this.toggleIsStared}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
