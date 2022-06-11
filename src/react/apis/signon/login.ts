import makeUseApiMutation from '../ApiMutation'
import { loginController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const loginApiMutation = makeUseApiMutation<ILoginApi, string>('POST',
  loginController)

interface ILoginApi extends AxiosRequestConfig {
  data: ILoginRequest
}

export interface ILoginRequest {
  email: string
  password: string
}
