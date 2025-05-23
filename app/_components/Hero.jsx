import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
    return (
        <div className='bg-green-700 p-5 px-28 lg:px-36'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-14'>
                <div>
                    <h2 className='font-extrabold text-4xl text-white'>Speed Up your Creative Workflow</h2>
                    <p className='text-gray-200 mt-5'>Join a growing family of 43,436 designers, creator and makers from around the world</p>
                    <div className='flex gap-5 mt-8'>
                        <Link href={ '/explore' } >
                            <Button size='lg'>Explore</Button>
                        </Link>
                        <Link href={ '/dashboard' } >
                            <Button size='lg' className='bg-red-500 hover:bg-red-600'>Sell</Button>
                        </Link>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <Image
                        src={ '/hero-pc.png' }
                        alt='Hero PC'
                        width={ 300 }
                        height={ 300 }
                        className='scale-x-[-1]'
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero