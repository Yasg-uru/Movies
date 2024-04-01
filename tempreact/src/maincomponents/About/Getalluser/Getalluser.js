import React, { useEffect, useState } from "react";
import "./Getalluser.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Getalluser = () => {
  const [data, setdata] = useState([]);
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/getalluser",
        {
          withCredentials: true,
        }
      );
      console.log("respposne is the :" + response.fetchdata);
      const { user } = response.data;
      setdata(user);
    } catch (error) {
      console.log("errorr is occured with fetching the api");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);


  const handledelete=async(id)=>{
try {
  const response=await axios.delete(`http://localhost:4000/api/user/delete/user/${id}`,{
    withCredentials:true
  })
  console.log("deleted successfully")
} catch (error) {
  console.log("error is occured in deletion of the user")
}
  }
  return (
    <div className="getalluser-main-container">
      <h3 style={{ color: "cyan", textAlign: "center" }}>All Users</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td style={{cursor:'pointer'}} onClick={()=>handledelete(item._id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Getalluser;
