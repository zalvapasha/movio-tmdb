import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMultiData } from '../../api/Api'

const ResultOutput = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const category = searchParams.get('category') || 'all'
  const [data, setData] = useState({ movies: [], tvShows: [], people: [] })
  const [notfound, setNotFound] = useState(false)

  const imgURL = 'https://image.tmdb.org/t/p/w92'

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
    <div>
      <h1 className='text-white'>Result</h1>
      <div className='bg-red-500 rounded-md p-4'>
        {data.movies.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>Movies</h2>
            <div className='grid grid-cols-2 gap-4'>
              {data.movies.map((movie) => (
                <div key={movie.id} className='flex bg-gray-800 p-2 rounded'>
                  <img
                    src={imgURL + movie.poster_path}
                    className=' h-14 mr-2 object-cover rounded'
                  />
                  <div>
                    <h3 className='text-lg text-white truncate'>
                      {movie.title}
                    </h3>
                    <p className='text-sm text-gray-400'>
                      {movie.release_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.tvShows.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>TV Shows</h2>
            <div className='grid grid-cols-2 gap-4'>
              {data.tvShows.map((tv) => (
                <div key={tv.id} className='bg-gray-800 p-2 rounded'>
                  <h3 className='text-lg text-white truncate'>{tv.name}</h3>
                  <p className='text-sm text-gray-400'>{tv.first_air_date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.people.length > 0 && (
          <div>
            <h2 className='text-xl font-bold'>People</h2>
            <div className='grid grid-cols-3 gap-4'>
              {data.people.map((person) => (
                <div key={person.id} className='bg-gray-800 p-2 rounded'>
                  <h3 className='text-lg text-white'>{person.name}</h3>
                  <p className='text-sm text-gray-400'>
                    {person.known_for_department}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultOutput
