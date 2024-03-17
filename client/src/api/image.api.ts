import { API } from "./api"

export const ImageApi = {
    upload: (form: FormData, token:string ) => {
        return API.post('/image/upload', form, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    get: (token:string ) => {
        return API.get('/image/', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
}