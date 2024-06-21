import React, { useState, useEffect } from 'react'
import { getCreditsMedia } from '../../api/Api'

const CastSection = ({ id, media_type }) => {
  const [cast, setCast] = useState([])

  useEffect(() => {
    getCreditsMedia(id, media_type)
      .then((result) => {
        setCast(result.cast)
      })
      .catch((error) => {
        console.error('Error fetching cast data:', error)
      })
  }, [id, media_type])

  return (
    <div>
      <h1>Cast Section</h1>
      <div className='grid grid-cols-5 gap-4'>
        {cast.length > 0 ? (
          cast.map((member) => (
            <div key={member.id} className='flex'>
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                className='w-20 h-20 object-cover rounded-full'
              />
              <div className='h-full '>
                <h2 className='text-sm'>{member.name}</h2>
                <p className='text-xs'>{member.character}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cast information available</p>
        )}
      </div>
    </div>
  )
}

export default CastSection
