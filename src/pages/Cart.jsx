import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, updateQty } from "../store/slices/cartSlice";
import axiosInstance from "../utils/axios";

const Cart = () => {
  const { cartData, loading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  console.log(cartData);

  useEffect(() => {
    if (!cartData.length) {
      dispatch(fetchCartData());
    }
  }, []);

  const handleQtyChange = async (id, value) => {
    const payload = {
      productId: id,
      qty: Number(value),
    };
    await axiosInstance.post("/api/v1/cart/add", payload);
    dispatch(updateQty({ id, value }));
  };
  const getTotal = () => {
    return cartData.reduce((total, item) => {
      return total + item?.productId?.price * item?.qty;
    }, 0);
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cartData.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map((item) => (
            <div
              key={item?.productId?._id}
              className="flex items-center gap-4 border p-4 rounded-md"
            >
              <img
                src={item?.productId?.thumbnail}
                alt={item?.productId?.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item?.productId?.title}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item?.productId?.price} × {item?.qty} = ₹
                  {item?.productId?.price * item?.qty}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={`qty-${item?._id}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    id={`qty-${item?.productId?._id}`}
                    type="text"
                    value={item?.qty}
                    // onChange={(e) => handleQtyChange(item?.productId?._id, e.target.value)}
                    className="w-16 px-2 py-1 border rounded"
                    readOnly
                  />
                  <button
                    onClick={() => handleQtyChange(item?.productId?._id, 1)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleQtyChange(item?.productId?._id, -1)}
                  >
                    -
                  </button>
                  <button
                    // onClick={() => handleDelete(item?._id)}
                    className="text-red-500 hover:underline text-sm ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h4 className="text-lg font-semibold">
              {`Total: ₹${getTotal().toFixed(2)}`}
            </h4>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
