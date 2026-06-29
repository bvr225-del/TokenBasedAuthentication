import axios from "axios";

const PublicApi = axios.create({
    baseURL: 'http://localhost:5045/api'
});

export default PublicApi;