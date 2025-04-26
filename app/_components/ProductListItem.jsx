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
import { MoreVerticalIcon } from 'lucide-react'
import ProductEditableOption from './ProductEditableOption'

function ProductListItem({ product, editable = false }) {
    return (
        <div>
            <Card className="p-1 md:p-2">
                <Image src={ product?.imageUrl } alt={ product?.title } width={ 400 } height={ 250 } className='h-[180px] object-cover' />
                <div className='mt-3'>
                    <h2 className='font-bold text-xl line-clamp-1' title={ product?.title }>{ product?.title }</h2>
                    <h2 className='font-bold text-2xl text-yellow-500'>${ product?.price }</h2>
                    <div className='mt-3 md:flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <Image className='rounded-full' src={ product?.user?.image } alt='user' width={ 20 } height={ 20 } />
                            <h2 className='text-sm text-gray-400'>
                                { product?.user?.name }
                            </h2>
                        </div>
                        { !editable
                            ? <Button size='sm' className='mt-1'>Add to Cart</Button>
                            : <ProductEditableOption>
                                <MoreVerticalIcon />
                            </ProductEditableOption>
                        }
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ProductListItem