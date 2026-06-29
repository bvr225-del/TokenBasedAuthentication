import axios from "axios";
import { Config } from "./constants";
import AuthService from "../services/Auth.service";

const axiosClient = axios.create({
    baseURL: Config.BASEURL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use((req) => {
    const user = AuthService.getAuthUser();
    if (user) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
},
(error) => {
    console.log('Error', error);
});


axiosClient.interceptors.response.use((resp) => {
    if (resp.status === 401) {
        console.log(resp);
    }
    return resp;
}, (error) => {

    console.log(error);
    window.location = '/login';
})


export default axiosClient;