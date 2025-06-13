import request from '../helpers/requestApi'

export function session() {
    return request({ url: "auth/session", method: 'get' })
}

export function get_img_profile(){
  let user_data = JSON.parse(localStorage.getItem('user_data'))
  return import.meta.env.VITE_URL_PUBLIC+user_data?.profile?.img_url
}