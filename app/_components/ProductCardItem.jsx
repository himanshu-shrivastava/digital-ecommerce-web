import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { MoreVerticalIcon } from 'lucide-react'
import ProductEditableOption from './ProductEditableOption'
import { toast } from 'sonner'
import axios from 'axios'
import { CartContext } from '../_context/CartContext'

function ProductCardItem({ product, user, editable = false }) {

    const { cart, setCart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)

    const AddToCart = async () => {
        setLoading(true)
        try {
            const cart_data = await axios.post('/api/cart', {
                emailId: user?.primaryEmailAddress?.emailAddress,
                productId: product?.id
            })
            if (cart_data?.data?.success) {
                setCart(cart => [...cart, product])
                toast('1 Item Added to the Cart')
            } else {
                console.log(cart_data?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Card className="p-1 md:p-2">
            <Link href={ `/explore/${product.id}` }>
                <Image src={ product?.imageUrl } alt={ product?.title } width={ 400 } height={ 250 } className='h-[180px] object-cover' />
            </Link>
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
                        ? <Button size='sm' className='mt-1' disabled={ loading } onClick={ AddToCart }>Add to Cart</Button>
                        : <ProductEditableOption>
                            <MoreVerticalIcon />
                        </ProductEditableOption>
                    }
                </div>
            </div>
        </Card>
    )
}

export default ProductCardItem