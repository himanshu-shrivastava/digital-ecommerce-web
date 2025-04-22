import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
    return (
        <div className='bg-green-700 p-10 px-28 lg:px-36'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-20'>
                <div>
                    <h2 className='font-extrabold text-4xl text-white'>Speed Up your Creative Workflow</h2>
                    <p className='text-gray-200 mt-5'>Join a growing family of 43,436 designers, creator and makers from around the world</p>
                    <div className='flex gap-5 mt-8'>
                        <Button>Explore</Button>
                        <Button className='bg-red-500'>Sell</Button>
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
            <div>

            </div>
        </div>
    )
}

export default Hero