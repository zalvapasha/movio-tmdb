import React from 'react'
import ResultOutput from '../components/searchpage/ResultOutput'

const SearchResultPage = () => {
  return (
    <div className='bg-primary-1 w-full min-h-screen z-30'>
      <div className='py-5 mx-auto lg:w-[1040px] '>
        <ResultOutput />
      </div>
    </div>
  )
}

export default SearchResultPage
