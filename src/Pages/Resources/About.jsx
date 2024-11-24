
import React from "react";

// react icons
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {

    return (
        <div className="w-full h-full bg-center rounded-2xl" style={{
            backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20220312/pngtree-personal-development-career-image_1061886.jpg')",
            backgroundSize: "cover"
        }}>

            {/* header */}
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
                <div className="p-8 pb-[100px] w-full lg:w-[50%]">
                    <h1 className="text-[40px]  text-gray-50 lg:text-[60px] leading-[45px] lg:leading-[65px] font-[500]">
                        Have The Career You Always Wanted
                    </h1>
                    <p className="text-[16px] mt-2 ">
                        We provide the best resources for you to get the job of your dreams.We provide the best resources for you to get the job of your dreams.
                    </p>

                    <div className="flex items-center flex-wrap gap-[20px] mt-6">
                        <Link to='/aboutUs'>
                            <button
                                className="py-2 px-6 min-w-fit bg-[#646dbc] text-white rounded-full hover:bg-transparent hover:border-[#64BCAE] hover:text-[#64BCAE] transition-all duration-200 border">Learn more
                            </button>
                        </Link>

                        <Link to='/bootCamps'>
                            <button

                                className="bg-blue-400 min-w-fit rounded-full py-1.5 px-2 flex items-center gap-[10px] ">
                                <FaPlay className="text-white bg-[#1a103d] rounded-full py-2 text-[2rem]" />
                                See Courses
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeroSection;
