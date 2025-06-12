import request from '../helpers/requestApi'

export function get_all() {
    return request({ url: "metric/get_all", method: 'get' })
}

export function edit( data ) {
    return request({ url: "metric/edit", method: 'put', data })
}