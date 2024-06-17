import './slider.css'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { moviesTrending } from '../../api/TMDB';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "10px", zIndex: 1}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "10px", zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

const SliderAllTrending = () => {
    const [isAllTrendingMovies, setIsAllTrendingMovies] = useState(null);

    useEffect(() => {
        moviesTrending().then((result) => {
            if (Array.isArray(result.results)) {
                setIsAllTrendingMovies(result.results);
            } else {
                console.error("API returned unexpected data format:", result);
            }
        }).catch((error) => {
            console.error("Error fetching trending movies:", error);
        });
    }, []);
    
    
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="slider-container ">
            {isAllTrendingMovies !== null && (
                <Slider {...settings}>
                    {isAllTrendingMovies.map((movie) => (
                        <div key={movie.id} className='relative h-96'>
                            <img src={IMAGE_BASE_URL + 
                                movie.backdrop_path} 
                                alt={movie.title} 
                                className='w-full h-full object-cover'/>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default SliderAllTrending;
