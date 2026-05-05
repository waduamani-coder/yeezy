import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
 const { cart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const img_url = "https://waduamani.alwaysdata.net/static/images/";

  const totalPrice = cart.reduce(
  (sum, item) => sum + item.product_cost * item.quantity,
  0
);

 return (
  <div className="container mt-4">
    <h2 className="text-center mb-4">Your Cart</h2>

    <div className="col-md-1">
      <input
        type="button"
        className="btn btn-dark"
        value="<- Back"
        onClick={() => navigate("/")}
      />
    </div>

    {/* TOTAL PRICE */}
    {cart.length > 0 && (
      <h3 className="text-end text-dark mt-3">
        Total: Kes {totalPrice}
      </h3>
    )}

    {cart.length === 0 ? (
      <p className="text-center">No items in cart</p>
    ) : (
      <div className="row">

        {cart.map((product) => (
          <div
            className="col-md-3 justify-content-center mb-3"
            key={product.product_id}
          >
            <div className="card shadow">

              {/* IMAGE */}
              <img
                src={img_url + product.product_photo}
                alt="product"
                className="product_img mt-3"
              />

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

                {/* QUANTITY CONTROLS */}
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">

                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => decreaseQty(product.product_id)}
                  >
                    -
                  </button>

                  <span className="fw-bold">
                    {product.quantity}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => increaseQty(product.product_id)}
                  >
                    +
                  </button>

                </div>

                {/* SUBTOTAL */}
                <p className="text-success">
                  Subtotal: Kes {product.product_cost * product.quantity}
                </p>

                {/* REMOVE BUTTON */}
                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() => removeFromCart(product.product_id)}
                >
                  Remove
                </button>

                {/* PAYMENT BUTTON */}
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