// export const url = `${process.env.PAYMENTS_SERVICE_HOST}:${process.env.PAYMENTS_SERVICE_PORT}`
const url = "http://localhost:8081"
const api = `${url}/api`

export const signUpController = `${api}/signup`
export const loginController = `${api}/login`
export const permissionsController = `${api}/permissions`
