import Navbar from "../../components/Navbar/Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageWithBlur from "../../components/ImageWithBlur/ImageWithBlur";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import apiRequest from "../../utils/apiRequest";
import { API } from "../../constants/API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [donotMissProducts, setDonotMissProducts] = useState([]);
  const [hitProducts, setHitProducts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingDonotMiss, setLoadingDonotMiss] = useState(true);
  const [loadingHit, setLoadingHit] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest(API.recent)
      .then((data) => {
        if (data) {
          setRecentProducts(data);
        }
        setLoadingRecent(false);
      })
      .catch((error) => {
        console.error("Recent fetch failed", error);
        setLoadingRecent(false);
      });

    apiRequest(API.product + "/dontmiss")
      .then((data) => {
        if (data) {
          setDonotMissProducts(data);
        }
        setLoadingDonotMiss(false);
      })
      .catch((error) => {
        console.error("DontMiss fetch failed", error);
        setLoadingDonotMiss(false);
      });

      apiRequest(API.product + "/random")
      .then((data) => {
        if (data) {
          setHitProducts(data);
        }
        setLoadingHit(false);
      })
      .catch((error) => {
        console.error("Hit fetch failed", error);
        setLoadingHit(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-5 gap-10">
        <div className="rounded-lg overflow-hidden">
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <ImageWithBlur url="/woman1.png" />
            <ImageWithBlur url="https://img.freepik.com/premium-photo/sport-assortment-minimal-style_756748-21688.jpg" />
            <ImageWithBlur url="https://img.freepik.com/premium-photo/sport-assortment-minimal-style_756748-21686.jpg" />
          </Carousel>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <h1 className="quicksand-700 text-2xl">NEW PRODUCT</h1>
          <div className="w-full">
            {loadingRecent ? (
              <div className="w-full h-96 rounded-3xl bg-gray-200 skeleton "></div>
            ) : (
              <MultiCarousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={true}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 3,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeablee
              >
                {recentProducts.map((product) => (
                  <figure
                    onClick={(e) => navigate(`/product/${product.id}`)}
                    key={product.id}
                    className="w-11/12 rounded-3xl overflow-hidden cursor-pointer"
                  >
                    <img
                      className="h-96 object-cover"
                      src={product.product_image[0].image_url}
                      alt={product.name}
                    />
                  </figure>
                ))}
              </MultiCarousel>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="quicksand-700 text-2xl">DON’T MISS IT</h1>
          <div className="flex flex-row w-full">
            {loadingDonotMiss ? (
              <div className="flex flex-row gap-5 w-full">
              <div className="w-1/2 h-96 rounded-3xl bg-gray-200 skeleton "></div>
              <div className="w-1/2 h-96 rounded-3xl bg-gray-200 skeleton "></div>
              </div>
            ) :
              <>
                <img
                  className="w-1/2 h-96 object-cover cursor-pointer"
                  src={donotMissProducts[0].product_image[0].image_url}
                  alt={donotMissProducts[0].name}
                  onClick={(e) => navigate(`/product/${donotMissProducts[0].id}`)}
                />
                <img
                  className="w-1/2 h-96 object-cover cursor-pointer"
                  src={donotMissProducts[1].product_image[0].image_url} 
                  alt={donotMissProducts[1].name}
                  onClick={(e) => navigate(`/product/${donotMissProducts[1].id}`)}
                />
              </>
            }
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="quicksand-700 text-2xl">HIT</h1>
          <div className="w-full">
            {loadingRecent ? (
              <div className="w-full h-96 rounded-3xl bg-gray-200 skeleton "></div>
            ) : (
              <MultiCarousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={true}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 3,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                  },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeablee
              >
                {hitProducts.map((product) => (
                  <figure
                    onClick={(e) => navigate(`/product/${product.id}`)}
                    key={product.id}
                    className="w-11/12 rounded-3xl overflow-hidden cursor-pointer"
                  >
                    <img
                      className="h-96 object-cover"
                      src={product.product_image[0].image_url}
                      alt={product.name}
                    />
                  </figure>
                ))}
              </MultiCarousel>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
