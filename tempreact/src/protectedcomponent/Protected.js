import { useNavigate } from "react-router-dom";
import { selectAuth } from "../Reduxtoolkit/Authslice.js";
import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
function Protected({ Component, allowedrole }) {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!isAuthenticated || !storedUser) {
      navigate('/login');
    } else if (storedUser && !allowedrole.includes(storedUser.role)) {
      navigate('/login');//we need to add unauthorized access page
    }
  }, [allowedrole, navigate]);
  return (
    <Fragment>
      <Component />
    </Fragment>
  );
}
export default Protected;
