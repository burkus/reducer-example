
const defaultTimes = ['18:00', '17:00', '16:00', '15:00']

const DEFAULT_GUEST_COUNT = '2'

export interface Booking {
    time: string
    guests: string
    date: string
}

export function createBooking(time: string, guests: string, date: string) {
    return {
        time,
        guests,
        date
    }
}

export interface BookingState {
    bookings: Booking[]
    date: string
    time: string
    guests: string
    availableTimes: string[]
}

export const initialBookingState: BookingState = {
    bookings: [],
    date: new Date().toISOString().substring(0, 10),
    time: defaultTimes[0],
    guests: DEFAULT_GUEST_COUNT,
    availableTimes: defaultTimes
}

const getAvailableDates = (bookings: Booking[], date: string) =>
    defaultTimes.filter(defaultTime =>
        typeof bookings.find(booking =>
            booking.date === date && booking.time === defaultTime) === 'undefined')


type BookingAction =
    { type: 'ADD_BOOKING' } |
    { type: 'SET_TIME', time: string } |
    { type: 'SET_DATE', date: string } |
    { type: 'SET_GUESTS', guests: string }

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
    const { time, guests, date, bookings } = state
    switch (action.type) {
        case 'ADD_BOOKING':
            const nextBookings = [...state.bookings, createBooking(time, guests, date)]
            const nextAvailableTimes = getAvailableDates(nextBookings, date)
            return {
                ...state,
                bookings: nextBookings,
                availableTimes: nextAvailableTimes,
                time: nextAvailableTimes[0] ?? '',
                guests: DEFAULT_GUEST_COUNT
            }
        case 'SET_DATE':
            return {
                ...state,
                date: action.date,
                availableTimes: getAvailableDates(bookings, action.date)
            }
        case 'SET_GUESTS':
            return {
                ...state,
                guests: action.guests
            }
        case 'SET_TIME':
            return {
                ...state,
                time: action.time
            }
    }
}