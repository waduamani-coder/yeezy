import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
  return (
  <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow p-4">

      <h1 className="mb-3 text-center">Sign Up</h1>

      {loading && <h5 className="text-warning">{loading}</h5>}
      {success && <h3 className="text-success">{success}</h3>}
      {error && <h4 className="text-danger">{error}</h4>}

      <form className="form" onSubmit={handleSubmit}>

        {/* Username */}
        <div className="flex-column">
          <label>Username</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="flex-column">
          <label>Phone</label>
        </div>
        <div className="inputForm">
          <input
            type="tel"
            className="input"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Remember */}
        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label> Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button type="submit" className="button-submit">
          Sign Up
        </button>

        <p className="p">
          Already have an account?{" "}
          <Link to="/signin" className="span">Sign In</Link>
        </p>

      </form>
    </div>
  </div>
);
 
 
 
}

export default Signup;

//Research on Axios module in reactjs
