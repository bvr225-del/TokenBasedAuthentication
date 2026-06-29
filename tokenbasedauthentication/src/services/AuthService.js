import PublicApi from "./PublicApi";

function setAuthUser(user, flag = true) {
    sessionStorage.setItem("authUser", JSON.stringify(user));
    sessionStorage.setItem("isAuth", String(flag));
}

function getAuthUser() {
    const authData = sessionStorage.getItem("authUser");

    if (!authData) {
        return null;
    }

    try {
        return JSON.parse(authData);
    } catch (error) {
        console.error("Invalid auth user data", error);
        return null;
    }
}

function isAuthenticated() {
    const user = getAuthUser();
    const authStatus = sessionStorage.getItem("isAuth");

    return Boolean(user) && authStatus !== "false";
}

function removeAuthUser() {
    sessionStorage.removeItem("authUser");
    sessionStorage.removeItem("isAuth");
}

function authenticate(loginUser) {
    return PublicApi.post(`/Authenticate/UserSignIn`, loginUser);
}

const AuthService = {
    setAuthUser,
    getAuthUser,
    isAuthenticated,
    removeAuthUser,
    authenticate
};

export default AuthService;