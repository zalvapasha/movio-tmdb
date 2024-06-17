import React from "react";
import BannerDetailMovie from "../components/BannerDetailMovie";
import { useParams } from "react-router-dom";

const DetailMoviePage = () => {
    const { id } = useParams();

    return(
        <div>
            <BannerDetailMovie id={id} />
        </div>
    )
}

export default DetailMoviePage