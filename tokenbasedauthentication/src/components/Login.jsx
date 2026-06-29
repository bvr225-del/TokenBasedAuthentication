import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import AuthService from '../services/AuthService';

function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleSubmit(){
    const newErrors = { userName: "", password: "" };

    if (userName.trim() === "") {
      newErrors.userName = "Enter  userName";
    }else if (userName.trim().length < 4) {
      newErrors.userName = "userName is minimum 4 characters";
    }

    if (password.trim() === "") {
      newErrors.password = "Enter password";
    } else if (password.trim().length < 4) {
      newErrors.password = "Password is minimum 4 characters";
    }

    setErrors(newErrors);
    setLoginError("");

    if (!newErrors.userName && !newErrors.password) {
      AuthService.authenticate({ userName, password })
        .then((resp) => {
          const authUser = resp?.data || { userName };
          AuthService.setAuthUser(authUser,true);
          navigate("/departments");
        })
        .catch((err) => {
          console.error('Login failed', err);
          setLoginError("Invalid userName or password. Please try again.");
        });
    }
  }
  return (
    <>

    <div className="border w-25 mt-5 m-auto p-3">
        <h2 className="text-danger text-center">Login Form</h2>

        <div className="mt-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          />
          {errors.userName&& (<span className="text-danger">{errors.userName}</span>)}
        </div>
        

        <div className="mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>

        {loginError && <div className="alert alert-danger mt-3">{loginError}</div>}
        <div className="mt-3">
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
      
    </>
  )
}

export default Login