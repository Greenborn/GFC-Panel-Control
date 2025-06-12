import request from '../helpers/requestApi'

export function get_all() {
    return request({ url: "contests/get_all", method: 'get' })
}