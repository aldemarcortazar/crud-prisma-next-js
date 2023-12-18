
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-around p-3 bg-black'>
      <h3 className='font-white text-2xl font-bol'>Next Crud</h3>
      <div className='flex '>
        <Link className='mr-4' href="/">Tasks </Link>
        <Link href='new'>new</Link>
      </div>
    </nav>
  )
}

export default NavBar
