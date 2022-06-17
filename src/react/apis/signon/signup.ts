import { AxiosRequestConfig } from 'axios'
import makeUseApiMutation from '../ApiMutation'
import { signUpController } from '../../constants/urls'

export const useSignUpMutation = makeUseApiMutation<ISignUpApi, string>('POST',
  signUpController)

interface ISignUpApi extends AxiosRequestConfig {
  data: IRegistrationData
}

export interface IRegistrationData {
  email: string,
  username: string,
  password: string
}
