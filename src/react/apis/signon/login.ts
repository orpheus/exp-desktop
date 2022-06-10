import ApiMutationFactory from '../ApiMutation'
import { loginController } from '../../constants/urls'
import { IAxiosArgs } from '../AxiosApi'

export const loginApiMutation = new ApiMutationFactory<ILoginApi>(
  { url: loginController, method: 'POST' })

interface ILoginApi extends IAxiosArgs {
  data: LoginData
}

export interface LoginData {
  email: string
  password: string
}
