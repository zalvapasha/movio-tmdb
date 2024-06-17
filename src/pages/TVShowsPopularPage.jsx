import React from "react";
import TVShowsPopular from "../components/TVShowsPopular";

const TVShowsPopularPage = () => {

    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="py-5 mx-auto lg:w-[800px] ">
                <TVShowsPopular/>
            </div>
        </div>
    );
}

export default TVShowsPopularPage;