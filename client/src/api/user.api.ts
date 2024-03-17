import { API } from "./api"

export const UserApi = {
    signup: (payload:{name:string, email:string, password:string} ) => {
        return API.post('/user/signup', payload)
    },
    signin: (payload:{email:string, password:string} ) => {
        return API.post('/user/signin', payload)
    }
}