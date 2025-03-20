import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { Link } from "react-router-dom";

export default function MyProduct() {
  const user = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tempImages, setTempImages] = useState([]);
  const [tempName, setTempName] = useState("");
  const [tempCategory, setTempCategory] = useState("Clothing");
  const [tempPrice, setTempPrice] = useState(0);
  const [tempDescription, setTempDescription] = useState("");
  const [tempStock, setTempStock] = useState(0);

  const [hasSize, setHasSize] = useState(false);
  const [tempSize, setTempSize] = useState([]);
  const [tempSizeName, setTempSizeName] = useState("");
  const [tempSizeStock, setTempSizeStock] = useState(0);
  const [editSizeId, setEditSizeId] = useState(null);

  const [editId, setEditId] = useState(null);

  const [mode, setMode] = useState("add");

  const getCategoryId = (categoryName) => {
    const categories = [
      {
        id: "1ee20250-405f-4c32-bd06-45d02689f5ed",
        name: "Clothing",
      },
      {
        id: "2ee20250-405f-4c32-bd06-45d02689f5ed",
        name: "Shoes",
      },
      {
        id: "3ee20250-405f-4c32-bd06-45d02689f5ed",
        name: "Equipment",
      },
    ];

    // Find and return the category id based on the category name
    const category = categories.find((c) => c.name === categoryName);
    return category ? category.id : null; // Return null if no category found
  };

  const getCategoryName = (categoryId) => {
    const categories = [
      {
        id: "1ee20250-405f-4c32-bd06-45d02689f5ed",
        name: "Clothing",
      },
      {
        id: "2ee20250-405f-4c32-bd06-45d02689f5ed",
        name: "Shoes",
      },
      {
        id: "3ee20250-405f-4c32-bd06-45d02689f5ed",
        name: "Equipment",
      },
    ];

    // Find and return the category name based on the category id
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : null; // Return null if no category found
  };

  useEffect(() => {
    apiRequest(API.myproducts)
      .then((data) => {
        if (data.length > 0) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  }, []);

  const openAddModal = () => {
    setMode("add");
    //reset all temp values
    setEditId(null);
    setTempName("");
    setTempPrice(0);
    setTempStock(0);
    setTempDescription("");
    setTempCategory("Clothing");
    setTempImages([]);
    setHasSize(false);
    setTempSize([]);

    document.getElementById("product").showModal();
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", tempName);
    formData.append("price", tempPrice);
    formData.append("stock", tempStock);
    formData.append("description", tempDescription);
    formData.append("category_id", getCategoryId(tempCategory));
    
    tempSize.forEach((item, index) => {
      formData.append(`size[${index}][name]`, item.name);
      formData.append(`size[${index}][stock]`, item.stock);
  });
  
  

    //add images to form data
    for (let i = 0; i < tempImages.length; i++) {
      formData.append("images[]", tempImages[i]);
    }

    //make user feel like the product is added instantly
    setProducts([
      ...products,
      {
        id: "loading",
        category_id: getCategoryId(tempCategory),
        user_id: user.id,
        name: tempName,
        description: tempDescription,
        price: tempPrice,
        stock: tempStock,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product_image: Array.from(tempImages).map((image, i) => ({
          id: `loading-${i}`,
          product_id: "loading",
          image_url: URL.createObjectURL(image),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })),
      },
    ]);
    document.getElementById("product").close();

    apiRequest(
      API.product,
      {
        method: "POST",
        body: formData,
      },
      false
    )
      .then((data) => {
        if (data.product) {
          const newProducts = products.filter((item) => item.id !== "loading");
          setProducts(newProducts);
          setProducts([...products, data.product]);
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  const handleEditProduct = (e) => {
    e.preventDefault();

    //make user feel like the product is edited instantly
    setProducts((prev) => {
      return prev.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            name: tempName,
            price: tempPrice,
            stock: tempStock,
            description: tempDescription,
            category_id: getCategoryId(tempCategory),
          };
        }
        return item;
      });
    });

    document.getElementById("product").close();

    apiRequest(`${API.product}/${editId}`, {
      method: "POST",
      body: JSON.stringify({
        name: tempName,
        price: tempPrice,
        stock: tempStock,
        description: tempDescription,
        category_id: getCategoryId(tempCategory),
      }),
    })
      .then((data) => {
        if (data.product) {
          //edit product by edit
          setProducts((prev) => {
            return prev.map((item) => {
              if (item.id === editId) {
                return data.product;
              }
              return item;
            });
          });
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  const openEditModal = (product) => {
    setMode("edit");
    setEditId(product.id);
    setTempName(product.name);
    setTempPrice(product.price);
    setTempStock(product.stock);
    setTempDescription(product.description);
    setTempCategory(getCategoryName(product.category_id));
    setTempImages(product.product_image);
    
    if(product.product_size){
      setHasSize(true)
      
      //map size to tempSize
      setTempSize(product.product_size.map((item) => ({
        id: item.id,
        name: item.size,
        stock: item.stock
      })))

    }

    document.getElementById("product").showModal();
  };

  const handleDelete = (product) => {
    //remove from products
    const newProducts = products.filter((item) => item.id !== product.id);
    setProducts(newProducts);

    //delete from database
    apiRequest(API.product + "/" + product.id, {
      method: "DELETE",
    });
  };

  const handleClickDeleteImage = (image) => {
    setProducts((prev) => {
      return prev.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            product_image: item.product_image.filter(
              (img) => img.id !== image.id
            ),
          };
        }
        return item;
      });
    });
  };

  const handleUploadImage = (e) => {
    const formData = new FormData();

    //add images to form data
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images[]", e.target.files[i]);

      //add image to tempImages
      setTempImages((prev) => [
        ...prev,
        {
          id: `loading-${i}`,
          product_id: "loading",
          image_url: URL.createObjectURL(e.target.files[i]),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      //make user feel like the product is added instantly
      setProducts((prev) => {
        return prev.map((item) => {
          if (item.id === editId) {
            return {
              ...item,
              product_image: [
                ...item.product_image,
                {
                  id: `loading-${i}`,
                  product_id: "loading",
                  image_url: URL.createObjectURL(e.target.files[i]),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              ],
            };
          }
          return item;
        });
      });
    }

    formData.append("product_id", editId);

    apiRequest(
      API.image,
      {
        method: "POST",
        body: formData,
      },
      false
    ).then((data) => {
      if (data.product) {
        setProducts((prev) => {
          return prev.map((item) => {
            if (item.id === editId) {
              return data.product;
            }
            return item;
          });
        });

        setTempImages(data.product.product_image);
      }
    });
  };

  const handleAddSize = (e) => {
    e.preventDefault();

    setTempSize((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        name: tempSizeName,
        stock: tempSizeStock,
      },
    ]);

    setTempSizeName("");
    setTempSizeStock(0);

    document.getElementById("product_size").close();

    if(editId){
      apiRequest(`${API.product}/size`, {
        method: "POST",
        body: JSON.stringify({
          product_id: editId,
          size: tempSizeName,
          stock: tempSizeStock,
        }),
      })
      .then((data) => {
        if (data.product) {
          //change product size in products
          setProducts((prev) => {
            return prev.map((item) => {
              if (item.id === editId) {
                return {
                  ...item,
                  product_size: [
                    ...item.product_size,
                    {
                      id: data.product.id,
                      size: tempSizeName,
                      stock: tempSizeStock,
                    },
                  ],
                };
              }
              return item;
            });
          });
        }
      });
    }
  };

  const handleEditSize = (e) => {
    e.preventDefault();

    setTempSize((prev) => {
      return prev.map((item) => {
        if (item.id === editSizeId) {
          return {
            ...item,
            name: tempSizeName,
            stock: tempSizeStock,
          };
        }
        return item;
      });
    });

    setTempSizeName("");
    setTempSizeStock(0);

    document.getElementById("product_size").close();

    if(editId){
      apiRequest(`${API.product}/size/${editSizeId}`, {
        method: "PUT",
        body: JSON.stringify({
          product_id: editId,
          size: tempSizeName,
          stock: tempSizeStock,
        }),
      })

      //change product size in products
      setProducts((prev) => {
        return prev.map((item) => {
          if (item.id === editId) {
            return {
              ...item,
              product_size: item.product_size.map((size) => {
                if(size.id === editSizeId){
                  return {
                    ...size,
                    size: tempSizeName,
                    stock: tempSizeStock
                  }
                }
                return size
              }),
            };
          }
          return item;
        });
      });

    }

  }

  const handleDeleteSize = (sizeId) => {
    setTempSize((prev) => {
      return prev.filter((item) => item.id !== sizeId);
    });

    setTempSizeName("");
    setTempSizeStock(0);

    document.getElementById("product_size").close();

    if(editId){
      apiRequest(`${API.product}/size/${sizeId}`, {
        method: "DELETE",
      })

      //change product size in products
      setProducts((prev) => {
        return prev.map((item) => {
          if (item.id === editId) {
            return {
              ...item,
              product_size: item.product_size.filter((size) => size.id !== sizeId),
            };
          }
          return item;
        });
      });

    }

  };

  return (
    <>
      {user.loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="product_size" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Product Size</h3>
              <form className="py-4 flex flex-col gap-5" onSubmit={editSizeId ? handleEditSize : handleAddSize}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Size Name</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Type here"
                    required
                    onChange={(e) => setTempSizeName(e.target.value)}
                    value={tempSizeName}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Size Stock</legend>
                  <input
                    type="number"
                    step={1}
                    min={1}
                    className="input w-full"
                    placeholder="Type here"
                    required
                    onChange={(e) => setTempSizeStock(e.target.value)}
                    value={tempSizeStock}
                  />
                </fieldset>

                <button type="submit" className="btn btn-primary">
                  {editSizeId ? "Edit Size" : "Add Size"}
                </button>

                {editSizeId &&
                <button className="btn btn-error" onClick={() => handleDeleteSize(editSizeId)}>
                   Delete Size
                </button>
                }
              </form>
            </div>
          </dialog>
          <dialog id="product" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                {mode === "add" ? "Add Product" : "Edit Product"}
              </h3>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="py-4 flex flex-col gap-5">
                {mode === "add" ? (
                  <form
                    className="w-full flex flex-col gap-2"
                    onSubmit={handleAddProduct}
                  >
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Upload Images</legend>
                      <input
                        type="file"
                        className="file-input w-full"
                        multiple
                        onChange={(e) => setTempImages(e.target.files)}
                        required
                      />
                    </fieldset>

                    {/* preview image and delete */}
                    <div className="flex flex-row gap-2">
                      {tempImages.length > 0 &&
                        Array.from(tempImages).map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt="preview"
                              className="h-20 w-20 object-cover"
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-circle btn-danger absolute right-1 top-1"
                              onClick={() => {
                                const newImages = Array.from(tempImages);
                                newImages.splice(index, 1);
                                setTempImages(newImages);
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Product Name</legend>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Type here"
                        required
                        onChange={(e) => setTempName(e.target.value)}
                        value={tempName}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Pick a category
                      </legend>
                      <select
                        defaultValue="Clothing"
                        className="select w-full"
                        onChange={(e) => setTempCategory(e.target.value)}
                        value={tempCategory}
                      >
                        <option>Clothing</option>
                        <option>Shoes</option>
                        <option>Equipment</option>
                      </select>
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Price</legend>
                      <input
                        type="number"
                        className="input w-full"
                        placeholder="Type here"
                        min={100}
                        required
                        onChange={(e) => setTempPrice(e.target.value)}
                        value={tempPrice}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Product Description
                      </legend>
                      <textarea
                        type="text"
                        className="input w-full"
                        placeholder="Type here"
                        required
                        onChange={(e) => setTempDescription(e.target.value)}
                        value={tempDescription}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Product Stock</legend>
                      <input
                        type="number"
                        step={1}
                        min={1}
                        className="input w-full"
                        placeholder="Type here"
                        required
                        onChange={(e) => setTempStock(e.target.value)}
                        value={tempStock}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Has Size?</legend>
                      <select
                        defaultValue="No"
                        className="select w-full"
                        onChange={(e) => setHasSize(e.target.value === "Yes")}
                        value={hasSize ? "Yes" : "No"}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </fieldset>

                    {hasSize && (
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">
                            Product Size
                          </legend>
                          <div className="flex flex-row flex-wrap gap-2">

                            {tempSize.map((size, index) => (
                              <button
                                className="btn btn-sm btn-info w-12 truncate "
                                onClick={(e) =>
                                  {
                                    e.preventDefault()
                                    setEditSizeId(size.id)
                                    setTempSizeName(size.name)
                                    setTempSizeStock(size.stock)
                                    document.getElementById("product_size").showModal()
                                  }
                                }
                              >
                                {size.name}
                              </button>
                            ))}

                            <button
                              className="btn btn-sm btn-secondary w-12"
                              onClick={(e) =>{
                                e.preventDefault()
                                setEditSizeId(null)
                                setTempSizeName("")
                                setTempSizeStock(0)
                                document.getElementById("product_size").showModal()
                              }
                              }
                            >
                              Add Size
                            </button>
                          </div>
                        </fieldset>
                    )}

                    <button type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                  </form>
                ) : (
                  <form
                    className="w-full flex flex-col gap-2"
                    onSubmit={handleEditProduct}
                  >
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Upload Images</legend>
                      <input
                        type="file"
                        className="file-input w-full"
                        multiple
                        onChange={handleUploadImage}
                      />
                    </fieldset>

                    {/* preview image and delete */}
                    <div className="flex flex-row gap-2">
                      {tempImages.length > 0 &&
                        Array.from(tempImages).map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image.image_url}
                              alt="preview"
                              className="h-20 w-20 object-cover"
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-circle btn-danger absolute right-1 top-1"
                              onClick={() => {
                                //if has one image cant delete
                                if (tempImages.length === 1) {
                                  return;
                                }

                                handleClickDeleteImage(image);
                                const newImages = Array.from(tempImages);
                                newImages.splice(index, 1);
                                setTempImages(newImages);
                                apiRequest(API.image + "/" + image.id, {
                                  method: "DELETE",
                                });
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Product Name</legend>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Type here"
                        required
                        onChange={(e) => setTempName(e.target.value)}
                        value={tempName}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Pick a category
                      </legend>
                      <select
                        defaultValue={tempCategory}
                        className="select w-full"
                        onChange={(e) => setTempCategory(e.target.value)}
                      >
                        <option>Clothing</option>
                        <option>Shoes</option>
                        <option>Equipment</option>
                      </select>
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Price</legend>
                      <input
                        type="number"
                        className="input w-full"
                        placeholder="Type here"
                        min={100}
                        required
                        onChange={(e) => setTempPrice(e.target.value)}
                        value={tempPrice}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Product Description
                      </legend>
                      <textarea
                        type="text"
                        className="input w-full"
                        placeholder="Type here"
                        required
                        onChange={(e) => setTempDescription(e.target.value)}
                        value={tempDescription}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Product Stock</legend>
                      <input
                        type="number"
                        step={1}
                        min={1}
                        className="input w-full"
                        placeholder="Type here"
                        required
                        onChange={(e) => setTempStock(e.target.value)}
                        value={tempStock}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Has Size?</legend>
                      <select
                        defaultValue="No"
                        className="select w-full"
                        onChange={(e) => setHasSize(e.target.value === "Yes")}
                        value={hasSize ? "Yes" : "No"}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </fieldset>

                    {hasSize && (
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">
                            Product Size
                          </legend>
                          <div className="flex flex-row flex-wrap gap-2">

                            {tempSize.map((size, index) => (
                              <button
                                className="btn btn-sm btn-info w-12 truncate "
                                onClick={(e) =>
                                  {
                                    e.preventDefault()
                                    setEditSizeId(size.id)
                                    setTempSizeName(size.name)
                                    setTempSizeStock(size.stock)
                                    document.getElementById("product_size").showModal()
                                  }
                                }
                              >
                                {size.name}
                              </button>
                            ))}

                            <button
                              className="btn btn-sm btn-secondary w-12"
                              onClick={(e) =>{
                                e.preventDefault()
                                setEditSizeId(null)
                                setTempSizeName("")
                                setTempSizeStock(0)
                                document.getElementById("product_size").showModal()
                              }
                              }
                            >
                              Add Size
                            </button>
                          </div>
                        </fieldset>
                    )}

                    <button type="submit" className="btn btn-primary">
                      Edit Product
                    </button>
                  </form>
                )}
              </div>
            </div>
          </dialog>
          <div className="flex flex-row w-full justify-center items-center flex-wrap">
            <h1 className="ubuntu-sans-mono-700 text-4xl text-center mt-10">
              My Product
            </h1>
          </div>
          {loading ? (
            <>
              <div className="flex flex-row justify-center w-full gap-10 flex-wrap mt-10">
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
                <div className="h-64 w-64 skeleton "></div>
              </div>
            </>
          ) : (
            products && (
              <>
                <div className="flex flex-row w-full justify-center items-center flex-wrap">
                  {products.length > 0 ? (
                    <div className="flex flex-row w-full justify-center items-center flex-wrap">
                      <button
                        onClick={openAddModal}
                        className="btn btn-primary mt-5"
                      >
                        Add Product
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="ubuntu-sans-mono-400 text-2xl text-center mt-10">
                        You don't have any product yet
                      </h1>
                      <div className="flex flex-row w-full justify-center items-center flex-wrap">
                        <button
                          onClick={openAddModal}
                          className="btn btn-primary mt-5"
                        >
                          Add Product
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mx-auto place-items-center">
                  {products.map((item, index) => (
                    <div
                      key={item.id}
                      className="w-64 h-fit flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      <img
                        src={item.product_image[0].image_url}
                        alt={item.name}
                        className="h-48 w-48 object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <h1 className="ubuntu-sans-mono-700 text-lg w-full">
                          {item.name}
                        </h1>
                        <h2 className="ubuntu-sans-mono-400 text-lg w-full">
                          {item.price.toLocaleString()} THB
                        </h2>
                      </div>
                      <button
                        onClick={() => openEditModal(item)}
                        className="btn btn-warning w-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-error w-full"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </>
      )}
    </>
  );
}
