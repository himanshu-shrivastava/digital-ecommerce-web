import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Card } from "@/components/ui/card"
import AddToCartBtn from './AddToCartBtn'
import { Button } from '@/components/ui/button'

function ProductCardItem({ product, user, editable = false, purchased = false }) {
    return (
        <Card className="p-1 md:p-2">
            <Link href={ `/explore/${product.id}` }>
                <Image src={ product?.imageUrl } alt={ product?.title } width={ 400 } height={ 250 } className='h-[180px] object-cover' />
            </Link>
            <div className='mt-3'>
                <h2 className='font-bold text-xl line-clamp-1' title={ product?.title }>{ product?.title }</h2>
                <h2 className='font-bold text-2xl text-yellow-500'>${ product?.price }</h2>
                <div className='mt-3 md:flex justify-between items-center'>
                    { !purchased
                        ?
                        <>
                            <div className='flex gap-2 items-center'>
                                <Image className='rounded-full' src={ product?.user?.image } alt='user' width={ 20 } height={ 20 } />
                                <h2 className='text-sm text-gray-400'>
                                    { product?.user?.name }
                                </h2>
                            </div>
                            <AddToCartBtn user={ user } product={ product } editable={ editable } />
                        </>
                        :
                        <>
                            <Link href={ product?.fileUrl } target='_blank'>
                                <Button className='w-full bg-green-700 text-white'>Download Content</Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </Card>
    )
}

export default ProductCardItem