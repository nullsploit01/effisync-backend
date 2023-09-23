import { IUser } from '../../interface/IUser'

export interface ILogin {
  (email: string, password: string): Promise<{ user: IUser; token: string }>
}

export interface IRegister {
  (name: string, email: string, password: string): Promise<{ user: IUser; token: string }>
}

export interface IProfile {
  (email: string): Promise<IUser>
}
