import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking.model';

export const addBooking = createAction(
  '[Booking] Add booking element',
  props<{ booking: Booking }>()
);

export const removeBooking = createAction(
  '[Booking] Remove booking elements',
  props<{ ids: string[] }>()
);

export const setPurchase = createAction('[Booking] Set purchase', props<{ ids: string[] }>());

export const setSelectedBookingIds = createAction(
  '[Booking] Set selected booking ids',
  props<{ selectedBookingIds: string[] }>()
);

export const setSingleBuyTicket = createAction(
  '[Booking] Set single buy ticket',
  props<{ ticket: Booking }>()
);
