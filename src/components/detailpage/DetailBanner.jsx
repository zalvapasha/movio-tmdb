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
          className='flex items-center relative bg-no-repeat bg-cover bg-center h-[500px] w-full'
          style={{ backgroundImage: `url(${imgURL}${data.backdrop_path})` }}
        >
          <div className='absolute inset-0 bg-black opacity-70' />
          <div className='relative z-10 flex items-center w-10/12 mx-auto'>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              className='w-72 rounded-xl'
              alt={data.title || data.name}
            />
            <div className='ml-4'>
              <h1 className='text-4xl font-bold'>{data.title || data.name}</h1>
              <p className='text-white/70 italic'>{data.tagline}</p>
              <div className='flex flex-wrap my-1'>
                {data.genres &&
                  data.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className='flex items-center bg-white/40 mr-2 px-2 py-0.5 rounded-md'
                    >
                      <span className=' text-black text-sm'>{genre.name}</span>
                    </div>
                  ))}
              </div>
              <h2 className='text-3xl'>Overview</h2>
              <p className='text-white/70 mb-4'>{data.overview}</p>
              <div className='flex flex-row py-2 border-b-[1px] border-white/30'>
                <h2 className='text-sm mr-4'>
                  <strong>Status : </strong>
                  <span className='text-white/70'>{data.status}</span>
                </h2>
                <h2 className='text-sm  mr-4'>
                  <strong>Release Date : </strong>
                  <span className='text-white/70'>
                    {formatDate(data.release_date || data.first_air_date)}
                  </span>
                </h2>
                <h2 className='text-sm'>
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
                </h2>
              </div>
              <div className='py-2 border-b-[1px] border-white/30'>
                <h2 className='text-sm'>
                  <strong>
                    {media_type === 'tv' ? 'Created By' : 'Director'} :{' '}
                  </strong>
                  <span className='text-white/70'>
                    {getCreatorOrDirectorName()}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailBanner
