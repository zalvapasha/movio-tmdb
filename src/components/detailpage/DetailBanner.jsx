import React, { useEffect, useState } from 'react'
import { getDetailMedia, getCreditsMedia } from '../../api/Api'

const DetailBanner = ({ id, media_type }) => {
  const [data, setData] = useState(null)
  const [credits, setCredits] = useState(null)

  useEffect(() => {
    getDetailMedia(id, media_type)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching detail media:', error)
      })

    getCreditsMedia(id, media_type)
      .then((result) => {
        setCredits(result)
      })
      .catch((error) => {
        console.error('Error fetching credits:', error)
      })
  }, [id, media_type])

  const convertRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }

  console.log(data)
  console.log(credits)

  const imgURL = 'https://image.tmdb.org/t/p/original'

  const getCreatorOrDirectorName = () => {
    if (!credits) return 'N/A'
    if (media_type === 'movie') {
      const director = credits.crew.find((person) => person.job === 'Director')
      return director ? director.name : 'N/A'
    } else if (media_type === 'tv') {
      const creator =
        data.created_by && data.created_by.length > 0
          ? data.created_by[0].name
          : 'N/A'
      return creator
    }
  }

  return (
    <>
      {data && (
        <div
          className='flex flex-col md:flex-row items-center relative bg-no-repeat bg-cover bg-center h-auto md:h-[500px] w-full'
          style={{ backgroundImage: `url(${imgURL}${data.backdrop_path})` }}
        >
          <div className='absolute inset-0 bg-black opacity-70' />
          <div className='relative z-10 flex flex-col md:flex-row items-center w-10/12 mx-auto py-4 md:py-0'>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              className='w-48 md:w-72 rounded-xl mb-4 md:mb-0'
              alt={data.title || data.name}
            />
            <div className='ml-0 md:ml-4 text-center md:text-left'>
              <h1 className='text-2xl md:text-4xl font-bold'>
                {data.title || data.name}
              </h1>
              <p className='text-white/70 italic'>{data.tagline}</p>
              <div className='flex flex-wrap justify-center md:justify-start my-1 gap-2'>
                {data.genres &&
                  data.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className='flex items-center bg-white/40 px-2 py-0.5 rounded-md'
                    >
                      <span className='text-black text-sm'>{genre.name}</span>
                    </div>
                  ))}
              </div>
              <div className='py-0 md:border-b-[1px] border-white/30'>
                <h2 className='text-2xl md:text-3xl'>Overview</h2>
                <p className='text-white/70'>{data.overview}</p>
              </div>
              <div className='flex flex-col gap-4 py-2 border-b-[1px] border-white/30'>
                <div className='flex  justify-center md:justify-start gap-4 text-sm'>
                  <div>
                    <strong>Status : </strong>
                    <span className='text-white/70'>{data.status}</span>
                  </div>
                  <div>
                    <strong>Release Date : </strong>
                    <span className='text-white/70'>
                      {formatDate(data.release_date || data.first_air_date)}
                    </span>
                  </div>
                  <div>
                    {media_type === 'tv' ? (
                      <>
                        <strong>Episodes : </strong>
                        <span className='text-white/70'>
                          {data.number_of_episodes}
                        </span>
                      </>
                    ) : (
                      <>
                        <strong>Runtime : </strong>
                        <span className='text-white/70'>
                          {convertRuntime(data.runtime)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='text-sm mt-2'>
                <strong>
                  {media_type === 'tv' ? 'Created By' : 'Director'} :{' '}
                </strong>
                <span className='text-white/70'>
                  {getCreatorOrDirectorName()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailBanner
