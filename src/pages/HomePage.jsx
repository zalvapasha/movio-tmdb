import React from "react";
import { MdOutlineLocalMovies } from "react-icons/md";
import { MdOutlineGames } from "react-icons/md";
import WhatsPopularSlider from "../components/homepage/WhatsPopularSlider";
import TrendingSlider from "../components/homepage/TrendingSlider";


const HomePage = () => {
    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="mx-auto md:w-[750px] lg:w-[800px]">
                <TrendingSlider/>
                <WhatsPopularSlider/>
                <div className="pb-5">
                    <div className="flex items-center text-2xl font-bold text-white pl-6 my-7">
                        <MdOutlineLocalMovies />
                        <h2 className="pl-2">
                            Movies</h2>
                    </div>
                </div>
                <div className="bg-primary-1"></div>
                <div className="pb-5">
                    <div className="flex items-center text-2xl font-bold text-white pl-6 my-7">
                        <MdOutlineGames />
                        <h2 className="pl-2">
                            Games</h2>
                    </div>
                </div>
                <div className="bg-primary-1 flex flex-wrap gap-x-3 gap-y-5 justify-center"></div>
            </div>
        </div>
    );
}

export default HomePage;