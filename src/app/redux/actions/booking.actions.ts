import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking.model';

export const addBooking = createAction(
  '[Booking] Add booking element',
  props<{ booking: Booking }>()
);

export const removeBooking = createAction(
  '[Booking] Remove booking element',
  props<{ id: number }>()
);
