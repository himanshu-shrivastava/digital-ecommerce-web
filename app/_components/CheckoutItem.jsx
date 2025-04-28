import Image from 'next/image'
import React from 'react'
import RemoveFromCart from './RemoveFromCart'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

function CheckoutItem({ product }) {

    return (
        <div>
            <Card className='p-2 flex gap-2 justify-between items-center'>
                <div className='flex gap-5'>
                    <div>
                        <Link href={ `/explore/${product?.productId}` }>
                            <Image
                                src={ product?.imageUrl } alt={ product?.title } width={ 100 } height={ 100 }
                                className='h-[80px] w-[80px] object-center'
                            />
                        </Link>
                    </div>
                    <div>
                        <h2 className='font-medium text-lg'>{ product?.title }</h2>
                        <h2 className='text-gray-400 text-sm'>{ product?.category }</h2>
                        <RemoveFromCart product={ product } />
                    </div>
                </div>
                <div>
                    <h2 className='font-bold text-lg text-yellow-600'>${ product?.price }</h2>
                </div>
            </Card>
        </div>
    )
}

export default CheckoutItem