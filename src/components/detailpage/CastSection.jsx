import React, { useState, useEffect } from 'react'
import { getCreditsMedia } from '../../api/Api'

const CastSection = ({ id, media_type }) => {
  const [cast, setCast] = useState([])
  const [showAll, setShowAll] = useState(false)

  const placeholderPerson = '../../src/assets/placeholder-person.jpg'

  useEffect(() => {
    getCreditsMedia(id, media_type)
      .then((result) => {
        setCast(result.cast)
      })
      .catch((error) => {
        console.error('Error fetching cast data:', error)
      })
  }, [id, media_type])

  // Determine the number of columns based on screen size
  const getMaxVisibleCast = () => {
    const screenWidth = window.innerWidth
    if (screenWidth >= 1024) return 12 // 4 columns
    if (screenWidth >= 768) return 9 // 3 columns
    return 6 // 2 columns
  }

  const maxVisibleCast = getMaxVisibleCast()
  const visibleCast = showAll ? cast : cast.slice(0, maxVisibleCast)

  return (
    <div className='relative'>
      <div className='flex flex-wrap gap-4 justify-center'>
        {visibleCast.length > 0 ? (
          visibleCast.map((member) => (
            <div
              key={member.id}
              className='flex items-center bg-primary-2 p-2 w-52 rounded-full'
            >
              <div className='w-14 h-14 rounded-full overflow-hidden flex justify-center items-center'>
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  onError={(e) => (e.target.src = placeholderPerson)}
                  alt={member.name}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='ml-4'>
                <h2 className='text-lg line-clamp-1'>{member.name}</h2>
                <p className='text-sm line-clamp-1'>{member.character}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cast information available</p>
        )}
      </div>
      {cast.length > maxVisibleCast && (
        <div
          className={`flex items-center justify-center w-full mt-4 ${showAll ? '' : 'absolute -bottom-10 bg-gradient-to-t from-primary-1 from-45% h-28 to-transparent'}`}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className='bg-primary-2 text-white h-fit py-2 px-4 rounded'
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CastSection
