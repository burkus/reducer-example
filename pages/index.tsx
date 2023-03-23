import { ChangeEvent, useReducer } from 'react'
import { initialBookingState, bookingReducer } from '@/pages/_lib'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const [{
    availableTimes,
    time,
    date,
    guests,
    bookings
  }, dispatch] = useReducer(bookingReducer, initialBookingState)

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_DATE', date: e.target.value })
  }

  const handleGuestChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_GUESTS', guests: e.target.value })
  }

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_TIME', time: e.target.value })
  }

  const addBooking = () => {
    dispatch({ type: 'ADD_BOOKING' })
  }

  return (
    <div className={styles.dash}>
      <div className={styles.form}>
        <div>Creat a booking</div>
        <input value={date} type='date' onChange={handleDateChange} />
        <select value={time} onChange={handleTimeChange}>
          {availableTimes.map(time => <option key={time}>{time}</option>)}
        </select>
        <input type='range' value={guests} min={1} max={100} onChange={handleGuestChange} />
        <button onClick={() => addBooking()}>Add Booking</button>
      </div>
      <div>
        <div>Existing Bookings</div>
        <div className={styles.booking}>
          {bookings.map((booking, index) => (
            <div key={index}>
              <div>Date: {booking.date}</div>
              <div>Time: {booking.time}</div>
              <div>Guests: {booking.guests}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
