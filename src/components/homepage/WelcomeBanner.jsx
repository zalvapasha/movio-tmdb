import React, { useEffect, useState } from 'react'
import { getMoviesPopular } from '../../api/Api'

const imgURL = 'https://image.tmdb.org/t/p/original'

const WelcomeBanner = () => {
  const [backdropPath, setBackdropPath] = useState('')

  useEffect(() => {
    const fetchBackdrop = async () => {
      const movies = await getMoviesPopular()
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length)
        setBackdropPath(movies[randomIndex].backdrop_path)
      }
    }

    fetchBackdrop()
  }, [])

  return (
    <div className='relative'>
      <div
        className='w-full h-96 p-2 relative'
        style={{
          backgroundImage: `url(${imgURL}${backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='max-w-[1240px] mx-auto px-4 py-12 relative z-10'>
          <h1 className='text-5xl font-bold text-white'>Welcome to Movio</h1>
          <p className='py-4 text-white'>
            The ultimate destination for movie enthusiasts. Discover your next
            favorite movies, and TV shows.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
