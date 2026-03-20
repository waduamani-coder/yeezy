import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  // introduce the hooks
  const[product_name,setProductName] = useState("");
  const [product_description,setProductDescription] =useState("");
  const [product_cost, setProductcost] = useState("");
  const [product_photo, setProductphoto] = useState("");

  // declare the additional hook to manage the state of the application
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");
  const [error, setError] = useState("");

  // create a function that will handle the submit action
  const handlSubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // setLoading hook with a message (activate it)
    setLoading(true)
    try{
      // create a form data
      const formdata = new FormData()

      // append the details to the form data created
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      // interact with axios to help you use the method post
      const response = await axios.post("https://waduamani.alwaysdata.net/api/add_product", formdata)

      // set the loading hook back to default
      setLoading(false)

      // update the success hook with a message
      setSuccess(response.data.message)

      // clearing the hooks (setting them back to default/empty)
      setProductName("");
      setProductDescription("");
      setProductcost("");
      setProductphoto("");

      e.target.reset()

      
       setTimeout(() => {
    setSuccess("");
  }, 5000);


    }
    catch(error){
      // set the loading hook back to default
      setLoading(false)

      // update the setError with a message
      setError(error.message)

    }

  }
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 p-4 card shadow">
        <h3>Welcome to Add item</h3>

        {/* bind the loading hook */}
        {loading && <Loader /> }

         <h3 className="text-success">{success}</h3>
      <h4 className="text-warning">{error}</h4>


        <form onSubmit={handlSubmit}>
          <input type="text"
          placeholder='Enter the item name'
          className='form-control'
          required
          value={product_name
          } 
          onChange= { (e) => setProductName(e.target.value)}/> <br />

          {/* {product_name} */}

          <input type="text" 
          placeholder='Enter the item Description'
          className='form-control'
          required
          value={product_description}
          onChange= { (e) => setProductDescription(e.target.value)}/> <br />

          {/* {product_description} */}

          <input type="number"
          placeholder='Enter The price of the item'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductcost(e.target.value)} /> <br />

          <label>item Photo</label>
          <input type="file"
          className='form-control'
          required 
          accept="image/*"
          onChange={(e) => setProductphoto(e.target.files[0])}
          
          /> <br />

          
          

          <input type="submit"
          value="Add item"
          className='btn btn-outline-primary' />


        </form>
      </div>
     
    </div>
  )
}

export default Addproducts;
