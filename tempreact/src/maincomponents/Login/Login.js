import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { loginsuccess } from "../../Reduxtoolkit/Authslice";
import { useDispatch } from "react-redux";
export default function Login() {
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [success, setsuccess] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  async function handlesubmitform(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        formdata,{
          withCredentials:true,
        }
      );
      console.log("resposne is :" + response);
      const { user } = response.data;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(loginsuccess(user));

      setsuccess(true);
    } catch (error) {
      console.log("error is occured:" + error);
      setsuccess(false);
    }
  }
  return (
    <>
      <div class="main-container">
        <div class="inner-container">
          <h1 style={{ letterSpacing: "10px", fontWeight: "bold" }}>Login</h1>
          <form onSubmit={handlesubmitform}>
            <label for="email">
              Email:
              <input
                className="input-login"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formdata.email}
                onChange={handlechange}
              />
            </label>

            <label for="password">
              Password:
              <input
                className="input-login"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formdata.password}
                onChange={handlechange}
              />
            </label>
            <button type="submit" class="btn">
              Login
            </button>
            {success ? <span className="success">Successfull</span> : ""}
          </form>
          <div className="third-container">
            <Link to="/forgotpassword" className="links">
              Forgot password
            </Link>

            <Link to="/updatepassword" className="links">
              update password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
