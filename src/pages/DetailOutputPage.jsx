import React from 'react'
import { useParams } from 'react-router-dom'
import DetailBanner from '../components/detailpage/DetailBanner'

const DetailOutputPage = () => {
  const { id, media_type } = useParams()
  return (
    <div className='bg-primary-1 w-full min-h-screen z-30'>
      <div className='py-5 mx-auto lg:w-[1020px] text-white'>
        <div>DetailOutputPage</div>
        <DetailBanner id={id} media_type={media_type} />
      </div>
    </div>
  )
}

export default DetailOutputPage
