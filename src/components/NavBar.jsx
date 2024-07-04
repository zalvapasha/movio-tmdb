import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoUnactive from '../assets/logo-unactive.png'
import logoActive from '../assets/logo-active.png'

const NavBar = () => {
  const [isOpenMovies, setIsOpenMovies] = useState(false)
  const [isOpenTVShows, setIsOpenTVShows] = useState(false)
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [category, setCategory] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const searchQuery = useRef()
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
  }
  const handleMoviesPopularClick = () => {
    navigate('/movies/popular')
  }
  const handleMoviesNowPlayingClick = () => {
    navigate('/movies/now-playing')
  }

  const handleMoviesUpcomingClick = () => {
    navigate('/movies/upcoming')
  }

  const handleMoviesTopRatedClick = () => {
    navigate('/movies/top-rated')
  }

  const handleTVShowsPopularClick = () => {
    navigate('/tv/popular')
  }

  const handleTVShowsAiringTodayClick = () => {
    navigate('/tv/airing-today')
  }

  const handleTVShowsOnTVClick = () => {
    navigate('/tv/on-tv')
  }

  const handleTVShowsTopRatedClick = () => {
    navigate('/tv/top-rated')
  }

  const handleSearchOnSubmit = (e) => {
    e.preventDefault()
    const q = searchQuery.current.value
    searchQuery.current.value = ''

    if (q.length > 2) {
      navigate({
        pathname: '/search',
        search: `?q=${q}&category=${category}`,
      })
    } else {
      alert('Please enter at least 3 characters')
    }
  }

  return (
    <nav className='header sticky top-0 bg-primary shadow-md flex items-center justify-between px-6 z-40'>
      <div className='nav font-semibold text-md mt-2'>
        <div className='flex items-center'>
          <img
            src={isLogoHovered ? logoActive : logoUnactive}
            alt='Movio'
            onClick={handleHomeClick}
            className='h-4 xs:h-8 mr-2 cursor-pointer'
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          />
          <div className='hidden sm:flex relative'>
            <button
              onClick={() => setIsOpenMovies((prev) => !prev)}
              className='p-4 border-t-2 text-quaternary border-tertiary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active'
            >
              Movies
            </button>
            {isOpenMovies && (
              <div className='bg-primary absolute top-16 w-28 flex flex-col p-3 text-sm rounded-md'>
                <ul className='text-quaternary'>
                  <li
                    onClick={handleMoviesPopularClick}
                    className='pb-1 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Popular
                  </li>
                  <li
                    onClick={handleMoviesNowPlayingClick}
                    className='pb-1 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Now Playing
                  </li>
                  <li
                    onClick={handleMoviesUpcomingClick}
                    className='pb-1 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Upcoming
                  </li>
                  <li
                    onClick={handleMoviesTopRatedClick}
                    className='hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Top Rated
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className='hidden sm:flex relative'>
            <button
              onClick={() => setIsOpenTVShows((prev) => !prev)}
              className='p-4 border-t-2 text-quaternary border-tertiary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active'
            >
              TV Shows
            </button>
            {isOpenTVShows && (
              <div className='bg-primary absolute top-16 w-28 flex flex-col p-3 text-sm rounded-md'>
                <ul className='text-quaternary'>
                  <li
                    onClick={handleTVShowsPopularClick}
                    className='pb-1 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Popular
                  </li>
                  <li
                    onClick={handleTVShowsAiringTodayClick}
                    className='pb-1 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Airing Today
                  </li>
                  <li
                    onClick={handleTVShowsOnTVClick}
                    className='pb-1 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    On TV
                  </li>
                  <li
                    onClick={handleTVShowsTopRatedClick}
                    className='hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Top Rated
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <button
          className='block sm:hidden p-4 border-t-2 text-quaternary border-tertiary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer'
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      <div className='hidden sm:flex justify-end'>
        <form
          onSubmit={handleSearchOnSubmit}
          className='flex items-center bg-primary-2 p-2 rounded-md'
        >
          <div className='relative'>
            <button
              type='button'
              onClick={() => setIsOpenCategory((prev) => !prev)}
              className='px-2 text-quaternary border-r-2 border-primary hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active'
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
            {isOpenCategory && (
              <div className='bg-primary absolute top-14 -right-14 flex flex-col p-3 text-sm rounded-md w-24'>
                <ul className='text-quaternary '>
                  <li
                    onClick={() => {
                      setCategory('all')
                      setIsOpenCategory(false)
                    }}
                    className='pb-2 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    All
                  </li>
                  <li
                    onClick={() => {
                      setCategory('movie')
                      setIsOpenCategory(false)
                    }}
                    className='pb-2 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    Movies
                  </li>
                  <li
                    onClick={() => {
                      setCategory('tv')
                      setIsOpenCategory(false)
                    }}
                    className='pb-2 hover:text-tertiary duration-200 cursor-pointer'
                  >
                    TV Shows
                  </li>
                  <li
                    onClick={() => {
                      setCategory('person')
                      setIsOpenCategory(false)
                    }}
                    className=' hover:text-tertiary duration-200 cursor-pointer'
                  >
                    People
                  </li>
                </ul>
              </div>
            )}
          </div>
          <input
            type='text'
            placeholder='Search...'
            id='search'
            data-netlify='true'
            ref={searchQuery}
            className='bg-transparent placeholder:text-quarternary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 text-quaternary focus:outline-none ml-2'
          />
        </form>
      </div>
      {isMobileMenuOpen && (
        <div className='md:hidden absolute top-16 left-0 right-0 bg-primary p-4 flex flex-col items-start'>
          <form
            onSubmit={handleSearchOnSubmit}
            className='flex items-center bg-primary-2 p-2 rounded-md'
          >
            <div className='relative'>
              <button
                type='button'
                onClick={() => setIsOpenCategory((prev) => !prev)}
                className='px-2 text-quaternary border-r-2 border-primary hover:border-opacity-100 hover:text-tertiary duration-200 cursor-pointer active'
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
              {isOpenCategory && (
                <div className='bg-primary-2 absolute top-11 -right-13 flex flex-col p-3 text-sm rounded-md w-24'>
                  <ul className='text-white/50'>
                    <li
                      onClick={() => {
                        setCategory('all')
                        setIsOpenCategory(false)
                      }}
                      className='pb-2 hover:text-tertiary duration-200 cursor-pointer'
                    >
                      All
                    </li>
                    <li
                      onClick={() => {
                        setCategory('movie')
                        setIsOpenCategory(false)
                      }}
                      className='pb-2 hover:text-tertiary duration-200 cursor-pointer'
                    >
                      Movies
                    </li>
                    <li
                      onClick={() => {
                        setCategory('tv')
                        setIsOpenCategory(false)
                      }}
                      className='pb-2 hover:text-tertiary duration-200 cursor-pointer'
                    >
                      TV Shows
                    </li>
                    <li
                      onClick={() => {
                        setCategory('person')
                        setIsOpenCategory(false)
                      }}
                      className=' hover:text-tertiary duration-200 cursor-pointer'
                    >
                      People
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <input
              type='text'
              placeholder='Search...'
              id='search'
              data-netlify='true'
              ref={searchQuery}
              className='bg-transparent placeholder:text-quarternary border-opacity-0 hover:border-opacity-100 hover:text-tertiary duration-200 text-quaternary focus:outline-none ml-2'
            />
          </form>
          <div className='flex text-white gap-5 my-3 ml-3'>
            <div className=''>
              <h3 className='text-base font-bold'>Movie</h3>
              <div className='flex flex-col text-sm'>
                <Link
                  to='/movies/popular'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Popular
                </Link>
                <Link
                  to='/movies/now-playing'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Now Playing
                </Link>
                <Link
                  to='/movies/upcoming'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Upcoming
                </Link>
                <Link
                  to='/movies/top-rated'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Top Rated
                </Link>
              </div>
            </div>
            <div className=''>
              <h3 className='text-base font-bold'>TV Shows</h3>
              <div className='flex flex-col text-sm'>
                <Link
                  to='/tv/popular'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Popular
                </Link>
                <Link
                  to='/tv/airing-today'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Airing Today
                </Link>
                <Link
                  to='/tv/on-tv'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  On TV
                </Link>
                <Link
                  to='/tv/top-rated'
                  className='py-1 hover:text-tertiary duration-200'
                >
                  Top Rated
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
