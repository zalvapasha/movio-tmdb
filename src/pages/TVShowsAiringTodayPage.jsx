import React from "react";
import TVShowsAiringToday from "../components/TVShowsAiringToday";

const TVShowsAiringTodayPage = () => {

    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="py-5 mx-auto lg:w-[800px] "><TVShowsAiringToday/></div>
        </div>
    );
}

export default TVShowsAiringTodayPage;