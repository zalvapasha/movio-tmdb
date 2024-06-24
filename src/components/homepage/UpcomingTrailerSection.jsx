import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import './slider.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getMoviesTopRated, getTVShowsTopRated } from '../../api/Api'

const UpcomingTrailerSection = () => {
  const initialFilters = [
    {
      id: 1,
      name: 'Movies',
      active: true,
      fetchFunc: getMoviesTopRated,
      mediaType: 'movie',
    },
    {
      id: 2,
      name: 'TV Shows',
      active: false,
      fetchFunc: getTVShowsTopRated,
      mediaType: 'tv',
    },
  ]
  const [filters, setFilters] = useState(initialFilters)
  const [datas, setDatas] = useState([])
  const [backgroundImage, setBackgroundImage] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex)
    },
  }

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
          setDatas(data)
          if (data.length > 0) {
            setBackgroundImage(imgURL + data[0].backdrop_path)
            setCurrentSlide(0)
          }
        })
        .catch((error) => console.error('Error fetching data:', error))
    }
  }, [filters])

  useEffect(() => {
    if (datas.length > 0) {
      setBackgroundImage(imgURL + datas[currentSlide].backdrop_path)
    }
  }, [currentSlide, datas])

  const imgURL = 'https://image.tmdb.org/t/p/w500'

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='bg-cover bg-center'
    >
      <div className='flex justify-center bg-black bg-opacity-70'>
        <div className='w-11/12 my-5'>
          <div className='flex items-center ml-5 mb-2'>
            <h2 className='pr-4 text-white text-xl'>Top Rated Trailer</h2>
            <nav className='border-[2px] rounded-full border-tertiary'>
              <ul className='flex text-sm'>
                {filters.map((filter) => (
                  <li
                    key={filter.id}
                    className={`px-2 py-[2px] ${filter.active ? 'bg-tertiary text-primary rounded-full' : 'text-white/70'}`}
                    onClick={() => handleFilterClick(filter.id)}
                  >
                    {filter.name}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {datas.length > 0 ? (
            <Slider {...settings}>
              {datas.map((data, id) => (
                <div key={id}>
                  <div
                    key={data.id}
                    className='flex flex-col items-center justify-center p-4 '
                  >
                    <img
                      src={imgURL + data.backdrop_path}
                      alt={data.title || data.name}
                    />
                  </div>
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

export default UpcomingTrailerSection
