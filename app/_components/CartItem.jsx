import Image from 'next/image'
import React from 'react'
import RemoveFromCart from './RemoveFromCart'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

function CartItem({ product }) {

    return (
        <Card className='flex gap-5'>
            <Link href={ `/explore/${product?.productId}` }>
                <Image
                    src={ product?.imageUrl } alt={ product?.title } width={ 70 } height={ 70 }
                    className='h-[70px] w-[70px] object-fill'
                />
            </Link>
            <div>
                <h2 className='font-bold'>{ product?.title }</h2>
                <h2 className='font-bold text-yellow-600 text-lg'>${ product?.price }</h2>
                <RemoveFromCart product={ product } />
            </div>
        </Card>
    )
}

export default CartItem