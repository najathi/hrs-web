import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" }); //updating loading state
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel Room Reservation</span>
        </Link>   {/* if there is user show his username otherwise show this div.  */}
        {user ?
          <div className="navItems">
            Hi {user.username},
            <button className="navButton" onClick={handleClick}>Logout</button>
          </div>
          : (
            <div className="navItems">
              <Link to="/register"><button className="navButton">Register</button></Link>
              <Link to="/login"><button className="navButton">Login</button></Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar

// {user ? (<span>{user.username}</span> ): (<div className="navItems">
// <button className="navButton">Register</button>
// <button className="navButton">Login</button>
// </div>)}