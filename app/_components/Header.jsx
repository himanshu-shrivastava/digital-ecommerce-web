import React from 'react'
import { HeaderMenu } from '../constants'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Header() {
    return (
        <header className='flex justify-between items-center p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-2 border-black'>
            <h2 className='font-bold text-lg bg-black text-white px-2 p-1'>
                DIGI STORE
            </h2>
            <ul className='hidden md:flex gap-5'>
                { HeaderMenu.map((menu, index) => (
                    <li className=' px-2 p-1 cursor-pointer hover:border-2 hover:border-white' key={ index }>
                        { menu?.name }
                    </li>
                )) }
            </ul>
            <div className='flex gap-5 items-center'>
                <ShoppingBag />
                <Button className='bg-red-500 hover:bg-red-600'>Start Selling</Button>
            </div>
        </header>
    )
}

export default Header