import AxiosApi, { IAxiosApi, IAxiosArgs } from './AxiosApi'
import {
  MutateOptions,
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query'

class ApiMutationFactory<T extends IAxiosArgs> extends AxiosApi {
  constructor (IAxiosApi: IAxiosApi) {
    super(IAxiosApi)
  }

  make (options?: UseMutationOptions) {
    return new this.ApiMutation<T>(
      useMutation(this.call as MutationFunction, options),
    )
  }

  private ApiMutation = class ApiMutation<T extends IAxiosArgs> {
    constructor (
      public mutation: UseMutationResult,
    ) {}

    async call (axiosArgs: T, options?: MutateOptions) {
      return this.mutation.mutate(axiosArgs, options)
    }
  }
}

export default ApiMutationFactory
