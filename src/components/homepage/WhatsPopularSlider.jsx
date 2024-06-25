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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  }

  return (
    <div className='flex justify-center bg-primary-2'>
      <div className='w-11/12 my-5'>
        <div className='flex flex-col xs:flex-row  gap-2 ml-5 mb-2'>
          <h2 className='pr-2 text-white text-base'>What's Popular</h2>
          <nav className='border-[2px] rounded-full border-primary w-fit'>
            <ul className='flex'>
              {filters.map((filter) => (
                <li
                  key={filter.id}
                  className={`px-2 py-[2px] text-sm ${filter.active ? 'bg-primary text-tertiary rounded-full' : 'text-white/70'}`}
                  onClick={() => handleFilterClick(filter.id)}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className='card h-64'>
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
    </div>
  )
}

export default WhatsPopularSlider
