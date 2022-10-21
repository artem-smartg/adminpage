
import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'


export const registration = async (firstName, surName, phone, email, gender) => {
    const { data } = await $host.post('user', { firstName, surName, phone, email, gender })
    // localStorage.setItem('token', data.token)

    localStorage.setItem('localStorageUsers', JSON.stringify(data))
    return jwt_decode(data.token)
}

export const login = async (login, password) => {
    const { data } = await $host.post('user/login', { login, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async (token) => {
    const response = await $authHost.post('user/me', { token })
    return response
}




