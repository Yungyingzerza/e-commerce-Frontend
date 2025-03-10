import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartCount, setCartTotalPrice } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [orignalDiscount, setOrignalDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest(API.cart)
      .then((data) => {
        if (data.length > 0) {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Cart fetch failed", error);
        setLoading(false);
      });

    apiRequest(API.addresses)
      .then((data) => {
        if (data.length > 0) {
          setUserAddresses(data);
        }
      })
      .catch((error) => {
        console.error("Address fetch failed", error);
      });
  }, []);

  useEffect(() => {
    if (discount > 0) {
      setDiscount(orignalDiscount * user.cart.count);
    }
  }, [user.cart.count]);

  const checkDiscount = () => {
    if (discountCode === "") {
      setDiscountCode("");
      setDiscount(0);
      return;
    }

    setDiscountLoading(true);

    apiRequest(`${API.discount}/${discountCode}`)
      .then((data) => {
        if (data.discount) {
          setDiscount(data.discount.discount * user.cart.count);
          setOrignalDiscount(data.discount.discount);
        } else {
          setDiscount(0);
          setOrignalDiscount(0);
        }
        setDiscountLoading(false);
      })
      .catch((error) => {
        console.error("Discount fetch failed", error);
        setDiscount(0);
        setOrignalDiscount(0);
        setDiscountLoading(false);
      });
  };

  const handleDecrease = (id) => {
    if (product.find((item) => item.id === id).quantity === 1) {
      dispatch(setCartCount(user.cart.count - 1));
      dispatch(
        setCartTotalPrice(
          user.cart.total_price -
            product.find((item) => item.id === id).product.price
        )
      );

      // remove item from cart
      setProduct((prev) => {
        return prev.filter((item) => item.id !== id);
      });

      apiRequest(`${API.cart}/${id}`, {
        method: "DELETE",
      });

      return;
    }

    dispatch(setCartCount(user.cart.count - 1));
    dispatch(
      setCartTotalPrice(
        user.cart.total_price -
          product.find((item) => item.id === id).product.price
      )
    );

    setProduct((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });

    apiRequest(`${API.cart}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity: product.find((item) => item.id === id).quantity - 1,
      }),
    });
  };

  const handleIncrease = (id) => {
    dispatch(setCartCount(user.cart.count + 1));
    dispatch(
      setCartTotalPrice(
        user.cart.total_price +
          product.find((item) => item.id === id).product.price
      )
    );

    setProduct((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });

    apiRequest(`${API.cart}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity: product.find((item) => item.id === id).quantity + 1,
      }),
    });
  };

  const handleCheckout = () => {
    if (selectedAddress === null) {
      document.getElementById("message").showModal();
      setMessage("Please select an address to checkout");
      return;
    }

    document.getElementById("message").showModal();
    setMessage("Processing your order...");

    apiRequest(API.order, {
      method: "POST",
      body: JSON.stringify({
        discount: discountCode ? discountCode : null,
        address_id: selectedAddress,
      }),
    })
      .then((data) => {
        if (data.message != "Order created successfully") {
          setMessage(data.message);
        } else {
          setMessage("Order created successfully");
          dispatch(setCartCount(0));
          dispatch(setCartTotalPrice(0));
          setProduct([]);
        }
      })
      .catch((error) => {
        console.error("Order failed", error);
      });
  };

  return (
    <>
      <Navbar />
      <dialog id="message" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Checkout</h3>
          <p className="py-4">{message}</p>
          {message === "Order created successfully" &&
            <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => navigate(`/profile`)} className="btn">Go to Profile</button>
            </form>
          </div>}
        </div>
      </dialog>
      {loading ? (
        <>
          <div className="flex flex-row w-full justify-center items-center flex-wrap">
            <h1 className="ubuntu-sans-mono-700 text-4xl text-center mt-10">
              Your Cart
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center mt-10">
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Item</h2>
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Price</h2>
            <h2 className="text-2xl ubuntu-sans-mono-400">Quantity</h2>
          </div>

          <div className="divider"></div>

          <div className="flex flex-row flex-wrap  items-center mt-10 gap-2 sm:gap-10">
            <div className="w-24 sm:w-1/3 skeleton h-12 duration-0"></div>
            <div className="w-24 sm:w-1/3 skeleton h-12 duration-0"></div>
            <div className="flex flex-col gap-2 items-center justify-center flex-1">
              <div className="skeleton h-12 sm:w-32 w-20 duration-0"></div>
            </div>

            <div className="w-24 sm:w-1/3 skeleton h-12 duration-0"></div>
            <div className="w-24 sm:w-1/3 skeleton h-12 duration-0"></div>
            <div className="flex flex-col gap-2 items-center justify-center flex-1">
              <div className="skeleton h-12 sm:w-32 w-20 duration-0"></div>
            </div>

            <div className="w-24 sm:w-1/3 skeleton h-12 duration-0"></div>
            <div className="w-24 sm:w-1/3 skeleton h-12 duration-0"></div>
            <div className="flex flex-col gap-2 items-center justify-center flex-1">
              <div className="skeleton h-12 sm:w-32 w-20 duration-0"></div>
            </div>
          </div>
        </>
      ) : product && product.length > 0 ? (
        <>
          <div className="flex flex-row gap-5 w-full justify-center items-center flex-wrap">
            <h1 className="ubuntu-sans-mono-700 text-4xl text-center mt-10">
              Your Cart
            </h1>
            <h1 className="ubuntu-sans-mono-400 text-4xl text-center mt-10">
              {user.cart.count} {user.cart.count > 1 ? "Items" : "Item"}
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center mt-10">
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Item</h2>
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Price</h2>
            <h2 className="text-2xl ubuntu-sans-mono-400">Quantity</h2>
          </div>

          <div className="divider"></div>

          <div className="flex flex-row flex-wrap  items-center mt-10 gap-2 sm:gap-10">
            {product.map((item) => (
              <React.Fragment key={item.id}>
                <div className="w-1/3 ">
                  <div className="flex flex-row items-center gap-5">
                    <img
                      src={item.product.product_image[0].image_url}
                      alt={item.name}
                      className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover sm:block hidden"
                    />
                    <Link to={`/product/${item.product.id}`}>
                      <h2 className="text-lg sm:text-2xl ubuntu-sans-mono-400">
                        {item.product.name} {item.size && `/ ${item.size}`}
                      </h2>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center flex-1 gap-5 w-1/3">
                  <h2 className="text-sm sm:text-lg ubuntu-sans-mono-400">
                    {item.product.price.toLocaleString()} THB
                  </h2>
                </div>
                <div className="flex flex-col gap-2 w-1/3 items-center">
                  <div className="join">
                    <div className="indicator">
                      <button
                        onClick={(e) => handleDecrease(item.id)}
                        className="btn join-item rounded-l-2xl text-2xl"
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <input
                        className="input join-item text-center disabled:text-black"
                        disabled
                        placeholder="Quantity"
                        type="number"
                        min={1}
                        value={item.quantity}
                      />
                    </div>
                    <div className="indicator">
                      <button
                        onClick={(e) => handleIncrease(item.id)}
                        className="btn join-item rounded-r-2xl text-2xl"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="divider"></div>

          <div className="flex flex-row justify-center items-center my-10">
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">TOTAL</h2>
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">
              {user.cart.count} {user.cart.count > 1 ? "Items" : "Item"}
            </h2>
            <h2 className="text-2xl ubuntu-sans-mono-400">
              {user.cart.total_price.toLocaleString()} THB
            </h2>
          </div>

          <div className="flex flex-row justify-center items-center my-10">
            <div className="w-1/3 text-2xl ubuntu-sans-mono-400">
              {discountLoading ? (
                <div
                  type="text"
                  placeholder="Discount Code"
                  disabled
                  className="input input-neutral"
                >
                  <span className="loading loading-spinner loading-xs"></span>
                </div>
              ) : (
                <input
                  onChange={(e) => setDiscountCode(e.currentTarget.value)}
                  value={discountCode}
                  type="text"
                  placeholder="Discount Code"
                  className="input input-neutral"
                ></input>
              )}
              <button onClick={checkDiscount} className="btn btn-success">
                Use this code
              </button>
            </div>
            <div className="w-1/3 text-2xl ubuntu-sans-mono-400">
              - {discount} THB
            </div>
            <h1 className="text-2xl ubuntu-sans-mono-400 w-32">
              {(user.cart.total_price - discount).toLocaleString()} THB
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center my-10">
            <div className="w-1/3 text-2xl ubuntu-sans-mono-400">
              <select
                defaultValue="Pick an address"
                className="select"
                onChange={(e) => setSelectedAddress(e.currentTarget.value)}
              >
                <option disabled={true}>Pick an address</option>
                {userAddresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.address}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3 text-2xl ubuntu-sans-mono-400"></div>
            <div className="text-2xl ubuntu-sans-mono-400">
              <button
                onClick={handleCheckout}
                className="btn bg-[#F3D0D7] text-[#C8809B] text-2xl px-10 py-3 rounded-2xl hover:scale-105 transition duration-200"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen h-full">
          <h1 className="ubuntu-sans-mono-700 text-4xl text-[#454545]">
            Your Cart is empty
          </h1>
        </div>
      )}
    </>
  );
}
