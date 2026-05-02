import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
// Axios sends payment request to backend which is the mpesa api
// useState stores user input and status
// useLocation receives product data from previous page
// useNavigate moves between pages
// Loader shows loading animation during payment

const Makepayment = () => {

    // destructure the details passed from the Getproducts component
    // The useLoacation hook allows us to get/destructure the properties passed from the previous component.
    const {product} = useLocation().state || {}
    // This gets the selected product from getproduct.jsx

    // declare the navigate hook
    const navigate = useNavigate()
    // Used to go back to homepage or other pages

    // console.log("The details passed from getproducts are: ",product)
    // below we specify the image base url
    const img_url = "https://waduamani.alwaysdata.net/static/images/"
    // It combines with the product image name to display image

    // initialize hooks to manage the state of your application
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    // Number stores user phone number
    // loading shows payment processing state
    // Success shows succesful payment message
    // Error shows error message if payment fails


    // create a function that will handle the submit action
    const handlesubmit = async (e) =>{
        // prevent the site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)
        // This starts the loading

        try{
            // create a form data object
            const formdata = new FormData()

            // append the data to the form data
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)
            // This sends the phone number and the product price

            const response = await axios.post("https://waduamani.alwaysdata.net/api/mpesa_payment", formdata)
            // This code connects to backend payment system and triggers mpesa stk push request

            // set loading back to default
            setLoading(false)

            // update the success hook with the message
            setSuccess(response.data.message)
        }
        catch(error){
            // if there is an error respond to error
            setLoading(false)

            // update the error hook with the error message
            setError(error.message)
        }
    }


  return (
    <div className='row justify-content-center'>
        {/* <button className='btn btn-outline-primary'> Back to Product </button> */}

        <h1 className="text-dark">Make Payment - Lipa na M-Pesa</h1>

        <div className="col-md-1">
            <input type="button"
            className="btn btn-dark"
            value="<- Back"
            onClick={() => navigate("/") } />
        </div>

        <div className="col-md-6 card shadow p-4">



            <img src={img_url + product.product_photo} alt="Product name" className='product_img'/>

            <div className="card-body ">
                <h2 className="text-dark"> {product.product_name} </h2>

                <p className="text-dark"> {product.product_description} </p>

                <h3 className="text-dark">Kes {product.product_cost} </h3> <br />

                <form onSubmit={handlesubmit}>

                     {/* bind the loading hook */}
                    {loading && <Loader />}

                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>


                    <input type="number"
                    className='form-control'
                    placeholder='Enter the Phone number 254XXXXXXX'
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)} /> <br />

                    {/* {number} */}

                    <input type="submit"
                    value="Make Payment"
                    className='btn btn-dark' />
                </form>
            </div>
        </div>

    </div>
  )
}

export default Makepayment;