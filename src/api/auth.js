import request from '../helpers/requestApi'

export function session() {
    return request({ url: "auth/session", method: 'get' })
}