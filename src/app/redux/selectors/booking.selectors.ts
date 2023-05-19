import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingState, bookingFeatureKey } from '../reducers/booking.reducer';
import { Booking } from 'src/app/core/models/booking.model';

export const selectBookingsFeature = createFeatureSelector<BookingState>(bookingFeatureKey);

export const selectBookings = createSelector(
  selectBookingsFeature,
  (state: BookingState): Booking[] => state.bookings
);
