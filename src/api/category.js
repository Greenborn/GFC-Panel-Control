import request from '../helpers/requestApi'

export function get_all() {
    return request({ url: "category/get_all", method: 'get' })
}

export function edit(data) {
    return request({ url: "category/edit", method: 'put', data })
}