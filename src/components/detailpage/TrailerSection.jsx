import React, { useState, useEffect } from 'react'
import { getTrailerMedia } from '../../api/Api'

const TrailerSection = ({ id, media_type }) => {
  const [trailer, setTrailer] = useState(null)

  useEffect(() => {
    getTrailerMedia(id, media_type)
      .then((result) => {
        const trailers = result.results.filter(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )
        if (trailers.length > 0) {
          setTrailer(trailers[0])
        }
      })
      .catch((error) => {
        console.error('Error fetching trailer media:', error)
      })
  }, [id, media_type])

  return (
    <div>
      {trailer ? (
        <div className='flex justify-center py-10'>
          <iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  )
}

export default TrailerSection
