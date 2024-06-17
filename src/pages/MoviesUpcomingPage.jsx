import React from "react";
import MoviesUpcoming from "../components/MoviesUpcoming";

const MoviesUpcomingPage = () => {
    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="py-5 mx-auto lg:w-[800px]">
                <MoviesUpcoming/>
            </div>
        </div>
    )
}

export default MoviesUpcomingPage;