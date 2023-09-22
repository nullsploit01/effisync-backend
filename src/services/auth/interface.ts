import { IUser } from '../../interface/IUser'

export interface ILogin {
  (email: string, password: string): Promise<IUser>
}

export interface IRegister {
  (name: string, email: string, password: string): Promise<IUser>
}

export interface IProfile {
  (email: string): Promise<IUser>
}
