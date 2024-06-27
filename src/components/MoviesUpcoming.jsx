import React, { useEffect, useState } from 'react'
import { getMoviesUpcoming } from '../api/Api'
import { Link } from 'react-router-dom'

const MoviesUpcoming = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMoviesUpcoming().then((result) => {
      setMovies(result)
    })
  }, [])

  const imgURL = 'https://image.tmdb.org/t/p/original'

  const CardComponent = () => {
    return movies.map((movie, i) => {
      return (
        <Link
          to={`/details/movie/${movie.id}`}
          key={i}
          className='w-[144px] sm:w-[196px] md:w-[170px] lg:w-[144px] p-2 bg-primary-2 rounded-xl transform transition-all hover:bg-primary-3 duration-300 hover:scale-105 cursor-pointer'
        >
          <img
            src={imgURL + movie.poster_path}
            className='object-cover rounded-xl'
          />
          <div className='p-1'>
            <h3 className='font-bold text-white text-sm truncate'>
              {movie.original_title}
            </h3>
            <p className='text-xs text-slate-300'>{movie.release_date}</p>
          </div>
        </Link>
      )
    })
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-5 justify-center'>
      <CardComponent />
    </div>
  )
}

export default MoviesUpcoming
