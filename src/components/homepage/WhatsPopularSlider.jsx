import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import {
  getStreamingMovies,
  getForRentMovies,
  getInTheatersMovies,
} from '../../api/Api'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const WhatsPopularSlider = () => {
  const initialFilters = [
    {
      id: 1,
      name: 'Streaming',
      active: true,
      fetchFunc: getStreamingMovies,
    },
    {
      id: 2,
      name: 'For Rent',
      active: false,
      fetchFunc: getForRentMovies,
    },
    {
      id: 3,
      name: 'In Theaters',
      active: false,
      fetchFunc: getInTheatersMovies,
    },
  ]

  const [filters, setFilters] = useState(initialFilters)
  const [movies, setMovies] = useState([])

  const imgURL = 'https://image.tmdb.org/t/p/w500'

  const handleFilterClick = (id) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === id
        ? { ...filter, active: true }
        : { ...filter, active: false }
    )
    setFilters(updatedFilters)
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
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true,
    arrows: false,
  }

  return (
    <div>
      <div className='flex text-white items-center'>
        <h2 className='pr-4'>What's Popular</h2>
        <nav className='border-[1px] rounded-full'>
          <ul className='flex text-sm'>
            {filters.map((filter) => (
              <li
                key={filter.id}
                className={`px-2 py-[2px] ${filter.active ? 'bg-white text-black rounded-full' : ''}`}
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
            {movies.map((movie, i) => (
              <div key={i} className='w-36'>
                <article className='w-36 p-2 rounded-xl transform transition-all duration-300 hover:scale-105 cursor-pointer'>
                  <img
                    src={imgURL + movie.poster_path}
                    alt={movie.original_title}
                    className='h-48 object-cover rounded-xl'
                  />
                  <div className='p-1'>
                    <h3 className='font-bold text-sm text-white truncate'>
                      {movie.original_title}
                    </h3>
                    <p className='text-xs text-slate-300'>
                      {movie.release_date}
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
  )
}

export default WhatsPopularSlider
