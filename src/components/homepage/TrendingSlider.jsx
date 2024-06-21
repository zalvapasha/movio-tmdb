import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { getTrendingMovies, getTrendingTVShows } from '../../api/Api'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const TrendingSlider = () => {
  const initialFilters = [
    {
      id: 1,
      name: 'Movies',
      active: true,
      fetchFunc: getTrendingMovies,
      mediaType: 'movie',
    },
    {
      id: 2,
      name: 'TV Shows',
      active: false,
      fetchFunc: getTrendingTVShows,
      mediaType: 'tv',
    },
  ]

  const [filters, setFilters] = useState(initialFilters)
  const [movies, setMovies] = useState([])

  const imgURL = 'https://image.tmdb.org/t/p/w500'
  const navigate = useNavigate()

  const handleFilterClick = (id) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === id
        ? { ...filter, active: true }
        : { ...filter, active: false }
    )
    setFilters(updatedFilters)
  }

  const handleClick = (id, mediaType) => {
    navigate(`/details/${mediaType}/${id}`)
  }

  useEffect(() => {
    const activeFilter = filters.find((filter) => filter.active)
    if (activeFilter && activeFilter.fetchFunc) {
      activeFilter
        .fetchFunc()
        .then((data) => {
          setMovies(data)
        })
        .catch((error) => console.error('Error fetching data:', error))
    }
  }, [filters])

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    variableWidth: true,
    arrows: false,
  }

  return (
    <div className='flex justify-center bg-primary-2'>
      <div className='w-11/12 my-5'>
        <div className='flex items-center ml-5 mb-2'>
          <h2 className='pr-4 text-white text-xl'>Trending This Week</h2>
          <nav className='border-[2px] rounded-full border-primary'>
            <ul className='flex text-sm'>
              {filters.map((filter) => (
                <li
                  key={filter.id}
                  className={`px-2 py-[2px] ${filter.active ? 'bg-primary text-tertiary rounded-full' : 'text-white/70'}`}
                  onClick={() => handleFilterClick(filter.id)}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className=''>
          {movies.length > 0 ? (
            <Slider {...settings}>
              {movies.map((movie, id) => (
                <div
                  key={id}
                  className='w-36'
                  onClick={() =>
                    handleClick(
                      movie.id,
                      filters.find((f) => f.active).mediaType
                    )
                  }
                >
                  <article className='w-36 p-2 rounded-xl transform transition-all duration-300 hover:scale-105 cursor-pointer'>
                    <img
                      src={imgURL + movie.poster_path}
                      alt={movie.title || movie.name}
                      className='h-48 object-cover rounded-xl'
                    />
                    <div className='p-1'>
                      <h3 className='font-bold text-sm text-white truncate'>
                        {movie.title || movie.name}
                      </h3>
                      <p className='text-xs text-slate-300'>
                        {movie.release_date || movie.first_air_date}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          ) : (
            <p className='text-white'>No movies available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrendingSlider
