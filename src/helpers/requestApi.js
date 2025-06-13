import  create  from './request'

const service = create(import.meta.env.VITE_API_URL)

export default service