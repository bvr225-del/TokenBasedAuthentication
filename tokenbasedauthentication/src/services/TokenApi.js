import axios from "axios";
import AuthService from "./AuthService";

const TokenApi = axios.create({
   // baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    baseURL: 'http://localhost:5045/api',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
})

TokenApi.interceptors.request.use((req) => {
    const user = AuthService.getAuthUser();
    if (user) {
        req.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return req;
},
(error) => {
    console.log('Error', error);
});


TokenApi.interceptors.response.use((resp) => {

    if (resp.status === 401) {
        console.log(resp);
    }
    return resp;
}, (error) => {

    console.log(error);
    window.location = '/';
})


export default TokenApi;