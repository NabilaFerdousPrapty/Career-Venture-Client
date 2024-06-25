import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper my-2 rounded-md w-full"
      >
        <SwiperSlide>
          <div
            className="rounded-md h-screen"
            style={{
              backgroundImage: `url('https://i.ibb.co/QX06fch/laptop-coffee-cup-wooden-table-front-window-with-city-view.jpg'),
              linear-gradient(to right, rgba(20, 0, 0, 0.5), rgba(0, 0, 0, 0))`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-purple-100 p-6 rounded-2xl">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
               
              </h1>
              <p className="lg:text-xl text-sm">
                Get your fitness on with our classes
              </p>

              <Link
                to="/allClasses"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                All Classes
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="rounded-md h-screen "
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/XWb9Bdn/high-angle-desktop-with-laptop-copy-space.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-800 rounded-full p-10 bg-cyan-100 rounded-2xl">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Start your fitness journey
              </h1>
              <p className="lg:text-xl text-sm">
                Get your fitness on with our classes
              </p>

              <Link
                to="/allClasses"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                All classes
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="rounded-md h-screen"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/fnGp5Vx/personal-accessories-coffee-cup-earphone-eyeglasses-keyboard-black-background.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-amber-200 rounded-full p-10 ">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                We are here to help you
              </h1>
              <p className="lg:text-xl text-sm">
                Get your fitness on with our classes
              </p>

              <Link
                to="/allClasses"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                All classes
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="rounded-md h-screen"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/Wyws7nX/flat-lay-desktop-with-agenda-magnifying-glass.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-sky-200 p-10 rounded-full">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Welcome to Track Tonic
              </h1>
              <p className="lg:text-xl text-sm">
                Get your fitness on with our classes
              </p>

              <Link
                to="/allClasses"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                All classes
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="rounded-md h-screen"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/k6FfPsF/laptop-eyeglasses-mouse-diary-pen-pot-plant-black-background.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-sky-200 p-10 rounded-full">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Welcome to Track Tonic
              </h1>
              <p className="lg:text-xl text-sm">
                Get your fitness on with our classes
              </p>

              <Link
                to="/allClasses"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                All classes
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
