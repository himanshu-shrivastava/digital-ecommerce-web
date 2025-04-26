import React, { useContext } from 'react'
import { HeaderMenu } from '../constants'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { CartContext } from '../_context/CartContext'
import CartList from './CartList'

function Header() {

    const { cart, setCart } = useContext(CartContext)
    return (
        <header className='flex justify-between items-center p-3 px-10 md:px-30 lg:px-42 bg-primary border-b-2 border-black'>
            <h2 className='font-bold text-lg bg-black text-white px-2 p-1'>
                DIGI STORE
            </h2>
            <ul className='hidden md:flex gap-5'>
                { HeaderMenu.map((menu, index) => (
                    <Link href={ menu?.path } key={ index }>
                        <li className=' px-3 p-1 cursor-pointer hover:border-2 hover:border-white'>
                            { menu?.name }
                        </li>
                    </Link>
                )) }
            </ul>
            <div className='flex gap-5 items-center'>
                <CartList>
                    <div className='flex items-center '>
                        <ShoppingBag />
                        <Badge className='bg-black hover:bg-black text-white rounded-full py-1'>
                            { cart?.length }
                        </Badge>
                    </div>
                </CartList>
                <Link href={ '/dashboard' } >
                    <Button className='bg-red-500 hover:bg-red-600'>Start Selling</Button>
                </Link>
                <UserButton />
            </div>
        </header>
    )
}

export default Header