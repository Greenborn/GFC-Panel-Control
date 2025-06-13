import request from '../helpers/requestApi'

export function get_all() {
    return request({ url: "fotoclub/get_all", method: 'get' })
}

export function edit(data) {
    return request({ url: "fotoclub/edit", method: 'put', data })
}