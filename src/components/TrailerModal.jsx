import React, { useEffect, useState } from 'react'
import { getTrailerMedia } from '../api/Api'

const TrailerModal = ({ isOpen, onClose, trailer, mediaType }) => {
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    if (trailer) {
      getTrailerMedia(trailer.id, mediaType)
        .then((result) => {
          const trailers = result.results.filter(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          )
          if (trailers.length > 0) {
            setTrailerUrl(trailers[0].key)
          } else {
            setTrailerUrl('')
          }
        })
        .catch((error) => {
          console.error('Error fetching trailer media:', error)
        })
    }
  }, [trailer, mediaType])

  if (!isOpen) return null

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40'
      onClick={handleClose}
    >
      <div className='relative w-full max-w-2xl'>
        <div className='relative' style={{ paddingBottom: '56.25%' }}>
          {trailerUrl ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='absolute inset-0 w-full h-full'
            ></iframe>
          ) : (
            <p className='text-white'>No trailer available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrailerModal
