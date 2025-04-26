import React, { useContext, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import ProductEditableOption from './ProductEditableOption'
import { MoreVerticalIcon } from 'lucide-react'
import { toast } from 'sonner'

function AddToCartBtn({ product, user, editable = false, size = 'sm' }) {

    const { cart, setCart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)

    /* Add Item in the cart */
    const AddToCart = async () => {
        setLoading(true)
        try {
            setCart(cart => [...cart, product])
            const cart_data = await axios.post('/api/cart', {
                emailId: user?.primaryEmailAddress?.emailAddress,
                productId: product?.id
            })
            if (cart_data?.data?.success) {
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
        <div>
            { !editable
                ? <Button size={ size } className='mt-1 w-full' disabled={ loading } onClick={ AddToCart }>Add to Cart</Button>
                : <ProductEditableOption>
                    <MoreVerticalIcon />
                </ProductEditableOption>
            }
        </div>
    )
}

export default AddToCartBtn