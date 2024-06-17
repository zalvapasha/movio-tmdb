import React, { useEffect, useState } from "react";
import { getMoviesPopular } from "../api/Api";

const MovieCard = () => {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        getMoviesPopular().then((result)=>{setMovies(result)})
    },[])

    const MoviesCardList = () => {
        return movies.map((movie)=>{
            return(
                    <article className="w-[144px] sm:w-[196px] md:w-[170px] lg:w-[144px] p-2 bg-primary-2 rounded-xl transform transition-all hover:bg-primary-3 duration-300 hover:scale-105 cursor-pointer">
                        <img src={movie.image_url} className="h-5/6 object-cover rounded-xl"/>
                        <div className="p-1">
                            <h3 className="font-bold text-white text-sm truncate">{movie.title}</h3>
                            <p className="text-xs text-slate-300">{movie.year}</p>
                        </div>
                    </article>  
            );
        })
        
    }

    return(
        <div className="flex flex-wrap gap-x-3 gap-y-5 justify-center">
            <MoviesCardList/>
        </div>
    );
}

export default MovieCard;