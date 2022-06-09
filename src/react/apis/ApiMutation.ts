import AxiosApi, { IAxiosApi, ICallArgs } from './AxiosApi'
import { MutateOptions, MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query'

class ApiMutationFactory extends AxiosApi {
  mutation: UseMutationResult

  constructor (IAxiosApi: IAxiosApi) {
    super(IAxiosApi)
  }

  make (options?: UseMutationOptions) {
    return new ApiMutation(
      useMutation(this.call as MutationFunction, options)
    )
  }
}

class ApiMutation {
  constructor (
    public mutation: UseMutationResult
  ) {}

  async call (callArgs: ICallArgs, options?: MutateOptions) {
    return this.mutation.mutate(callArgs, options)
  }
}

export default ApiMutationFactory
