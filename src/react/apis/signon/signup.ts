import { signUpController } from '../../constants/urls'
import ApiMutationFactory from '../ApiMutation'
import { IAxiosArgs } from '../AxiosApi'

export const signUpApiMutation = new ApiMutationFactory<ISignUpApi>(
  { url: signUpController, method: 'POST' })

interface ISignUpApi extends IAxiosArgs {
  data: RegistrationData
}

export interface RegistrationData {
  email: string,
  password: string
}
