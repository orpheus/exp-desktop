import makeUseApiMutation from '../ApiMutation'
import { loginController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const loginApiMutation = makeUseApiMutation<ILoginApi, ILoginResponse>('POST',
  loginController)

interface ILoginApi extends AxiosRequestConfig {
  data: ILoginRequest
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  id: string
  username: string
  email: string
  roleId: string
  accessToken: string
}

export interface IJwtDecoded {
  userId: string
  scope: Array<string>
  exp: number
  iat: number
  iss: string
}