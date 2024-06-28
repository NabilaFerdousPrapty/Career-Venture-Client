
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from '@smastrom/react-rating'
import "@smastrom/react-rating/style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination,Navigation,Autoplay } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon/UseAxiosCommon";

const Testimonial = () => {
 const axiosCommon = UseAxiosCommon();
  const { data: reviewers = [],isLoading } = useQuery({
    queryKey: ["reviewers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/testimonials");
      return data;
    },
  });
  if(isLoading){
    return<div className="flex items-center justify-center h-screen">
      <div className="w-24 h-20 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  }
  
  // console.log(testimonials);
  return (
    <div>
      <Swiper
      
        effect={"coverflow"}
        
        centeredSlides={true}
        navigation={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
       
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        
        modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}
        className="mySwiper"
      >
        {reviewers.map((reviewer) => (
          <SwiperSlide key={reviewer._id} className="border-2 border-gray-200 my-4 rounded-lg bg-slate-200">
          
            <div className="flex flex-col items-center justify-center p-4 bg-transparent rounded-lg shadow-lg ">
              <img
                className="object-cover w-20 h-20 mx-auto rounded-full"
                src={reviewer.image}
                alt={reviewer.name}
              />
              <h2 className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-100">
                {reviewer.name}
              </h2>
              <Rating
                  style={{ maxWidth: 120 }}
                  value={reviewer.rating}
                  readOnly
                />
            
              <p className="text-sm text-center text-gray-600 dark:text-gray-300 my-6">
                {reviewer.review}
              </p>
            </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
