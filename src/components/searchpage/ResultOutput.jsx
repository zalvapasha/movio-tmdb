import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchMultiData } from '../../api/Api'

const ResultOutput = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const category = searchParams.get('category') || 'all'
  const [data, setData] = useState({ movies: [], tvShows: [], people: [] })
  const [notfound, setNotFound] = useState(false)

  const imgURL = 'https://image.tmdb.org/t/p/w92'
  const placeholderPerson = '../src/assets/placeholder-person.jpg'
  const placeholderPoster = '../src/assets/placeholder-poster.jpg'

  useEffect(() => {
    if (q) {
      setData({ movies: [], tvShows: [], people: [] })
      searchMultiData(q).then((result) => {
        if (result?.results?.length > 0) {
          let movies = []
          let tvShows = []
          let people = []

          if (category === 'all' || category === 'movie') {
            movies = result.results.filter(
              (item) => item.media_type === 'movie'
            )
          }
          if (category === 'all' || category === 'tv') {
            tvShows = result.results.filter((item) => item.media_type === 'tv')
          }
          if (category === 'all' || category === 'person') {
            people = result.results.filter(
              (item) => item.media_type === 'person'
            )
          }

          setData({ movies, tvShows, people })
          setNotFound(false)
        } else {
          setNotFound(true)
        }
      })
    }
  }, [q, category])

  if (notfound) {
    return (
      <div>
        <h1 className='text-white'>Not Found</h1>
      </div>
    )
  }

  return (
    <div className='mx-2'>
      {data.movies.length > 0 && (
        <div className='mb-7'>
          <div className='border-l-4 border-tertiary flex items-center h-8 pl-2 mb-2 ml-2'>
            <h2 className='text-xl text-white font-bold'>Movies</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {data.movies.map((movie) => (
              <Link
                to={`/details/movie/${movie.id}`}
                key={movie.id}
                className='flex bg-primary-2 p-2 rounded'
              >
                <div className='w-12 mr-2 overflow-hidden'>
                  <img
                    src={imgURL + movie.poster_path}
                    onError={(e) => (e.target.src = placeholderPoster)}
                    alt={movie.title}
                    className='fit object-cover rounded'
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <h3 className='text-lg text-white line-clamp-1'>
                    {movie.title}
                  </h3>
                  <p className='text-sm text-gray-400'>{movie.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {data.tvShows.length > 0 && (
        <div className='mb-7'>
          <div className='border-l-4 border-tertiary flex items-center h-8 pl-2 mb-2 ml-2'>
            <h2 className='text-xl text-white font-bold'>TV Shows</h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {data.tvShows.map((tv) => (
              <Link
                to={`/details/tv/${tv.id}`}
                key={tv.id}
                className='flex bg-primary-2 p-2 rounded'
              >
                <div className='w-12 mr-4 overflow-hidden'>
                  <img
                    src={imgURL + tv.poster_path}
                    onError={(e) => (e.target.src = placeholderPoster)}
                    alt={tv.title}
                    className='object-cover rounded'
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <h3 className='text-lg text-white line-clamp-1'>{tv.name}</h3>
                  <p className='text-sm text-gray-400'>{tv.first_air_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {data.people.length > 0 && (
        <div>
          <div className='border-l-4 border-tertiary flex items-center h-8 pl-2 mb-2 ml-2'>
            <h2 className='text-xl text-white font-bold'>Peoples</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {data.people.map((person) => (
              <div key={person.id} className='flex bg-primary-2 p-2 rounded'>
                <div className='h-14 w-14 overflow-hidden rounded mr-2'>
                  <img
                    src={imgURL + person.profile_path}
                    onError={(e) => (e.target.src = placeholderPerson)}
                    alt={person.name}
                    className='object-cover rounded'
                  />
                </div>
                <div>
                  <h3 className='text-lg text-white line-clamp-1'>
                    {person.name}
                  </h3>
                  <p className='text-sm text-gray-400'>
                    {person.known_for_department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultOutput
