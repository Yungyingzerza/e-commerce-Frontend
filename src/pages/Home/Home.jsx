import Navbar from '../../components/Navbar/Navbar'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageWithBlur from '../../components/ImageWithBlur/ImageWithBlur'
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className='flex flex-col p-5 gap-10'>
      <div className='rounded-lg overflow-hidden'>
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <ImageWithBlur url="/woman1.png" />
          <ImageWithBlur url="https://img.freepik.com/premium-photo/sport-assortment-minimal-style_756748-21688.jpg" />
          <ImageWithBlur url="https://img.freepik.com/premium-photo/sport-assortment-minimal-style_756748-21686.jpg" />
        </Carousel>
      </div>

      <div className='flex flex-col gap-5'>
        <h1 className='quicksand-700 text-2xl'>NEW PRODUCT</h1>
        <div>
          <MultiCarousel additionalTransfrom={0}
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
                  min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
              }
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
            <figure className='w-11/12 rounded-3xl overflow-hidden'>
              <img
                src="/shoe1.png"
                alt="Shoes" />
            </figure>

            <figure className='w-11/12 rounded-3xl overflow-hidden'>
              <img
                src="/shoe2.png"
                alt="Shoes" />
            </figure>

            <figure className='w-11/12 rounded-3xl overflow-hidden'>
              <img
                src="/shoe3.png"
                alt="Shoes" />
            </figure>
          </MultiCarousel>
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <h1 className='quicksand-700 text-2xl'>DON’T MISS IT</h1>
        <div className='flex flex-row w-full'>
          <img
            className='w-1/2 h-96 object-cover'
            src="/woman_group.png"
            alt="woman group" />
          <img
            className='w-1/2 h-96 object-cover'
            src="/men.png"
            alt="men" />
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <h1 className='quicksand-700 text-2xl'>HIT</h1>
        <div>
          <MultiCarousel additionalTransfrom={0}
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
                  min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
              }
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
            <figure className='w-11/12 h-96 rounded-3xl overflow-hidden'>
              <img
                src="/shoe.png"
                alt="Shoes" />
            </figure>

            <figure className='w-11/12 h-96 rounded-3xl overflow-hidden'>
              <img
                src="/skirt.png"
                alt="Skirt" />
            </figure>

            <figure className='w-11/12 h-96 rounded-3xl overflow-hidden'>
              <img
                src="/pant.png"
                alt="Pant" />
            </figure>
          </MultiCarousel>
        </div>
      </div>
    </div>
  </>
  );
}