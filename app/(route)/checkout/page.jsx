"use client"

import CheckoutItem from '@/app/_components/CheckoutItem'
import { CartContext } from '@/app/_context/CartContext'
import { Card } from '@/components/ui/card'
import React, { useContext } from 'react'

function Checkout() {

    const { cart } = useContext(CartContext)

    const calculateTotal = () => {
        let total = 0
        cart.forEach(item => {
            total = total + Number(item.price)
        })
        return total
    }
    return (
        <div className='mt-10 p-10'>
            <h2 className='font-bold text-3xl'>Checkout</h2>
            <div className='grid gap-10 grid-cols-1 md:grid-cols-2 mt-5'>
                <div className='flex flex-col gap-3'>
                    { cart?.length > 0 && cart.map((product, index) => (
                        <CheckoutItem key={ index } product={ product } />
                    )) }
                </div>
                <div>
                    <Card className='p-5'>
                        <h2 className='font-bold text-2xl flex justify-between'>Total: <span>${ calculateTotal() }</span></h2>
                        <hr className='my-5 border-black' />
                        <p>Your payment receipt and product will be delivered to your registered email id.</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Checkout