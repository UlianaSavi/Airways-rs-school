import { createReducer, on } from '@ngrx/store';
import * as BookingActions from '../actions/booking.actions';
import { Booking } from 'src/app/core/models/booking.model';

export const bookingFeatureKey = 'booking';

export interface BookingState {
  bookings: Booking[];
}

export const initialState: BookingState = {
  bookings: [],
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
    (state, { id }): BookingState => ({
      ...state,
      bookings: state.bookings.filter((booking) => booking.id !== id),
    })
  )
);
