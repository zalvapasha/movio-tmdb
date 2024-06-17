import React from "react";
import MoviesNowPlaying from "../components/MoviesNowPlaying";


const GameListPage = () => {
    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="pt-10"><MoviesNowPlaying/></div>          
        </div>
    );
}

export default GameListPage;