import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Axios sends login data to backend
// useState stores users input and status
// useNavigate redirects user after login

const Signin = () => {

  // Define the two hooks for capturing/storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // This stores what the user types which is email and password it is called a controlled form

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Loading shows login processing message
  // Success shows success message
  // Shows login failure message

  // below we have the useNavigate hook to redirect us to another page on successful login/signin
  const navigate = useNavigate()

  // below is the function to handle the signin action
  const handlesubmit = async (e) => {
    // prevent the site from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account...")

    {

    }
    try {
      // Create a formdata object that will hold the email and the password
      const formdata = new FormData()
      // insert/append the email and the password on the formData created.
      formdata.append("email", email);
      formdata.append("password", password)
      // This code sends user login details to backend

      const response = await axios.post("https://waduamani.alwaysdata.net/api/signin", formdata);
      // This sends login request to backend and the backend checks if the user exists

      // set the loading hook back to default
      setLoading("");

      // Check whether the user exists as part of your response from the API
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // if user is there, definetly the details entered during signin are correct
        // setSuccess("Login successful")
        // if it is succesful, let a person get redirected to another page
        navigate("/");
      }
      else {
        // user is not found that means the credetial entered on the form are incorrect
        setError("Login Failed. Please try again...")
      }

    }
    catch (error) {
      // set loading back to default
      setLoading("")

      // update the error hook with a message
      setError("Ooops something went wrong. Try again...")

    }
  }


 return (
  <>
    {/* YEEZY NAVBAR */}
    <nav className="navbar bg-black">
      <div className="container-fluid">
        
        {/* LEFT SPACE */}
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

    {/* SIGN IN FORM */}
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <h1>Sign In</h1>

        <h5 className="text-info">{loading}</h5>
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="Enter the email address here.."
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Enter the password here"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <input
            type="submit"
            value="Signin"
            className="btn btn-dark w-100"
          />
          <br /><br />
        </form> <br />
      </div>
    </div> <br />
  </>
);
}

export default Signin;

// how can you store the users details into the localstorage
