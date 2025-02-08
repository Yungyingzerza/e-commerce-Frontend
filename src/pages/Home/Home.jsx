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
          <ImageWithBlur url="https://s3-alpha-sig.figma.com/img/5c47/485f/a3e0801bd2d4085600e030882ebac4e6?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PT~zU7t4uoV~dKyvwHQpx8sdXJtBE2m1-N4lnBfumAoqN~LJQx~E72NnydS9iGzGX1PJ-6PXF2--uHDUjGI67Rx63XNUfT4pzQXuo5ezFY~pijceOLC1ax2yPV6wryv9qub6Xk0XEBx4Gm8xjgP2AD1OpYWpFeuAn3IwnvTe0emHS~zED2~W64Au-45~L~XENdMhaxtrd9k9efUc8NbgJMsSGOkiPeka7CyGcSCn0J8wQOULhtHj1LfZivugL-n7OBA1aFX2v9kJIE43OJPcbAiPfjp5YzhLa8dt94gqpFzugJOmpOir0-fTEpP1jU~OuLGcpx8SlnDbDBQvWDizbQ__" />
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
                src="https://s3-alpha-sig.figma.com/img/4bad/d08d/ae7c129409a9e36e2844df3d99eb4331?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hGwBLpmWpb74Z7lrl4oMB4HjaWAF8mgLgnsOO6I~eimFAUGEXTz7~yitlNCjhMtLOqNJebKiEgox8CxvCWMsiFP4hj0iwrdbvc8mnk-5eXK5b~2mFlA40WWOGx2ZIlKsf~ZjJH2OQ~HUVwz06WDMq0mvV0Ct~TKHJwf0EBeNsC6Q6pbueHLyWafnHsl3xyq9dXVqv6V0Dr0CHA6lfFt98xxPY1X2I2DFsd-ervK5eCgykVZ8l5y3Ir~IxaXjWnlVYkD8TgJkrvaZe6i2MhHl1GFrCqDgaDV2a59RhoHb2p5YVhQ6k60vVF3yZrmya1fVrikkDaPR4v76DN~88wEjYw__"
                alt="Shoes" />
            </figure>

            <figure className='w-11/12 rounded-3xl overflow-hidden'>
              <img
                src="https://s3-alpha-sig.figma.com/img/6f04/487a/8d8f1bd95f59d5607f9fa7a0d94c4040?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LPkfC-lXTI2ZlZGcQSZEPtp0Itk53xpWxlGkOflUnDMGlroCZ49cgrhSDKWJxdXpCEKVKT2lqtOvahF8kWSSFM6Y8~~2BPnaydytE8Qoh~OskYsmM8WfHF92~HKbCW0ZtWp6qsUbtv1x8HEMxEtMTzalyawzaYdEqwc4pSGSOI~TrexLmi3T122yJNypl0yNNJ7nnvFPIhLUV0aJTJNoI96VXA~rqlMyb~mbu2beJb~Q7hrmgibMQ5vbR9KzAidI4E9AYvBcxhJ4u33DnUH4s50zDbcqh~MoCU-G6-s345giqtujTihRccs7T3pgmcdbl3Pacwwk7aMDlse09lC~Lw__"
                alt="Shoes" />
            </figure>

            <figure className='w-11/12 rounded-3xl overflow-hidden'>
              <img
                src="https://s3-alpha-sig.figma.com/img/caad/45a0/e0a3183603b3bd99adfd470d6adbf1b9?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Dz7ttI8FgelQHKZRcpTZW1VDY6Z5-eY1zGOX00WRfr8c1DlbdkUm6ffxVo3NLQWLvIXiViXC~Zhr3CxnWHonSP~0u7ChsXib2UEF5xPzEdpvbk79J9o9xlREV3xEhM0WLpG2Mtd~VM5BmfzG70U~OZDI2UjlmwJ9B-71M5CF22~CReFLrNUDo-klDUGLbeBTAzpp5KyyONnRhjlAnY7ig~ZY-KVA0Nunk7qLGst7KeaNul1bNs7LJfWnCA4SvZgiAsheWsMSVGnM3hBsFcKA~qF1mJ1wsg02ifYzRlZ1LMZbbzpQSNdRz6nFctEU0LWX7535Wx6ASUZk685p2G6yNw__"
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
            src="https://s3-alpha-sig.figma.com/img/45a5/f687/820e2b071837cc8ee91c96f6b2d3a1a6?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=B1PhITxL~k0Mv04Nuassw94VUQPggK9IwDLomrPONNR2-Bz1Z4nijHsxHRSzbVcHdbgnjQXRiE9sgoQxKr3RCQPpZTpoDW-5ZqlNx7wa60kTz6LN9EzEEXt~daD1EcfxYapIwmrb~XdDSPe9YVd3RjuCiW3IomGR-dcIqSgfeC3YKatdjk2~BQQmkRtrqaAhjDhxaFFRYtQYcCU4xvN0IHB48Z94FfbWfp0JMtXlgVJosJloHLzS1R4E44vRp4i2daUBD0~SPxQUP8CyZ6O34gGnSErbWk1Q7GjTp1rLP1CxJJPnXiYNefqYjuqHcTf~v66PjNTEq21ZFDPEuCfdsw__"
            alt="Shoes" />
          <img
            className='w-1/2 h-96 object-cover'
            src="https://s3-alpha-sig.figma.com/img/d459/a28c/7519f12e3f52ba330f561b0e0ba04cb5?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cVsUbIKPPKFiRG~kBHgt7o24DXfuGC9Uj5eZS9V~01TBuYDYF3Bfzy6aA-kX0ArtWs-05jDesQsyl9DZy-~ftUowcCXcR7GGVYXIwxVGaUFNPmfpKTiwuP9xbrtYoHpBv2UueTAdls~9AS10-n8ApKhwVdspRhP3kolCyggASNbCqMAgzbK7p0wG75QN0RJhDD2NQcWBp-Jsc0Z2-NAKjqzpdJ--pi-V4sxXwQLsB4Cp5skE2BJ5-9ctbz8KvLUJNac9Y9zkypNO8EnGvoRsw00awOWncGyubbxlkS-VAU25AWPvWLf4Oiv17OlVEoadugL~XiSnxzjosGdyUkGH0w__"
            alt="Shoes" />
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
                src="https://s3-alpha-sig.figma.com/img/64e7/cafe/c2de7450385c1a4c3c25e29b9dcbc802?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MVfOWqFsi2tUYYMewBV6g01~tzojHYNiuRMlKEKqyNyyMnT2pKzJyK5lKW7Pqe7Mjk~KJj4caAudR7QH4rE2Cljuc6HcXEJ4TlMhjmowOQarkITqtp6gDuKu-bfW94Sg00pvEEYvwzz8MU71NKHp8SqfalF8yuM~Mjuz-0uV4q9n31BxXpHHfXCRboK8ZwpoQec18cFi~matB0PZL1TIH6VR9G6qDhB7Tmh1g3dTlDgbmqPsyXM3Mtdfo4SyCFic-wTtD8GkIuHjINBH6vfCggN93O5IE5FV~fCqSAmYmY8N9pSl8xRYQNj2nQZE3cZSJrSorQJUrv-Uucq7ZQQ9jw__"
                alt="Shoes" />
            </figure>

            <figure className='w-11/12 h-96 rounded-3xl overflow-hidden'>
              <img
                src="https://s3-alpha-sig.figma.com/img/4e76/3401/d205066c232e9dec5bff72cfd854e282?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aKpYfqTgawLucn2ZdJENMX-4V5K1rnJmUEFtFb~lvhyXioBhbZIHZ0klt0T2LTQaPhXQ95s7DyPRG0RFyIZybw0vTekmxYasNn~cer09jZ50~zbEH1P02SjpyufP1Y3IoYImdb2jd3tLNc7zaCPWAbO3EK5LRd~YDlKlITCFR4tpm7WVhisqvfUmj639eeQ5nkP4x7Yxsh8hZ-coOheYpeBCgRghbUqIBV1s73UK3YQHBkvrejAv9xpFb63L43~iWHQme8uw1VE1-HbOWfUKmt7dmOGPwWUwOKWkno~8oksgt5QA3FNra~4Fm6LWQXUx6p3Pwx-Xf8G7kCsDFBg1Hw__"
                alt="Skirt" />
            </figure>

            <figure className='w-11/12 h-96 rounded-3xl overflow-hidden'>
              <img
                src="https://s3-alpha-sig.figma.com/img/6e30/88ea/ec27892bc5c7652316e993b993ee5ebc?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=g07VKfUy9zg9XhYk1yZoRG4PkS0oL4MJhmO~6APOP5HTpBbIZvnyCZB~sl5ihBHJzcH~9mDAZgvfW9b8eggeHQS58Ph~RzHB8BAQjhpVDUzPCALbYdhEXXna6~s~tVjbgukUmpH~G5X1tLUrs1XoN6SJ7mFZgoZjSg2obT0lU339-X2Pl7QGmyQ~RRN0FFjtMU-0nQ-xDO3e44EpQqZxBTDEce3FNMWNEB34wVJYJtB546qWSYZz7nmDJl3bNdbQjGgsT4iKYD-j-~uiYqwM6QSWv5KAhTZffMOEh~Ix2k7P1sGn4zkpGBRVW4pz3gTsykBV2Q~FANUAJt~3Ws39kQ__"
                alt="Pant" />
            </figure>
          </MultiCarousel>
        </div>
      </div>
    </div>
  </>
  );
}