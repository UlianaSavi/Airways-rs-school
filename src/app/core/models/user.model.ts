export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  birthDate: Date | string;
  gender: string;
  phone: string;
  citizenship: string;
}
