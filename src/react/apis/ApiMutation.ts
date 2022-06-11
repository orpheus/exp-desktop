import AxiosApi from './AxiosApi'
import { useMutation, UseMutationOptions } from 'react-query'
import { AxiosRequestConfig, Method } from 'axios'

function makeUseApiMutation<T extends AxiosRequestConfig, R> (method: Method, url: string) {
  const api = new AxiosApi<T, R>(method, url)
  return (options?: Omit<UseMutationOptions<unknown, unknown, T>, "mutationFn">) => {
    return useMutation(api.call.bind(api), options)
  }
}

export default makeUseApiMutation
