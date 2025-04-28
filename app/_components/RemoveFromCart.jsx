import React, { useContext, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import axios from 'axios'
import { toast } from 'sonner'

function RemoveFromCart({ product }) {

    const [deleting, setDeleting] = useState(false)
    const { cart, setCart } = useContext(CartContext)

    const RemoveCartItem = async () => {
        setDeleting(true)
        try {
            const cartList = cart.filter((item) => item.id !== product.id)
            setCart(cartList)

            const is_deleted = await axios.delete(`/api/cart?recordId=${product?.id}`)

            if (is_deleted?.data?.success) {
                toast('One Item Removed')
            } else {
                console.log(is_deleted?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <h2
            className='text-red-500 cursor-pointer'
            disabled={ deleting }
            onClick={ RemoveCartItem }
        >
            Remove
        </h2>
    )
}

export default RemoveFromCart