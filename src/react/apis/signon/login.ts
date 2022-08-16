import makeUseApiMutation from '../ApiMutation'
import { loginController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const useLoginMutation = makeUseApiMutation<ILoginApi, ILoginResponse>(
  'POST',
  loginController)

type ILoginApi = AxiosRequestConfig

export type ILoginResponse = IUser

export interface IJwtDecoded {
  userId: string
  scope: Array<string>
  exp: number
  iat: number
  iss: string
}

export interface IUser {
  id: string
  username: string
  email: string
  role: IRole
  accessToken: string
}

export interface IRole {
  id: string
  name: string
  permissions: IPermission[]
}

export interface IPermission {
  id: string
  dateCreated: string
}