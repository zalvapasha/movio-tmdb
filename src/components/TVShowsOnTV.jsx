import React, { useEffect, useState } from "react";
import { getTVShowsOnTV } from "../api/Api";

const TVShowsOnTV = () => {

    const [tvshows ,setTvshows] = useState([])

    useEffect(()=>{
        getTVShowsOnTV().then((result)=>{
            setTvshows(result)})
    },[])

    const imgURL = "https://image.tmdb.org/t/p/original"

    const CardComponent = () => {
        return tvshows.map((tvshow, i)=>{
            return(
                <article key={i} className="w-[144px] sm:w-[196px] md:w-[170px] lg:w-[144px] p-2 bg-primary-2 rounded-xl transform transition-all hover:bg-primary-3 duration-300 hover:scale-105 cursor-pointer">
                        <img src={ imgURL + tvshow.poster_path} className="h-5/6 object-cover rounded-xl"/>
                        <div className="p-1">
                            <h3 className="font-bold text-white text-sm truncate">{tvshow.original_name}</h3>
                            <p className="text-xs text-slate-300">{tvshow.first_air_date}</p>
                        </div>
                    </article>
            );
        })
        
    }

    return(
        <div className="flex flex-wrap gap-x-3 gap-y-5 justify-center">
            <CardComponent/>
        </div>
    )
}

export default TVShowsOnTV;