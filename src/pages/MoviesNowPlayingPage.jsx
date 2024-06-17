import React from "react";
import MoviesNowPlaying from "../components/MoviesNowPlaying";

const MoviesNowPlayingPage = () => {

    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="py-5 mx-auto lg:w-[800px] ">
                <MoviesNowPlaying/></div>
        </div>
    );
}

export default MoviesNowPlayingPage;