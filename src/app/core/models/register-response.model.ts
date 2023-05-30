import { IUser } from './user.model';

export interface IResponse {
  accessToken: string;
  user: IUser;
}
