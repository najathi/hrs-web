import "./order.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import apis from "../../apis";

const Order = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, []);

  const [order, setOrder] = useState({
    name: user ? user.username : "",
    email: user ? user.email : "",
    country: user ? user.country : "",
    city: user ? user.city : "",
    phone: user ? user.phone : "",
    customer: user ? user._id : "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOrder(prev => ({ ...prev, [e.target.id]: e.target.value })); //using previous value
    //set the password = password.value //creating variable password and setting values 
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apis().post("/orders", { ...order, amount: state.amount });
      if (res) {
        setLoading(false);
        navigate("/");
      }
    }
    catch (err) {
      console.log(err.response.details)
      setLoading(false);
    }
  }

  return (

    <div>
      <Navbar />
      <Header type="list" />

      <div className="hotelContainer">
        <div className="hotelWrapper">
          <div className="lContainer">
            <h2 className='mb-4 text-align headingText'>Reservation Checkout</h2>
            <h4 className='text-align'>Your Details</h4><br />

            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={handleChange}
              className="lInput"
              value={order.name}
            />

            <input
              type="email"
              placeholder="E-Mail Address"
              id="email"
              onChange={handleChange}
              className="lInput"
              value={order.email}
            />

            <input
              type="text"
              placeholder="Country"
              id="country"
              onChange={handleChange}
              className="lInput"
              value={order.country}
            />

            <input
              type="text"
              placeholder="City"
              id="city"
              onChange={handleChange}
              className="lInput"
              value={order.city}
            />

            <input
              type="text"
              placeholder="Phone Number"
              id="phone"
              onChange={handleChange}
              className="lInput"
              value={order.phone}
            />

            <button disabled={loading} onClick={handleClick} className="lButton">
              Proceed to checkout
            </button>
            <br />

          </div>
        </div>
      </div>
    </div>

  );
};

export default Order;
