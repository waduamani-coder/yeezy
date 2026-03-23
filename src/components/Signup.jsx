import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  // initialize the hooks
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[phone,setPhone] = useState("");

  // Define the three states and the application will move to
  const[loading, setLoading] = useState("");
  const[success, setSuccess] = useState("");
  const[error, setError] = useState("");

  // Below is a function that will handle the submit action
  const handleSubmit = async(e) =>{
    // Below we prevent our site from reloading
    e.preventDefault()

    // Update our loading hook with a message that will be displayed to the users who are trying to register
    setLoading("Please wait as registration is in progress...")

    try{
      // create a form data object that will enable you to capture the four details entered on the form
      const formdata = new FormData();

      // insert the four details (username,email,password,phone) in terms of key - value pairs
      formdata.append("username", username);
      formdata.append("email",email);
      formdata.append("password",password);
      formdata.append("phone",phone);

      // by use of axios, we can access be the method post
      const response =await axios.post("https://waduamani.alwaysdata.net/api/signup", formdata)

      // set back the loading to default
      setLoading("");

      // just incase everything goes well, update the success hook with a message
      setSuccess(response.data.message)

      // clear your hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      
       setTimeout(() => {
    setSuccess("");
  }, 5000);

    }
    catch(error){
      // set the loading back to default
      setLoading("");

      // update the error hook with the message given back from the response
      setError(error.message)

    }

  }
 
 
 const navigate = useNavigate();
 return (
  <>
    {/* YEEZY NAVBAR */}
    <nav className="navbar bg-black">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* EMPTY LEFT */}
        <div></div>

        {/* CENTER LOGO */}
        <h2 className="logo text-white ">
          <b>YEEZY</b>
        </h2>


        {/* RIGHT BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/addproducts")}
          >
            Add item
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>

         
        </div>
      </div>
    </nav>

    {/* SIGN UP FORM */}
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 col-md-6">

        <h1 className="mb-3 text-center">Sign Up</h1>

        {loading && <h5 className="text-warning">{loading}</h5>}
        {success && <h3 className="text-success">{success}</h3>}
        {error && <h4 className="text-danger">{error}</h4>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div className="mb-3">
            <input type="checkbox" />{" "}
            <label>Remember me</label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Sign Up
          </button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>

        </form>
      </div>
    </div>
  </>
);
}

export default Signup;

//Research on Axios module in reactjs
