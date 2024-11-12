import { navMenu } from '@/utils'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full font-sans bg-[#e0e0e0]'>
            <nav className='mx-auto lg:flex items-center justify-between lg:px-10 px-2 h-16 max-w-7xl'>
                <div className='flex items-center'>
                    <h1 className='capitalize text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-sky-600 font-extrabold text-2xl -tracking-tight'>
                        hasnain dev
                    </h1>
                </div>
                <div className='max-w-md'>
                    <ul className='lg:flex items-center justify-center gap-16 hidden'>
                        {
                            navMenu.map((item, index) => (
                                <Link key={index} href={item.path}><li className='font-semibold text-[14px] hover:scale-[1.2] transition-all ease-in duration-[0.2s]'>{item.text}</li></Link>
                            ))
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
