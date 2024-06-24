import React from 'react'
import WhatsPopularSlider from '../components/homepage/WhatsPopularSlider'
import TrendingSlider from '../components/homepage/TrendingSlider'
import UpcomingTrailerSection from '../components/homepage/UpcomingTrailerSection'
import WelcomeBanner from '../components/homepage/WelcomeBanner'

const HomePage = () => {
  return (
    <div className='bg-primary-1 w-full min-h-screen z-30'>
      <div className='mx-auto lg:w-[1040px]'>
        <WelcomeBanner />
        <TrendingSlider />
        <UpcomingTrailerSection />
        <WhatsPopularSlider />
      </div>
    </div>
  )
}

export default HomePage
