import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const img_url = "https://waduamani.alwaysdata.net/static/images/";

  return (
    
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>

       <div className="col-md-1">
            <input type="button"
            className="btn btn-dark"
            value="<- Back"
            onClick={() => navigate("/") } />
        </div>


      {cart.length === 0 ? (
        <p className="text-center">No items in cart</p>
      ) : (
        <div className="row">
          {cart.map((product, index) => (
            <div
              className="col-md-3 justify-content-center mb-3"
              key={index}
            >
              <div className="card shadow">
                
                {/* IMAGE */}
                <img
                  src={img_url + product.product_photo}
                  alt="product"
                  className="product_img mt-3"
                />

                {/* BODY */}
                <div className="card-body">
                  <h5 className="text-dark">
                    {product.product_name}
                  </h5>

                  <p className="text-dark">
                    {product.product_description?.slice(0, 70)}...
                  </p>

                  <h4 className="text-dark">
                    Kes {product.product_cost}
                  </h4>

                  {/* REMOVE BUTTON (optional) */}
                  <button
                    className="btn btn-danger w-100 mt-2"
                  >
                    Remove
                  </button>

                  {/* PAYMENT BUTTON (same as your Makepayment style) */}
                  <button
                    className="btn btn-outline-dark w-100 mt-2"
                    onClick={() =>
                      navigate("/makepayment", {
                        state: { product },
                      })
                    }
                  >
                    Proceed to Payment
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}