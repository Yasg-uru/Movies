import {  useState } from "react";
import axios from "axios";
import "./Register.css"
function Registeruser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profile, setprofile] = useState(null);

  const submitform = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        formData,{
          withCredentials:true
        }
      );
      setname("");
      setemail("");
      setpassword("");
      setprofile(null);

      console.log("response is :" + response.data);
    } catch (error) {
      console.log("error is occured :" + error);
    }
  };
  const handlechange = (e) => {
    const filedata = e.target.files[0];
    setprofile(filedata);
  };
  return (
    <div className="main-container">
      <div className="inner-container">
        <h2>Sign Up</h2>
        <form onSubmit={submitform}>
          <label>
            Name
           
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
         </label>
          <label>
            Email
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </label>
          <label>
            password
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </label>

          
            <input type="file" onChange={handlechange} />
         
          <button type="submit" className="btn">submit</button>
        </form>
      </div>
    </div>
  );
}
export default Registeruser;
