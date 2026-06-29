import axios from "axios";
import { Config } from "../helpers/constants";


function setAuthUser(user) {
    sessionStorage.setItem("authUser", JSON.stringify(user));
}

function getAuthUser() {
    let currentUser = null;
    if (sessionStorage["authUser"] !== null) {
        currentUser = JSON.parse(sessionStorage.getItem("authUser"));
    }
    return currentUser;
}

function removeAuthUser() {
    sessionStorage.removeItem("authUser");
}

function authenticate(loginUser) {
    return axios.post(`${Config.BASEURL}/AuthApi/authenticate`, JSON.stringify(loginUser), {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp)
        .catch(err => {
            console.log('Error in authenticating user');
            throw err;
        })
}

const AuthService = {
    setAuthUser,
    getAuthUser,
    removeAuthUser,
    authenticate
}

export default AuthService;