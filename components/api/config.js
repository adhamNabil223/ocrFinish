import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


export const url = 'https://api.bupa.linnaea.ai/api/'
const token = Cookies.get('token');

export const instance = axios.create({
    baseURL: url,   
})

instance.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        if(response.status == 200 || 201){
            return Promise.resolve(response)
        }else if(response.status == 500){
           return "error"
        }
    },
    async (error) => {
        if(error.message.includes("Network Error")){
         return   toast.error('server down')
        }else if(error.message.includes('401')){
            delete instance.defaults.headers.common.Authorization;
            Cookies.remove('token')
            if(error.response.data?.detail){
                toast.error(error.response.data?.detail)
            }
            Cookies.remove('token')
        return  toast.error(error.response.data.error)
        }else if(error.message.includes('404')){
        toast.error(error.response.data.detail)
         return  "not found"
        }else if(error.message.includes('400')){
            Object.entries(error.response.data).map(([fieldName, messages]) => {
                return toast.error(`${fieldName}: ${messages[0]}`)
              });
        }else{
            toast.error(error.message)
        }
       
        return error
    }
) 