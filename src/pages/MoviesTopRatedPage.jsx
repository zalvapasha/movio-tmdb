import React from "react";
import MoviesTopRated from "../components/MoviesTopRated";

const MoviesTopRatedPage = () => {
    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="py-5 mx-auto lg:w-[800px]">
                <MoviesTopRated/>
            </div>
        </div>
    )
}

export default MoviesTopRatedPage;