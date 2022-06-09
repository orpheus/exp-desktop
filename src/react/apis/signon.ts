import { loginController, signUpController } from '../constants/urls'
import ApiMutationFactory from './ApiMutation'

export const signUpApiMutation = new ApiMutationFactory({ url: signUpController, method: 'POST' })
export const loginApiMutation = new ApiMutationFactory({ url: loginController, method: 'POST' })
