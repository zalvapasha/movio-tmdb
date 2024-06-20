import React, { useEffect, useState } from 'react'
import { getDetailMedia } from '../../api/Api'

const DetailBanner = ({ id, media_type }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    getDetailMedia(id, media_type)
      .then((result) => {
        setData(result)
      })
      .catch((error) => {
        console.error('Error fetching detail media:', error)
      })
  }, [id, media_type])

  console.log(data)

  const imgURL = 'https://image.tmdb.org/t/p/original'

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
              <h1 className='text-white text-4xl font-bold'>
                {data.title || data.name}
              </h1>
              <p>{data.tagline}</p>
              <div className='flex flex-wrap'>
                {data.genres &&
                  data.genres.map((genre) => (
                    <div className='bg-white/40 mr-2 px-2 py-0.5 rounded-md'>
                      <span key={genre.id} className=' text-black text-sm'>
                        {genre.name}
                      </span>
                    </div>
                  ))}
              </div>
              <h2 className='text-3xl'>Overview</h2>
              <p className='text-white'>{data.overview}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailBanner
