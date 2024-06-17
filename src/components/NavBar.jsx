import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpenMovies, setIsOpenMovies] = useState(false);
  const [isOpenTVShows, setIsOpenTVShows] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  }
  const handleMoviesPopularClick = () => {
    navigate('/movies/popular');
  }
  const handleMoviesNowPlayingClick = () => {
    navigate('/movies/now-playing');
  }

  const handleMoviesUpcomingClick = () => {
    navigate('/movies/upcoming');
  }

  const handleMoviesTopRatedClick = () => {
    navigate('/movies/top-rated');
  }

  const handleTVShowsPopularClick = () => {
    navigate('/tv/popular');
  }

  const handleTVShowsAiringTodayClick = () => {
    navigate('/tv/airing-today');
  }

  const handleTVShowsOnTVClick = () => {
    navigate('/tv/on-tv');
  }

  const handleTVShowsTopRatedClick = () => {
    navigate('/tv/top-rated');
  }


    return (
        <nav className="header sticky top-0 bg-primary shadow-md flex items-center justify-between px-8 py-0 z-40">
          <div className="nav font-semibold text-md">
            <div className="flex items-center">
              <button onClick={handleHomeClick} className="p-4 border-t-2 text-quaternary border-tertiary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active">Home</button>
              <button onClick={()=> setIsOpenMovies((prev) => !prev)} className="p-4 border-t-2 text-quaternary border-tertiary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active"
                >Movies
              </button>
              {isOpenMovies && (
                <div className="bg-primary absolute top-16 flex flex-col p-3 text-sm rounded-md">
                  <ul className="text-quaternary">
                    <li onClick={handleMoviesPopularClick} className="pb-1 hover:text-tertiary duration-200 cursor-pointer">Popular</li>
                    <li onClick={handleMoviesNowPlayingClick} className="pb-1 hover:text-tertiary duration-200 cursor-pointer">Now Playing</li>
                    <li onClick={handleMoviesUpcomingClick} className="pb-1 hover:text-tertiary duration-200 cursor-pointer">Upcoming</li>
                    <li onClick={handleMoviesTopRatedClick} className="hover:text-tertiary duration-200 cursor-pointer">Top Rated</li>
                  </ul>
                </div>
              )}
              <button onClick={()=> setIsOpenTVShows((prev) => !prev)} className="p-4 border-t-2 text-quaternary border-tertiary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active"
                >TV Shows
              </button>
              {isOpenTVShows && (
                <div className="bg-primary absolute top-16 flex flex-col p-3 text-sm rounded-md">
                  <ul className="text-quaternary">
                    <li onClick={handleTVShowsPopularClick} className="pb-1 hover:text-tertiary duration-200 cursor-pointer">Popular</li>
                    <li onClick={handleTVShowsAiringTodayClick} className="pb-1 hover:text-tertiary duration-200 cursor-pointer">Airing Today</li>
                    <li onClick={handleTVShowsOnTVClick} className="pb-1 hover:text-tertiary duration-200 cursor-pointer">On TV</li>
                    <li onClick={handleTVShowsTopRatedClick} className="hover:text-tertiary duration-200 cursor-pointer">Top Rated</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      );
}

export default NavBar;