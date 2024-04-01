import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbars from "./maincomponents/Navbar/Navbar.js";
import Home from "./maincomponents/Home/Home.js";
import About from "./maincomponents/About/About.js";
import Register from "./maincomponents/Register/Register.js";
import Login from "./maincomponents/Login/Login.js";
import Forgotpassword from "./maincomponents/Forgotpassword/Forgotpassword.js";
import Resetpassword from "./maincomponents/Resetpassword/Resetpassword.js";
import Showmovie from "./moviecomponents/Showmovie.js";
import Moviedetails from "./moviecomponents/moviedetails/Moviedetails.js";
import Livewatch from "./Livewatch/Livewatch.js";
import Protected from "./protectedcomponent/Protected.js";
import Createmovie from "./maincomponents/About/Createmovie/Createmovie.js";
import Deletemovie from "./maincomponents/About/Deletemovie/Deletemovie.js";
import Getalluser from "./maincomponents/About/Getalluser/Getalluser.js";
// import Deleteuser from "./maincomponents/About/Updateuserrole/updateuserrole.js";
import Updateuserrole from "../src/maincomponents/About/Updateuserrole/updateuserrole.js"
import Me from "./maincomponents/Me/Me.js";
import Getsavedmovies from "./maincomponents/Getallsavedmovies/Getsavedmovies.js";
import Loader from "./LOADER/Loader.js";
function App() {
  return (
    <BrowserRouter>
      <Navbars />
    
      <Routes>
        <Route
          path="/"
          element={
            <Protected Component={Home} allowedrole={["user", "admin"]} />
          }
        ></Route>
        <Route
          path="/about/"
          element={
            <Protected Component={About} allowedrole={["user", "admin"]} />
          }
        >
          <Route path="createmovie" element={<Createmovie />} />
          <Route path="deletemovie" element={<Deletemovie />} />
          <Route path="getalluser" element={<Getalluser />} />
          <Route path="updaterole" element={<Updateuserrole/>} />
        </Route>
        
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        
        <Route path="/forgotpassword" element={<Resetpassword />}></Route>
        <Route
          path="/showmovie"
          element={
            <Protected Component={Showmovie} allowedrole={["user", "admin"]} />
          }
        ></Route>
       
        <Route
          path="/veiwprofile"
          element={
            <Protected Component={Me} allowedrole={["user", "admin"]} />
          }
        ></Route>
       
        <Route
          path="/getdetails/:id"
          element={
            <Protected
              Component={Moviedetails}
              allowedrole={["user", "admin"]}
            />
          }
        ></Route>
        <Route
          path="/livewatch/:id"
          element={
            <Protected Component={Livewatch} allowedrole={["user", "admin"]} />
          }
        ></Route>
        <Route path="/getsavedmovies" element={<Getsavedmovies/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
