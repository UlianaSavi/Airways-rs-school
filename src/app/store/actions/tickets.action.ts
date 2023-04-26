/* eslint-disable @ngrx/prefer-action-creator */
import { Action } from '@ngrx/store';
import { ITicket } from 'src/app/search/models/tickets.model';

export enum TicketsActionsEnum {
  getAllTickets = '[Search Page] getTickets',
  getOneWayTickets = '[Search Page] getOneWayTickets',
}

export class GetAllTickets implements Action {
  public readonly type = TicketsActionsEnum.getAllTickets;

  constructor(public payload: ITicket[]) {}
}

export class GetOneWayTickets implements Action {
  public readonly type = TicketsActionsEnum.getOneWayTickets;

  constructor(public payload: ITicket[]) {}
}

export type TicketsActions = GetAllTickets | GetOneWayTickets;
