/* eslint-disable @ngrx/prefer-action-creator */
import { Action } from '@ngrx/store';
import { ITicket } from 'src/app/search/models/tickets.model';

export enum TicketsActionsEnum {
  getAllTickets = '[Search Page] getAllTickets',
  setAllTickets = '[Search Page] setAllTickets',
  getOneWayTickets = '[Search Page] getOneWayTickets',
  setOneWayTickets = '[Search Page] setOneWayTickets',
}

export class ApiTicketsType implements Action {
  readonly type = TicketsActionsEnum.getAllTickets;
}

export class ApiOneWayTicketsType implements Action {
  readonly type = TicketsActionsEnum.getOneWayTickets;
}

export class SetAllTickets implements Action {
  public readonly type = TicketsActionsEnum.setAllTickets;

  constructor(public payload: ITicket[]) {}
}

export class SetOneWayTickets implements Action {
  public readonly type = TicketsActionsEnum.setOneWayTickets;

  constructor(public payload: ITicket[]) {}
}

export type TicketsActions = SetAllTickets | SetOneWayTickets;
