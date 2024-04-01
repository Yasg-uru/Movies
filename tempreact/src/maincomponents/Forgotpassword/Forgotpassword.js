import { useState } from "react";
import "./Forgotpassword.css";
import axios from "axios";
function Forgotpassword() {
  const [email, setemail] = useState("");
  async function submitform(e) {
    e.preventDefault();
   try {
    
    const response = await axios.post(
      "http://localhost:4000/api/user/password/forgot",
      {
        email
      },{
        withCredentials:true
      }
    );
    console.log("response of send eamils is +",response.data)
   } catch (error) {
    console.log("error is occured:"+error)
   }
  }
  console.log(email)

  return (
    <>
      <div className="forgot-container">
        <div className="inner-container-forgot">
          <p className="forgot-password-description">
            Enter your registered email address below, and we'll send you a link
            to reset your password.
          </p>
          <h1
            style={{
              textAlign: "center",
              letterSpacing: "15px",
              textDecoration: "underline",
              color: "white",
            }}
          >
            Forgot Password Recovery
          </h1>
          <form onSubmit={submitform}>
            <label className="custom-label">
              Enter your email
              <input className="custom-input" type="text" placeholder="Email"
              value={email}
              onChange={(e)=>{
                setemail(e.target.value);
              }} />
            </label>
            <button type="submit" className="fbtn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Forgotpassword;
