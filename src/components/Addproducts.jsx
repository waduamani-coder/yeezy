import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import Footer from './Footer';

// React and useState handles dynamic form data
// Shows loading animation while uploading
// Sends data to backend api


const Addproducts = () => {

  // introduce the hooks
  const[product_name,setProductName] = useState("");
  const [product_description,setProductDescription] =useState("");
  const [product_cost, setProductcost] = useState("");
  const [product_photo, setProductphoto] = useState("");
  // This codes stores what the user types in the form it is called a control form

  // declare the additional hook to manage the state of the application
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");
  const [error, setError] = useState("");

  // Loading shows while sending data to backend
  // Success merssage when product is added
  // Error message if something fails

  // create a function that will handle the submit action
  const handlSubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // setLoading hook with a message (activate it)
    setLoading(true)
    // This starts the loading
    try{
      // create a form data
      const formdata = new FormData()
      // The formdata is used when sending text and image files to backend

      // append the details to the form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);
      // This sends all product details to backend

      // interact with axios to help you use the method post
      const response = await axios.post("https://waduamani.alwaysdata.net/api/add_product", formdata)
      // This sends the product to backend database using the post method

      // set the loading hook back to default
      setLoading(false)

      // update the success hook with a message
      setSuccess(response.data.message)
      // Shows success message from backend

      // clearing the hooks (setting them back to default/empty)
      setProductName("");
      setProductDescription("");
      setProductcost("");
      setProductphoto("");

      e.target.reset()
      // Clears form after the succesful submission

      
       setTimeout(() => {
    setSuccess("");
  }, 5000);
  // This is a timeout that will hide the success message after 5 seconds


    }
    catch(error){
      // set the loading hook back to default
      setLoading(false)

      // update the setError with a message
      setError(error.message)
      // This will show error if the api fails

    }

  }
  return (
  <>
    {/* YEEZY NAVBAR */}
    <nav className="navbar bg-black">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* LEFT SPACE */}
        <div><h2 className="logo text-white ">
          <b>YEEZY</b>
        </h2>
</div>

        {/* CENTER LOGO */}
        
        {/* RIGHT BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => window.location.href = "/addproducts"}
          >
            Add item
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => window.location.href = "/"}
          >
            Home
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => window.location.href = "/signin"}
          >
            Sign In
          </button>

          
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => window.location.href = "/signup"}
          >
            Sign up
          </button>

         
        </div>
      </div>
    </nav>

    {/* ADD PRODUCT FORM */}
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 p-4 card shadow">
        <h3>Welcome to Add Item</h3>

        {loading && <Loader />}

        <h3 className="text-success">{success}</h3>
        <h4 className="text-warning">{error}</h4>

        <form onSubmit={handlSubmit}>
          <input
            type="text"
            placeholder="Enter the item name"
            className="form-control"
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />
          <br />

          <input
            type="text"
            placeholder="Enter the item Description"
            className="form-control"
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <br />

          <input
            type="number"
            placeholder="Enter The price of the item"
            className="form-control"
            required
            value={product_cost}
            onChange={(e) => setProductcost(e.target.value)}
          />
          <br />

          <label>Item Photo</label>
          <input
            type="file"
            className="form-control"
            required
            accept="image/*"
            onChange={(e) => setProductphoto(e.target.files[0])}
          />
          <br />

          <input
            type="submit"
            value="Add Item"
            className="btn btn-outline-dark w-100"
          />
          {/* This code sends form data to backend when clicked */}
        </form>
      </div>
    </div>
  </>
);
}

export default Addproducts;
