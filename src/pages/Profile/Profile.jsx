import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { Link } from "react-router-dom";
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


  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    document.getElementById("order").showModal();
  }

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
          {selectedOrder &&
          <div className="py-4 flex flex-col gap-5">
            <img src={selectedOrder.product.product_image[0].image_url} className="w-20 h-20" />
            <span className="quicksand-400">Product: {selectedOrder.product.name} {selectedOrder.size && `/ ${selectedOrder.size}`}</span>
            <span className="quicksand-400">Sent to: {selectedOrder.user_address.address}</span>
            <span className="quicksand-400">Discount: {selectedOrder.discount.toLocaleString()} THB</span>
            <span className="quicksand-400">Original Price: {selectedOrder.product.price.toLocaleString()} THB</span>
            <span className="quicksand-400">Quantity: {selectedOrder.quantity.toLocaleString()}</span>
            <span className="quicksand-400">Total: {(selectedOrder.quantity * selectedOrder.product.price - selectedOrder.discount).toLocaleString()} THB</span>
            <span className="quicksand-400">Order Date: {new Date(selectedOrder.created_at).toLocaleString()}</span>
          </div>}
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
                <img src={user.profile_url} />
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
          </div>
        )}
        {loadingAdresses ? (
          <div className="flex flex-col justify-center w-full p-10">
            <h1
              className="text-xl mt-5  ubuntu-sans-mono-400 "
            >
              Loading...
            </h1>
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

            {addresses && addresses.length > 0 && <div className="mt-3 flex flex-col bg-[#f8e7f0] w-full h-auto p-3 gap-5">
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
                  <button onClick={() =>handleDeleteAddress(address.id)} className="text-xl ubuntu-sans-mono-400 btn btn-error">
                    Remove
                  </button>
                </div>
              ))}
            </div>}
          </div>
        )}

        {
          loadingOrders ? (
            <div className="flex flex-col justify-center w-full p-10">
              <h1
                className="text-xl mt-5  ubuntu-sans-mono-400 "
              >
                Loading...
              </h1>
            </div>
          ) : (
            <div className="flex flex-col justify-center w-full p-10">
              <div className="flex flex-row w-full justify-between items-center">
                <h1 className="text-xl mt-5  ubuntu-sans-mono-400 ">
                  {orders.length > 1 ? "Orders" : "Order"}
                </h1>
              </div>

              {orders && orders.length > 0 && <div className="mt-3 flex flex-col bg-[#f8e7f0] w-full h-auto p-3 gap-10">
                {orders.map((order, index) => (
                  <div
                    onClick={() => handleSelectOrder(order)}
                    key={order.id}
                    className="flex flex-row gap-5 justify-center items-center p-2 cursor-pointer"
                  >
                    <div className="md:text-lg flex-1 ubuntu-sans-mono-400 flex flex-row gap-5">
                      <img src={order.product.product_image[0].image_url} className="w-10 h-10 hidden md:block" />
                      <Link to={`/product/${order.product.id}`} className="md:text-lg ubuntu-sans-mono-400">{order.product.name}  {order.size && `/ ${order.size}`}</Link>

                    </div>

                    <div className="md:text-lg  ubuntu-sans-mono-400">
                      Total : {(order.quantity * order.product.price - order.discount).toLocaleString()} THB
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          )
        }
      </div>
    </>
  );
}
