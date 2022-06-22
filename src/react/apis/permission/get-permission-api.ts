import AxiosApi from '../AxiosApi'
import { permissionsController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const getPermissionApi = new AxiosApi<AxiosRequestConfig, TPermissions>('GET',
  permissionsController)

type TPermissions = string[]


