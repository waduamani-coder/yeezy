import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// React is the core library for building the user interface
// Usestate stores data
// Useeffect runs code automatically when page loads
// Loader shows loading animation
// Axios is used to load the backend api
// UseNavigate helps move between pages




const Getproducts = () => {
  

  // Initialize hook to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // products stores items from the database
  // loading shows if data is being fetched
  // error stores error message if api fails

  // declare the navigate hook

  const navigate = useNavigate()
  // This code is used to move between pages

  // below we specify the image base url
  const img_url = "https://waduamani.alwaysdata.net/static/images/"
  // This is the base link for product images

  // create a function to help you fetch the products from your API
  const fetchProducts = async() =>{
    try{
      // update the loading hook
      setLoading(true);
      // interact with your endpoint for fetching the products
      const response = await axios.get("https://waduamani.alwaysdata.net/api/get_products")
      // This code sends request to backend api using axios

      // update the products with the response given from the API
      setProducts(response.data)

      // Set the loading hook back to default
      setLoading(false)
      // It is usually given true before the request

    }
    catch(error){
      // step 8.
      // if there is an error
      // set the loading back to default
      setLoading(false)

      // update the error hook with a message
      setError(error.message)

    }
  }

  // we shall use the useEffect hook. This hook enables us to automatically re-render new features incase of any changes.

  useEffect(() => {
    fetchProducts()
  }, [])
  // This code automaticaly fetches products immediately

  // console.log(products)




 return (
  <>
    {/* YEEZY NAVBAR WITH BUTTONS */}
    <nav className="navbar bg-black">
      <div className="container-fluid">
        
        {/* LEFT SPACE (empty for balance) */}
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
            Add Item
          </button>
           <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/ ")}
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

    <>
    <section>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

        {/* INDICATORS */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* SLIDES */}
        <div className="carousel-inner">

          {/* SLIDE 1 */}
          <div className="carousel-item active">
            <img
              src="images/yeezy1.jpg"
              className="d-block w-100"
              alt="yeezy"
              style={{ height: "500px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-dark ">Welcome to Yeezy</h5>
              <p className="text-dark">Where creativity meets fashion</p>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="carousel-item">
            <img
              src="images/yeezy2.jpg"
              className="d-block w-100"
              alt="yeezy2"
              style={{ height: "500px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5>Authentic clothing</h5>
              <p>Designed by Kanye West</p>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="carousel-item">
            <img
              src="images/yeezy3.jpg"
              className="d-block w-100"
              alt="yeezy3"
              style={{ height: "500px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-dark">Where originality begins</h5>
              <p className="text-dark">
                Materials obtained from nature such as bamboo
              </p>
            </div>
          </div>

        </div>

        {/* CONTROLS */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </section>
    </>

    {/* PRODUCTS SECTION */}
    <div className='row mt-3'>
      <h3 className='text-dark'>Available items</h3>

      {loading && <Loader />}
      <h4 className='text-danger'>{error}</h4>

      {products.map((product) => (
        <div
          className='col-md-3 justify-content-center mb-3'
          key={product.id}
        >
          <div className="card shadow">
            <img
              src={img_url + product.product_photo}
              alt="product name"
              className='product_img mt-3'
            />

            <div className="card-body">
              <h5 className='text-dark'>{product.product_name}</h5>

              <p className="text-dark">
                {product.product_description.slice(0, 70)}...
              </p>

              <h4 className="text-dark">
                Kes {product.product_cost}
              </h4>

              <button
                className="btn btn-outline-dark"
                onClick={() =>
                  navigate("/makepayment", { state: { product } })
                }
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);
}


export default Getproducts;
