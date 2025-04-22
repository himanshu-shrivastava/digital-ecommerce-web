import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function ProductListItem({ product }) {
    return (
        <div>
            <Card className="p-3">
                <Image src={ product?.image } alt={ product?.name } width={ 400 } height={ 300 } />
                <div className='mt-3'>
                    <h2 className='font-bold text-xl'>{ product?.name }</h2>
                    <h2 className='font-bold text-2xl text-yellow-500'>${ product?.price }</h2>
                    <div className='mt-3 md:flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <Image src={ product?.user?.image } alt='user' width={ 20 } height={ 20 } className='rounded-full' />
                            <h2 className='text-sm text-gray-400'>
                                { product?.user?.name }
                            </h2>
                        </div>
                        <Button size='sm' className='mt-1'>Add to Cart</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

// id: 5,
// name: 'E commerce App UI Kit',
// price: 10,
// image: '/images/card/iphone.png',
// user: {
//     image: '/images/card/user.png',
//     name: 'Himanshu'
// }

export default ProductListItem