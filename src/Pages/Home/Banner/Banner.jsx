import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 5000,
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent  lg:p-6 p-2 rounded-2xl border-2 border-amber-700 text-gray-900  ">
              <h1 className="lg:text-4xl md:text-2xl text-lg font-bold lg:my-5 text-black">
                {t('discoverCareer')}
              </h1>
              <p className="lg:text-xl text-sm text-slate-900 font-semibold">
                {t('exploreOpportunities')}
              </p>
              <Link
                to="/bootCamps"
                className="bg-white text-sm md:text-base text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                {t('getStarted')}
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent lg:p-6 p-2 rounded-2xl border-2 border-amber-300">
              <h1 className="lg:text-4xl text-white md:text-2xl text-lg font-bold lg:my-5">
                {t('upskillFuture')}
              </h1>
              <p className="lg:text-xl text-sm text-white">
                {t('enrollCourses')}
              </p>
              <Link
                to="/resources"
                className="bg-white text-sm md:text-base text-black px-3 py-1 md:px-4 md:py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                {t('learnMore')}
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent  lg:p-6 p-2 rounded-2xl border-2 border-amber-400">
              <h1 className="lg:text-4xl text-white md:text-2xl text-lg font-bold lg:my-5">
                {t('connectExperts')}
              </h1>
              <p className="lg:text-xl text-sm text-white">
                {t('guidanceProfessionals')}
              </p>
              <Link
                to="/mentors"
                className="bg-white text-sm md:text-base text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                {t('findMentors')}
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent  lg:p-6 p-2 rounded-2xl border-2 border-amber-400">
              <h1 className="lg:text-4xl md:text-2xl text-lg font-bold lg:my-5 text-white">
                {t('personalizedPaths')}
              </h1>
              <p className="lg:text-xl text-sm text-white">
                {t('discoverPaths')}
              </p>
              <Link

                to="/openings"
                className="bg-white text-sm md:text-base text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                {t('exploreNow')}
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-transparent  lg:p-6 p-2 rounded-2xl border-2 border-amber-400">
              <h1 className="lg:text-4xl md:text-2xl text-lg font-bold lg:my-5 text-white">
                {t('landDreamJob')}
              </h1>
              <p className="lg:text-xl text-sm text-white">
                {t('applyTopCompanies')}
              </p>
              <Link
                to="/openings"
                className="bg-white text-sm md:text-base text-black px-4 py-2 rounded-md mt-4 lg:mt-8 inline-block"
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
