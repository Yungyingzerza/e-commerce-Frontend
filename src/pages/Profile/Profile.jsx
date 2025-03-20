import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { Link } from "react-router-dom";
import { setProfileUrl } from "../../store/userSlice";
export default function Profile() {
  const user = useSelector((state) => state.user);

  const [addresses, setAddresses] = useState([]);
  const [loadingAdresses, setLoadingAddresses] = useState(true);

  const [editId, setEditId] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [mode, setMode] = useState("create");

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingSelectedOrderCommnet, setLoadingSelectedOrderComment] =
    useState(true);
  const [selectedOrderComment, setSelectedOrderComment] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [nextLevelOrderGoal, setNextLevelOrderGoal] = useState(0);

  const [tempProfileImage, setTempProfileImage] = useState(null);

  const dispatch = useDispatch();

  const getMembershipName = (level) => {
    switch (level) {
      case 1:
        return "Bronze";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      default:
        return "---";
    }

    //level 1 -> 2 need 5-19 orders
    //level 2 -> 3 need 20-29 orders
    //level 3 -> 4 need 30 orders
  };

  const getMembershipGoal = (level) => {
    switch (level) {
      case 1:
        return 5;
      case 2:
        return 20;
      case 3:
        return 30;
      case 4:
        return 30;
      default:
        return 999;
    }
  };

  const handleUpdateProfile = (e) => {
    //update only profile image
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_url", tempProfileImage);

    apiRequest(`${API.user}/profile`, {
      method: "POST",
      body: formData,
    }, false)
    .then((data) => {
      dispatch(setProfileUrl(data.profile_url));
      document.getElementById("profile").close();
    });
  };

  const handleSelectOrder = (order) => {
    setLoadingSelectedOrderComment(true);
    setSelectedOrder(order);
    document.getElementById("order").showModal();
  };

  useEffect(() => {
    if (selectedOrder) {
      apiRequest(`${API.comment}/user/${selectedOrder.product.id}`).then(
        (response) => {
          if (response.comments) {
            setSelectedOrderComment(response.comments);
          }
          setLoadingSelectedOrderComment(false);
        }
      );
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (user.id) {
      apiRequest(API.addresses).then((response) => {
        if (response.length > 0) {
          setAddresses(response);
        }
        setLoadingAddresses(false);
      });

      apiRequest(API.order).then((response) => {
        if (response.orders.length > 0) {
          setOrders(response.orders);
        }
        setLoadingOrders(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      setOrderCount(orders.length);
      setNextLevelOrderGoal(getMembershipGoal(user.level));
    }
  }, [orders]);

  const createAddress = () => {
    if (tempAddress === "") {
      return;
    }

    setAddresses((prev) => {
      return [...prev, { id: "temp", address: tempAddress }];
    });

    apiRequest(API.addresses, {
      method: "POST",
      body: JSON.stringify({ address: tempAddress }),
    }).then((data) => {
      if (data.addresses) {
        //change temp id to real id
        setAddresses((prev) => {
          return prev.map((item) => {
            if (item.id === "temp") {
              return { id: data.addresses[0].id, address: item.address };
            }
            return item;
          });
        });
      }
      setTempAddress("");
    });

    document.getElementById("address").close();
  };

  const updateAddress = () => {
    if (tempAddress === "") {
      return;
    }

    setAddresses((prev) => {
      return prev.map((item) => {
        if (item.id === editId) {
          return { id: item.id, address: tempAddress };
        }
        return item;
      });
    });

    apiRequest(`${API.addresses}/${editId}`, {
      method: "PUT",
      body: JSON.stringify({ address: tempAddress }),
    });

    document.getElementById("address").close();
  };

  const handleCreateAddress = () => {
    setMode("create");
    setTempAddress("");
    document.getElementById("address").showModal();
  };

  const handleEditAddress = (id) => {
    setMode("edit");
    setEditId(id);
    setTempAddress(addresses.find((item) => item.id === id).address);
    document.getElementById("address").showModal();
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => {
      return prev.filter((item) => item.id !== id);
    });

    apiRequest(`${API.addresses}/${id}`, {
      method: "DELETE",
    });
  };

  const handleComment = (e, mode) => {
    e.preventDefault();
    if (mode === "create") {
      //close modal
      document.getElementById("order").close();

      //get comment and rating
      const comment = e.target.elements.comment.value;
      const rating = e.target.elements.rating.value;

      //send request
      apiRequest(API.comment, {
        method: "POST",
        body: JSON.stringify({
          product_id: selectedOrder.product.id,
          comment,
          rating,
        }),
      });

      setSelectedOrderComment(null);
      setSelectedOrder(null);
    } else {
      //close modal
      document.getElementById("order").close();

      // Get comment and rating values
      const comment = e.target.elements.comment.value;
      const rating = e.target.elements.rating.value;

      apiRequest(`${API.comment}/${selectedOrderComment[0].id}`, {
        method: "PUT",
        body: JSON.stringify({
          comment,
          rating,
          product_id: selectedOrder.product.id,
        }),
      });

      setSelectedOrderComment(null);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <Navbar />
      <dialog id="address" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Address</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="py-4">
            <textarea
              className="w-full p-2 rounded-lg textarea"
              placeholder="Enter your address"
              value={tempAddress}
              onChange={(e) => setTempAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button
              onClick={() =>
                mode === "create" ? createAddress() : updateAddress()
              }
              className="btn btn-success"
            >
              {mode === "create" ? "Create" : "Save"}
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="order" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Detail</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {selectedOrder && (
            <div className="py-4 flex flex-col gap-5">
              <img
                src={selectedOrder.product.product_image[0].image_url}
                className="w-20 h-20"
              />
              <span className="quicksand-400">
                Product: {selectedOrder.product.name}{" "}
                {selectedOrder.size && `/ ${selectedOrder.size}`}
              </span>
              <span className="quicksand-400">
                Sent to: {selectedOrder.user_address.address}
              </span>
              <span className="quicksand-400">
                Discount: {selectedOrder.discount.toLocaleString()} THB
              </span>
              <span className="quicksand-400">
                Original Price: {selectedOrder.product.price.toLocaleString()}{" "}
                THB
              </span>
              <span className="quicksand-400">
                Quantity: {selectedOrder.quantity.toLocaleString()}
              </span>
              <span className="quicksand-400">
                Total:{" "}
                {(
                  selectedOrder.quantity * selectedOrder.product.price -
                  selectedOrder.discount
                ).toLocaleString()}{" "}
                THB
              </span>
              <span className="quicksand-400">
                Order Date:{" "}
                {new Date(selectedOrder.created_at).toLocaleString()}
              </span>
              {loadingSelectedOrderCommnet ? (
                <div className="flex flex-col justify-center w-full p-10">
                  <h1 className="text-xl ubuntu-sans-mono-400 ">Loading...</h1>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <h1 className="text-lg ubuntu-sans-mono-400">Your Comment</h1>
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) =>
                      handleComment(
                        e,
                        selectedOrder && selectedOrderComment.length > 0
                          ? "update"
                          : "create"
                      )
                    }
                  >
                    {selectedOrder !== null &&
                    selectedOrderComment.length > 0 ? (
                      <>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Comment</legend>
                          <input
                            type="text"
                            name="comment"
                            className="w-full p-2 rounded-lg input"
                            placeholder="Enter your comment"
                            defaultValue={selectedOrderComment[0].comment}
                          />
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Rating</legend>
                          <input
                            name="rating"
                            type="number"
                            step={1}
                            min={1}
                            max={5}
                            className="w-full p-2 rounded-lg input"
                            placeholder="Enter your rating"
                            defaultValue={selectedOrderComment[0].rating}
                          />
                        </fieldset>
                        <button className="btn btn-success" type="submit">
                          Save Comment
                        </button>
                      </>
                    ) : (
                      <>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Comment</legend>
                          <input
                            name="comment"
                            type="text"
                            className="w-full p-2 rounded-lg input"
                            placeholder="Enter your comment"
                          />
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Rating</legend>
                          <input
                            name="rating"
                            type="number"
                            step={1}
                            min={1}
                            max={5}
                            className="w-full p-2 rounded-lg input"
                            placeholder="Enter your rating"
                          />
                        </fieldset>
                        <button className="btn btn-success" type="submit">
                          Add Comment
                        </button>
                      </>
                    )}
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </dialog>

      <dialog id="profile" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Update Profile</h3>
          <form className="py-4">
            {
              // user must has atleast level 2 to update profile
              user.level > 1 ? (
                <div className="w-full flex flex-col gap-5">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Profile Image
                    </legend>
                    <input type="file" className="file-input w-full" 
                      onChange={(e) => {
                        setTempProfileImage(e.target.files[0]) 
                        dispatch(setProfileUrl(URL.createObjectURL(e.target.files[0])))
                      }}
                    />
                  </fieldset>

                  {
                    //preview image
                    user.profile_url && (
                      <div className="flex flex-col gap-5 w-full justify-center items-center">
                        <h1 className="text-lg ubuntu-sans-mono-400">
                          Current Profile Image
                        </h1>
                        <div className="avatar">
                          <div className="w-48 rounded-full">
                            <img src={user.profile_url} />
                          </div>
                        </div>
                      </div>
                    )
                  }

                  <button className="btn btn-success" onClick={handleUpdateProfile}>
                    Update Profile
                  </button>
                </div>
              ) : (
                <span>
                  You must be at least Level 2 (Silver) to update your profile.
                </span>
              )
            }
          </form>
        </div>
      </dialog>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl mt-10 jeju-myeongjo">PROFILE</h1>
        {user.loading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="avatar mt-5">
              <div className="w-48 rounded-full skeleton "></div>
            </div>
            <div className="flex flex-row gap-5 mt-2">
              <div className="w-24 skeleton h-7"></div>
              <div className="w-24 skeleton h-7"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="avatar mt-5">
              <div className="w-48 rounded-full">
                <img
                  src={user.profile_url}
                  onClick={() => document.getElementById("profile").showModal()}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-row gap-5 mt-2">
              <h1 className="text-2xl ubuntu-sans-mono-400">{user.name}</h1>
              <h1 className="text-2xl  ubuntu-sans-mono-400">{user.surname}</h1>
            </div>
            <div className="flex flex-row gap-5 mt-2">
              <h1 className="text-2xl ubuntu-sans-mono-400">
                Balance: {user.balance.toLocaleString()}
              </h1>
            </div>
            <div className="flex flex-col gap-5 mt-2 justify-center items-center">
              <h1 className="text-2xl ubuntu-sans-mono-400">
                Membership level: {getMembershipName(user.level)}
              </h1>

              <div
                className="radial-progress text-2xl ubuntu-sans-mono-400 text-info flex flex-col justify-center items-center gap-2"
                style={{
                  "--value": `${(orderCount / nextLevelOrderGoal) * 100}`,
                  "--size": "12rem",
                  "--thickness": "1rem",
                }}
                aria-valuenow={(orderCount / nextLevelOrderGoal) * 100}
                role="progressbar"
              >
                <span>{(orderCount / nextLevelOrderGoal) * 100}%</span>
                <span className="text-sm text-black">
                  Next is {getMembershipName(user.level + 1)}
                </span>
                <span className="text-xs text-black">
                  ({orderCount}/{nextLevelOrderGoal} orders)
                </span>
              </div>
            </div>
          </div>
        )}
        {loadingAdresses ? (
          <div className="flex flex-col justify-center w-full p-10">
            <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">Loading...</h1>
          </div>
        ) : (
          <div className="flex flex-col justify-center w-full p-10">
            <div className="flex flex-row w-full justify-between items-center">
              <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">
                {addresses.length > 1 ? "Addresses" : "Address"}
              </h1>
              <button
                onClick={() => handleCreateAddress()}
                className="btn btn-success text-xs sm:text-xl mt-5  ubuntu-sans-mono-400 "
              >
                Create new address?
              </button>
            </div>

            {addresses && addresses.length > 0 && (
              <div className="mt-3 flex flex-col bg-[#f8e7f0] w-full h-auto p-3 gap-5">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-5 justify-center items-center "
                  >
                    <h1 className="text-xl flex-1 ubuntu-sans-mono-400">
                      {address.address}
                    </h1>
                    <button
                      onClick={() => handleEditAddress(address.id)}
                      className="text-xl ubuntu-sans-mono-400 btn btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-xl ubuntu-sans-mono-400 btn btn-error"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {loadingOrders ? (
          <div className="flex flex-col justify-center w-full p-10">
            <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">Loading...</h1>
          </div>
        ) : (
          <div className="flex flex-col justify-center w-full p-10">
            <div className="flex flex-row w-full justify-between items-center">
              <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">
                {orders.length > 1 ? "Orders" : "Order"}
              </h1>
            </div>

            {orders && orders.length > 0 && (
              <div className="mt-3 flex flex-col bg-[#f8e7f0] w-full h-auto p-3 gap-10">
                {orders.map((order, index) => (
                  <div
                    onClick={() => handleSelectOrder(order)}
                    key={order.id}
                    className="flex flex-row gap-5 justify-center items-center p-2 cursor-pointer"
                  >
                    <div className="md:text-lg flex-1 ubuntu-sans-mono-400 flex flex-row gap-5">
                      <img
                        src={order.product.product_image[0].image_url}
                        className="w-10 h-10 hidden md:block"
                      />
                      <Link
                        to={`/product/${order.product.id}`}
                        className="md:text-lg ubuntu-sans-mono-400"
                      >
                        {order.product.name} {order.size && `/ ${order.size}`}
                      </Link>
                    </div>

                    <div className="md:text-lg  ubuntu-sans-mono-400">
                      Total :{" "}
                      {(
                        order.quantity * order.product.price -
                        order.discount
                      ).toLocaleString()}{" "}
                      THB
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
