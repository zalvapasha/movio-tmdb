import React from 'react'
import { useParams } from 'react-router-dom'
import DetailBanner from '../components/detailpage/DetailBanner'
import TrailerSection from '../components/detailpage/TrailerSection'
import CastSection from '../components/detailpage/CastSection'

const DetailOutputPage = () => {
  const { id, media_type } = useParams()
  return (
    <div className='bg-primary-1 w-full min-h-screen z-30'>
      <div className=' mx-auto lg:w-[1020px] text-white'>
        <DetailBanner id={id} media_type={media_type} />
        <TrailerSection id={id} media_type={media_type} />
        <CastSection id={id} media_type={media_type} />
      </div>
    </div>
  )
}

export default DetailOutputPage
