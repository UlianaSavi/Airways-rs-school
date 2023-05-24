import { createReducer, on } from '@ngrx/store';
import * as BookingActions from '../actions/booking.actions';
import { Booking } from 'src/app/core/models/booking.model';

export const bookingFeatureKey = 'booking';

export interface BookingState {
  bookings: Booking[];
  selectedBookingIds: string[];
  purchased: Booking[];
}

export const initialState: BookingState = {
  bookings: [],
  selectedBookingIds: [],
  purchased: [],
};

export const bookingReducer = createReducer(
  initialState,
  on(
    BookingActions.addBooking,
    (state, { booking }): BookingState => ({
      ...state,
      bookings: [...state.bookings, booking],
    })
  ),
  on(
    BookingActions.removeBooking,
    (state, { ids }): BookingState => ({
      selectedBookingIds: [],
      bookings: state.bookings.filter((booking) => !ids.includes(booking.id)),
      purchased: state.bookings.filter((booking) => ids.includes(booking.id)),
    })
  ),
  on(
    BookingActions.setSelectedBookingIds,
    (state, { selectedBookingIds }): BookingState => ({
      ...state,
      selectedBookingIds: [...selectedBookingIds],
    })
  )
);
