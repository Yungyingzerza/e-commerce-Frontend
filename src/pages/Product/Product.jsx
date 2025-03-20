import Navbar from "../../components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageWithBlur from "../../components/ImageWithBlur/ImageWithBlur";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount, setCartTotalPrice } from "../../store/userSlice";
import { addToast } from "../../store/toastSlice";
export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productStock, setProductStock] = useState(null);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleAddToWishlist = useCallback(() => {
    setLoadingWishlist(true);
    apiRequest(API.wishlist, {
      method: "POST",
    body: JSON.stringify({ product_id: id }),
    })
    .then((data) => {
        setWishlistId(data.wishlist.id);
        setLoadingWishlist(false);
    })
    .catch((error) => {
        console.error("Wishlist add failed", error);
        setLoadingWishlist(false);
    });
    setWishlist(true);

  }, [id]);

  const handleRemoveFromWishlist = useCallback(() => {
    setLoadingWishlist(true);
    apiRequest(API.wishlist + "/" + wishlistId, {
      method: "DELETE",
    })
    .then(() => {
        setWishlistId(null);
        setLoadingWishlist(false);
    })
    .catch((error) => {
        console.error("Wishlist remove failed", error);
        setLoadingWishlist(false);
    });
    setWishlist(false);
  }, [wishlistId]);

  const handleAddCart = useCallback(() => {
      dispatch(setCartCount(user.cart.count + 1));
      dispatch(setCartTotalPrice(user.cart.total_price + product.price));
      dispatch(addToast({ title: "Added to cart", type: "success" }));
      apiRequest(API.cart, {
        method: "POST",
        body: JSON.stringify({ product_id: id, quantity: 1, size: selectedSize }),
      })
  }, [id, product, user.cart.count, user.cart.total_price, selectedSize]);

  useEffect(() => {
    apiRequest(API.product + "/" + id)
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
          if(data.product.product_size == 0) setProductStock(data.product.stock);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product fetch failed", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    apiRequest(API.wishlistByProduct + "/" + id)
      .then((data) => {
        if (data.id) {
            setWishlist(true);
            setWishlistId(data.id);
        }
        setLoadingWishlist(false);
      })
      .catch((error) => {
        console.error("Wishlist fetch failed", error);
        setLoadingWishlist(false);
      });

      //if product has size, set the first size as default
      if(product && product.product_size.length > 0){
          setSelectedSize(product.product_size[0].size);
      }
  }, [product]);

  useEffect(() => {
    if(product && product.product_size.length > 0){
        const size = product.product_size.find((size) => size.size === selectedSize);
        if(size){
            setProductStock(size.stock);
        }
    }
  }, [selectedSize]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex flex-col md:flex-row justify-center items-center md:p-20 bg-[#F8E8EE] min-h-screen h-full">
          <div className="md:w-1/2 pt-0 p-5 rounded-2xl h-full md:self-start">
            {/* skeleton */}
            <div className="w-full min-w-32 h-96 rounded-3xl bg-gray-200 skeleton "></div>
          </div>
          <div className="flex-1 flex flex-col md:self-start gap-5 h-full">
            <h1 className="ubuntu-sans-mono-700 text-4xl text-[#454545] skeleton w-11/12 h-6 bg-[#454545]"></h1>
            <h2 className="price text-2xl text-[#454545] skeleton w-32 h-4 bg-[#454545]"></h2>
          </div>
        </div>
      ) : product ? (
        <div className="bg-[#F8E8EE] min-h-screen">
          <div className="flex flex-col md:flex-row justify-center items-center md:p-20 bg-[#F8E8EE]  h-full">
            <div className="md:w-1/2 pt-0 p-5 rounded-2xl h-full md:self-start">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
              >
                {product.product_image.map((image) => (
                  <ImageWithBlur key={image.id} url={image.image_url} />
                ))}
              </Carousel>
            </div>
            <div className="flex-1 flex flex-col md:self-start gap-5 h-full">
              <h1 className="ubuntu-sans-mono-700 text-4xl text-[#454545]">
                {product.name}
              </h1>
              <h2 className="price text-2xl text-[#454545]">
                {product.price.toLocaleString()} THB
              </h2>
              <h2 className="price text-xl text-[#454545]">
                Stock: {productStock}
              </h2>

              {product.product_size.length > 0 && (
                <>
                  <h3 className="vazirmatn-700 text-3xl ">SIZE</h3>
                  <div className="flex flex-row gap-5">
                    {product.product_size.map((size) => (
                      selectedSize == size.size ?
                      <button
                        key={size.id}
                        className="btn trispace text-[#454545] bg-[#c9a3e7] rounded-lg"
                      >
                        {size.size}
                      </button>
                      :
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.size)}
                        className="btn trispace text-[#454545] bg-[#F1E3FC] rounded-lg"
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
                </>
              )}

          {user.id &&            
              <div className="flex flex-col gap-5">
                <button onClick={handleAddCart} className="btn rounded-2xl bg-[#F3D0D7] text-[#C8809B] inconsolata-700 text-2xl hover:bg-[#dfbfc5]">
                  ADD To Cart
                </button>
                {
                  loadingWishlist ? <button className="btn rounded-2xl  text-[#C8809B] inconsolata-700 text-2xl flex flex-row gap-2 skeleton cursor-no-drop">Loading...</button> :
                  wishlist ? <button onClick={handleRemoveFromWishlist} className="btn rounded-2xl  text-[#C8809B] inconsolata-700 text-2xl flex flex-row gap-2">
                      Already in Wishlist
                      </button> : 
                  <button onClick={handleAddToWishlist} className="btn rounded-2xl  text-[#C8809B] inconsolata-700 text-2xl flex flex-row gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    fill="none"
                    viewBox="0 0 63 63"
                    className="h-7 w-7 -rotate-[32deg] relative bottom-1.5"
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
                  Favorite
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    fill="none"
                    viewBox="0 0 63 63"
                    className="h-6 w-6 rotate-[32deg] relative top-2"
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
                </button>}
              </div>}

            </div>
          </div>
          <div className="flex flex-col bg-[#F8E8EE] h-full p-10">
            <h3 className="vazirmatn-700 text-3xl">DESCRIPTION</h3>
            <p className="text-lg ubuntu-sans-mono-400">{product.description}</p>

            {product.comments.length > 0 && (
              <>
                <h3 className="vazirmatn-700 text-3xl mt-10">REVIEWS</h3>
                <div className="flex flex-col gap-10 mt-5">
                  {product.comments.map((comment) => (
                    <div key={comment.id} className="flex flex-row gap-5">
                      <img
                        src={comment.user.profile_url}
                        alt={comment.user.name}
                        className="w-16 h-16 rounded-full cursor-pointer"
                        onClick={() => navigate(`/user/${comment.user.id}`)}
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold w-fit cursor-pointer" onClick={() => navigate(`/user/${comment.user.id}`)}>{comment.user.name} {comment.user.surname}</h4>
                        <p className="text-lg">{comment.comment}</p>
                        <div className="rating">
                          <input type="radio" name={`rating-${comment.id}`} className="mask mask-star-2 bg-orange-400" aria-label="1 star" disabled defaultChecked={comment.rating === 1}/>
                          <input type="radio" name={`rating-${comment.id}`} className="mask mask-star-2 bg-orange-400" aria-label="2 star" disabled defaultChecked={comment.rating === 2}/>
                          <input type="radio" name={`rating-${comment.id}`} className="mask mask-star-2 bg-orange-400" aria-label="3 star" disabled defaultChecked={comment.rating === 3}/>
                          <input type="radio" name={`rating-${comment.id}`} className="mask mask-star-2 bg-orange-400" aria-label="4 star" disabled defaultChecked={comment.rating === 4}/>
                          <input type="radio" name={`rating-${comment.id}`} className="mask mask-star-2 bg-orange-400" aria-label="5 star" disabled defaultChecked={comment.rating === 5}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center  bg-[#F8E8EE] min-h-screen h-full">
          <h1 className="ubuntu-sans-mono-700 text-4xl text-[#454545]">
            Product Not Found
          </h1>
        </div>
      )}
    </>
  );
}
