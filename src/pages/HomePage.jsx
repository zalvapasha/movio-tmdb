import React from "react";
import SliderAllTrending from "../components/slider/SliderAllTrending";
import { MdOutlineLocalMovies } from "react-icons/md";
import { MdOutlineGames } from "react-icons/md";


const HomePage = () => {
    return(
        <div className="bg-primary w-full min-h-screen z-30">
            <div className="mx-auto md:w-[750px] lg:w-[800px]">
                <div><SliderAllTrending/></div>
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