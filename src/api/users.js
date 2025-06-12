import request from '../helpers/requestApi'

export function get_all() {
    return request({ url: "users/get_all", method: 'get' })
}