import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary-1 text-white py-4'>
      <div className='container mx-auto flex justify-center'>
        <p>
          &copy; 2024 Movio. Made with 💖 by{' '}
          <a
            className='hover:underline'
            href='https://github.com/zalvapasha'
            target='_blank'
            rel='noopener noreferrer'
          >
            Zalva Ihilani Pasha
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
