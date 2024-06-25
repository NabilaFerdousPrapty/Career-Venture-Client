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
            className="rounded-md h-screen border-2 border-amber-400"
            style={{
              backgroundImage: `url('https://i.ibb.co/QX06fch/laptop-coffee-cup-wooden-table-front-window-with-city-view.jpg'),
      linear-gradient(to right, rgba(20, 0, 0, 0.5), rgba(0, 0, 0, 0))`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent p-6 rounded-2xl border-2 border-amber-700 text-gray-900  ">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Discover Your Dream Career
              </h1>
              <p className="lg:text-xl text-sm text-slate-900 font-semibold">
                Explore thousands of job opportunities tailored to your skills
                and interests.
              </p>
              <Link
                to="/bootCamps"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="rounded-md h-screen border-2 border-amber-400"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/XWb9Bdn/high-angle-desktop-with-laptop-copy-space.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent p-6 rounded-2xl border-2 border-amber-300">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Upskill for the Future
              </h1>
              <p className="lg:text-xl text-sm">
                Enroll in top-rated courses and training programs to enhance
                your skills.
              </p>
              <Link
                to="/bootCamps"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="rounded-md h-screen border-2 border-amber-400"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/fnGp5Vx/personal-accessories-coffee-cup-earphone-eyeglasses-keyboard-black-background.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent p-6 rounded-2xl border-2 border-amber-400">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Connect with Experts
              </h1>
              <p className="lg:text-xl text-sm">
                Get guidance from industry professionals to accelerate your
                career growth.
              </p>
              <Link
                to="/bootCamps"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                Find Mentors
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="rounded-md h-screen border-2 border-amber-400"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/Wyws7nX/flat-lay-desktop-with-agenda-magnifying-glass.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent p-6 rounded-2xl border-2 border-amber-400">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Personalized Career Paths
              </h1>
              <p className="lg:text-xl text-sm">
                Discover career paths and job opportunities that match your
                unique talents.
              </p>
              <Link
                to="/bootCamps"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="rounded-md h-screen border-2 border-amber-400"
            style={{
              position: "relative",
              backgroundImage: `url('https://i.ibb.co/k6FfPsF/laptop-eyeglasses-mouse-diary-pen-pot-plant-black-background.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent p-6 rounded-2xl border-2 border-amber-400">
              <h1 className="lg:text-4xl text-2xl font-bold lg:my-5">
                Land Your Dream Job
              </h1>
              <p className="lg:text-xl text-sm">
                Apply for jobs at top companies and take the next step in your
                career.
              </p>
              <Link
                to="/bootCamps"
                className="bg-white text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
