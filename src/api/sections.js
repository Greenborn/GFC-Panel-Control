import request from '../helpers/requestApi'

export function get_all() {
    return request({ url: "section/get_all", method: 'get' })
}