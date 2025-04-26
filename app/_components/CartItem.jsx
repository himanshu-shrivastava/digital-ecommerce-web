import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { CartContext } from '../_context/CartContext'
import axios from 'axios'

function CartItem({ product }) {

    const [deleting, setDeleting] = useState(false)
    const { cart, setCart } = useContext(CartContext)

    /* Remove Item from cart */
    const RemoveCartItem = async () => {
        setDeleting(true)
        try {
            const cartList = cart.filter((item) => item.id !== product.id)
            setCart(cartList)

            const is_deleted = await axios.delete(`/api/cart?recordId=${product?.id}`)

            if (is_deleted?.data?.success) {
                toast('1 Item removed from the Cart')
            } else {
                console.log(is_deleted?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <Card className='flex gap-5'>
            <Image
                src={ product?.imageUrl } alt={ product?.title } width={ 70 } height={ 70 }
                className='h-[70px] w-[70px] object-cover'
            />
            <div>
                <h2 className='font-bold'>{ product?.title }</h2>
                <h2 className='font-bold text-yellow-600 text-lg'>${ product?.price }</h2>
                <h2 className='text-red-500 cursor-pointer' disabled={ deleting } onClick={ RemoveCartItem }>Remove</h2>
            </div>
        </Card>
    )
}

export default CartItem