import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest(API.wishlist)
      .then((data) => {
        if (data.wishlist.length > 0) {
          setProduct(data.wishlist);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Wishlist fetch failed", error);
        setLoading(false);
      });
  }, []);

  const handleRemove = (id) => {
    // Remove item from wishlist
    setProduct((prev) => prev.filter((item) => item.id !== id));

    apiRequest(`${API.wishlist}/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <>
          <div className="flex flex-row w-full justify-center items-center flex-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="none"
              viewBox="0 0 63 63"
              className="h-8 w-8 -rotate-[32deg] relative top-8.5"
            >
              <path fill="url(#a)" d="M0 0h63v63H0z" />
              <defs>
                <pattern
                  id="a"
                  width={1}
                  height={1}
                  patternContentUnits="objectBoundingBox"
                >
                  <use xlinkHref="#b" transform="scale(.02)" />
                </pattern>
                <image
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAMgAAAAB1y6+rAAAEz0lEQVRoBe2ZW6hmYxjHBzNMwzgNcppd24xIaBJy6wKlpOaCuCYXEuZGUiTNuCblcCeHuaBESXJjzMioySEpiYwUGjOYwUQ5/X571v/r/Zb1nfZqfV/pe+q33+c9PYf3fde71t57xYq5zFdgvgJdrMBRDUab2hqGDWxy/tEDezvoSMApdS6pd+BytMnlOq/P+2e0q25HHNPCvMmcAQtwHPwBf8Okch4TzgR39bdJJ086PjtwFhPvhvfBwN0Jg5ffYSfYvxYMLFLqJ9J4D+yCw6AN+Qu0uQO2wOlQl8RRb5+ovoHRhyCOk0RZT9uPjLu3Zt1kDPAnqM+xbiJpVz8A98OxUC4E1XaymemufIKN04NVe/rS/iftb8AJ4C68CekrS4P+BbKzZZ/6O+ARbi1up6yG7bAHHoJLYA0oq+AK2AruRhnMbuoexTLR/dS3wZXgiiva3wQPwz4obXxGfR0sS8rzWOqjjJ3CgJcggZQJqLsYJ0Okbtu6u/gMxIblW1Aesfo8uvulHFDq/aOG13T4JJSBmMTjUNosdbr6xL4HoLRxWzXC23bY3GpYuyJX+krM7AAD8Tl4F9JnEOMG4g5mV79B96ofS3RwMeyFL+FCWK4sMvEj+ADOhwRvWR4Tqn1if8auR/cycDFclBsgkjGp95V2Pg1ZhQfRh07om91N5XnM5oj57CSelANX5fIqHid/XRnJsai6plq8jjcXVvGmM66RYpa+jBzsdl4Gw44B3Z2LMWRHvJojI3fE68+JJuD3T1YDdSbiSzfPiNd7L4FE07TSJvBzMTh3ftPY2OmyNGhfhvpX98E3RiXlwCPzfTFoYWnK7H4Y7AVgEupfQaS3uD0lPZS2fVLVnXhVof9nS6u+rotrKgf69yofSxx8F5iE7IFZJYDrpe+4/ZQ+p8ZzIyg5akdqDT8N2pdgJjrZD8RpSRbNUm4CYzCeX+EkGJkEY3ryHpoG5Ile63QVE/GY58Z6Dj2Jjh3JHZUBV+IwnAsTG2HOpKKP+LkVPbvh7zcXQdNzTXOzONjfE/aCibgifiZMU07D2beQU7G9jXM/m8tn5fqasaxcrbl1VbvPQnz77tg4qdUyOPWdhcHv0NcXBsuxRXMr1dNwDuS5cEe2VBZb+fNc+oxki3ehr4JWRpk/TNbSmZfy2+j6auUvBupH7GUMd/01fDY+NoNJRVoloxENPAW5QSxfhJWQZFEnkjIo7Sgeq2B9ubadO1DcgdcgR8zyFShXjOpYUiZh4ItwJyxA+jpJAvtLDtZQ+req3CaWH8MGUBLEkdron46/BQ6BC/MFTGqDKeOJK1bKaiqvQrkzP1C/thw0Qtem76nHoLRzkHrdH03dicfsUSiDcHf8Xd+/KtalvsqbGOBXbOY79wBcBzORm/Hqh1x51Hwbe1zqt5rJ+DxtAz83koTlbliEqe4G/pYkTi+l9iEYUBJS/xxuh1PBv6zfB/ugHONLz+PlcTXR+s7R1J00OfMFaaD+a6FcaYM22PItnX4f7KshkoVJfeplEjOQjfAC1I9Ogrf0u2krHA+Zizr9HdHpIElgiwzwyHi8ksSn6I+AX7WOy9hSp3n2UgaWaNwln491kP70WTa1lf1T1ZuCaWqrBzXOmPqceX2+AvMVmK/A/2QF/gWoUTYkOgrGXAAAAABJRU5ErkJggg=="
                  id="b"
                  preserveAspectRatio="none"
                />
              </defs>
            </svg>
            <h1 className="ubuntu-sans-mono-700 text-4xl text-center mt-10">
              Favorite
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center mt-10">
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Item</h2>
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Price</h2>
            <h2 className="text-2xl ubuntu-sans-mono-400">Action</h2>
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
          <div className="flex flex-row w-full justify-center items-center flex-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="none"
              viewBox="0 0 63 63"
              className="h-8 w-8 -rotate-[32deg] relative top-8.5"
            >
              <path fill="url(#a)" d="M0 0h63v63H0z" />
              <defs>
                <pattern
                  id="a"
                  width={1}
                  height={1}
                  patternContentUnits="objectBoundingBox"
                >
                  <use xlinkHref="#b" transform="scale(.02)" />
                </pattern>
                <image
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMqADAAQAAAABAAAAMgAAAAB1y6+rAAAEz0lEQVRoBe2ZW6hmYxjHBzNMwzgNcppd24xIaBJy6wKlpOaCuCYXEuZGUiTNuCblcCeHuaBESXJjzMioySEpiYwUGjOYwUQ5/X571v/r/Zb1nfZqfV/pe+q33+c9PYf3fde71t57xYq5zFdgvgJdrMBRDUab2hqGDWxy/tEDezvoSMApdS6pd+BytMnlOq/P+2e0q25HHNPCvMmcAQtwHPwBf8Okch4TzgR39bdJJ086PjtwFhPvhvfBwN0Jg5ffYSfYvxYMLFLqJ9J4D+yCw6AN+Qu0uQO2wOlQl8RRb5+ovoHRhyCOk0RZT9uPjLu3Zt1kDPAnqM+xbiJpVz8A98OxUC4E1XaymemufIKN04NVe/rS/iftb8AJ4C68CekrS4P+BbKzZZ/6O+ARbi1up6yG7bAHHoJLYA0oq+AK2AruRhnMbuoexTLR/dS3wZXgiiva3wQPwz4obXxGfR0sS8rzWOqjjJ3CgJcggZQJqLsYJ0Okbtu6u/gMxIblW1Aesfo8uvulHFDq/aOG13T4JJSBmMTjUNosdbr6xL4HoLRxWzXC23bY3GpYuyJX+krM7AAD8Tl4F9JnEOMG4g5mV79B96ofS3RwMeyFL+FCWK4sMvEj+ADOhwRvWR4Tqn1if8auR/cycDFclBsgkjGp95V2Pg1ZhQfRh07om91N5XnM5oj57CSelANX5fIqHid/XRnJsai6plq8jjcXVvGmM66RYpa+jBzsdl4Gw44B3Z2LMWRHvJojI3fE68+JJuD3T1YDdSbiSzfPiNd7L4FE07TSJvBzMTh3ftPY2OmyNGhfhvpX98E3RiXlwCPzfTFoYWnK7H4Y7AVgEupfQaS3uD0lPZS2fVLVnXhVof9nS6u+rotrKgf69yofSxx8F5iE7IFZJYDrpe+4/ZQ+p8ZzIyg5akdqDT8N2pdgJjrZD8RpSRbNUm4CYzCeX+EkGJkEY3ryHpoG5Ile63QVE/GY58Z6Dj2Jjh3JHZUBV+IwnAsTG2HOpKKP+LkVPbvh7zcXQdNzTXOzONjfE/aCibgifiZMU07D2beQU7G9jXM/m8tn5fqasaxcrbl1VbvPQnz77tg4qdUyOPWdhcHv0NcXBsuxRXMr1dNwDuS5cEe2VBZb+fNc+oxki3ehr4JWRpk/TNbSmZfy2+j6auUvBupH7GUMd/01fDY+NoNJRVoloxENPAW5QSxfhJWQZFEnkjIo7Sgeq2B9ubadO1DcgdcgR8zyFShXjOpYUiZh4ItwJyxA+jpJAvtLDtZQ+req3CaWH8MGUBLEkdron46/BQ6BC/MFTGqDKeOJK1bKaiqvQrkzP1C/thw0Qtem76nHoLRzkHrdH03dicfsUSiDcHf8Xd+/KtalvsqbGOBXbOY79wBcBzORm/Hqh1x51Hwbe1zqt5rJ+DxtAz83koTlbliEqe4G/pYkTi+l9iEYUBJS/xxuh1PBv6zfB/ugHONLz+PlcTXR+s7R1J00OfMFaaD+a6FcaYM22PItnX4f7KshkoVJfeplEjOQjfAC1I9Ogrf0u2krHA+Zizr9HdHpIElgiwzwyHi8ksSn6I+AX7WOy9hSp3n2UgaWaNwln491kP70WTa1lf1T1ZuCaWqrBzXOmPqceX2+AvMVmK/A/2QF/gWoUTYkOgrGXAAAAABJRU5ErkJggg=="
                  id="b"
                  preserveAspectRatio="none"
                />
              </defs>
            </svg>
            <h1 className="ubuntu-sans-mono-700 text-4xl text-center mt-10">
              Favorite
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center mt-10">
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Item</h2>
            <h2 className="w-1/3 text-2xl ubuntu-sans-mono-400">Price</h2>
            <h2 className="text-2xl ubuntu-sans-mono-400">Action</h2>
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
                        {item.product.name}
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
                  <button
                    onClick={(e) => handleRemove(item.id)}
                    className="btn btn-error text-white px-4 py-1 rounded-lg sm:w-32 w-24 ubuntu-sans-mono-400"
                  >
                    Remove
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen h-full">
          <h1 className="ubuntu-sans-mono-700 text-4xl text-[#454545]">
            Your wishlist is empty
          </h1>
        </div>
      )}
    </>
  );
}
