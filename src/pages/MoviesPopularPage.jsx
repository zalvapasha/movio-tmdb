import React from "react";
import MoviesPopular from "../components/MoviesPopular";


const MoviesPopularPage = () => {

    return(
        <div className="bg-primary-1 w-full min-h-screen z-30">
            <div className="py-5 mx-auto lg:w-[800px] "><MoviesPopular/></div>
        </div>
    );
}

export default MoviesPopularPage;