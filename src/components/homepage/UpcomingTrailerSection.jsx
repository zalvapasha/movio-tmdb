import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import './slider.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FaPlay } from 'react-icons/fa'
import { getMoviesTopRated, getTVShowsTopRated } from '../../api/Api'
import TrailerModal from '../TrailerModal'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrailer, setSelectedTrailer] = useState(null)
  const [startPos, setStartPos] = useState(null)

  const imgURL = 'https://image.tmdb.org/t/p/w500'

  const settings = {
    className: 'center',
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex)
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: '70px',
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: '10px',
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '120px',
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          infinite: true,
          centerPadding: '60px',
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  const handleSlideClick = (data) => {
    setSelectedTrailer(data)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTrailer(null)
  }

  const handleMouseDown = (event) => {
    setStartPos({ x: event.clientX, y: event.clientY })
  }

  const handleMouseUp = (event, data) => {
    if (startPos) {
      const distance = Math.sqrt(
        Math.pow(event.clientX - startPos.x, 2) +
          Math.pow(event.clientY - startPos.y, 2)
      )
      if (distance < 10) {
        handleSlideClick(data)
      }
      setStartPos(null)
    }
  }

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
          <div className='flex flex-col xs:flex-row gap-2 ml-2 mb-2'>
            <h2 className='pr-4 text-white text-base'>Top Rated Trailer</h2>
            <nav className='border-[2px] rounded-full border-tertiary w-fit'>
              <ul className='flex '>
                {filters.map((filter) => (
                  <li
                    key={filter.id}
                    className={`px-2 py-[2px] text-sm ${filter.active ? 'bg-tertiary text-primary rounded-full' : 'text-white/70'}`}
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
                <div
                  key={id}
                  onMouseDown={handleMouseDown}
                  onMouseUp={(event) => handleMouseUp(event, data)}
                >
                  <div
                    key={data.id}
                    className='flex flex-col items-center justify-center p-4'
                  >
                    <img
                      src={imgURL + data.backdrop_path}
                      alt={data.title || data.name}
                      className='relative rounded-lg'
                    />
                    <FaPlay
                      style={{
                        color: 'white',
                        opacity: 0.7,
                      }}
                      size={30}
                      className='absolute'
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
      {isModalOpen && selectedTrailer && (
        <TrailerModal
          isOpen={isModalOpen}
          onClose={closeModal}
          trailer={selectedTrailer}
          mediaType={filters.find((filter) => filter.active).mediaType}
        />
      )}
    </div>
  )
}

export default UpcomingTrailerSection
