import React, { useState } from 'react'
import "./Updateuserrole.css"
import axios from 'axios';
const Deleteuser = () => {
    const [id,setid]=useState('');
    const [role,setrole]=useState('');
    const handlesubmitform=async(e)=>{
e.preventDefault();
try {
    
    const response=await axios.post(`http://localhost:4000/api/user/update/role/${id}`,{role},{
      withCredentials:true
    })
    console.log("this is a response in update user role :"+response.data)

} catch (error) {
    console.log("this is a error ")
}
    }
  return (
    <div className="delete-movie-main-container">
      <h2 style={{ textAlign: "center" }}>Delete User</h2>
      <form onSubmit={handlesubmitform}>
        <label>
          <input
            type="text"
            placeholder="Enter id"
            onChange={(e) => {
              setid(e.target.value);
            }}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Enter id"
            onChange={(e) => {
              setrole(e.target.value);
            }}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  )
}

export default Deleteuser
