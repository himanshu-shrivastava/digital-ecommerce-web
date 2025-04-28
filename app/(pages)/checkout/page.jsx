"use client"

import CheckoutItem from '@/app/_components/CheckoutItem'
import { CartContext } from '@/app/_context/CartContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import { PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

function Checkout() {

    const { cart, setCart } = useContext(CartContext)
    const { user } = useUser()
    const [totalAmout, setTotalAmout] = useState(0)
    const [processing, setProcessing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (cart?.length > 0) {
            let total = 0
            cart && cart.forEach(item => {
                total += Number(item.price)
            })
            setTotalAmout(total)
        } else {
            // if page refresh
            router.replace('/')
        }
    }, [cart])

    const OnPaymentSuccess = async () => {
        setProcessing(true)
        const create_order = await axios.post('/api/order', {
            orderDetail: cart,
            userEmail: user?.primaryEmailAddress?.emailAddress
        })
        setProcessing(false)
        if (create_order?.data?.success) {
            console.log('Payment is successful')
            toast('Order Created Successfully')
            setCart([]) // Set cart to empty
            router.replace('/dashboard')
        } else {
            console.log('error', create_order?.data?.error)
        }
    }

    return (
        <div className='mt-5 px-14'>
            <h2 className='font-bold text-3xl'>
                Checkout
                <span className='text-gray-400 ml-5 text-sm'>(Please do not refresh the page)</span>
            </h2>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 mt-5'>
                <div className='flex flex-col gap-3'>
                    { cart?.length > 0 && cart.map((product, index) => (
                        <CheckoutItem key={ index } product={ product } />
                    )) }
                </div>
                <div>
                    <Card className='p-5 grid gap-5'>
                        <h2 className='font-bold text-2xl flex justify-between'>Total: <span>${ totalAmout }</span></h2>
                        <hr className='border-black' />
                        <div>
                            Your payment receipt and product will be delivered to your registered email id :
                            <Badge className='text-black ml-1'>{ user?.primaryEmailAddress?.emailAddress }</Badge>
                        </div>
                        {/* Just for avoinding Paypal Test Payment everytime */ }
                        <Button onClick={ OnPaymentSuccess }>Test Create Order</Button>

                        <div className='mt-10'>
                            { totalAmout && <PayPalButtons
                                style={ { layout: "horizontal" } }
                                onApprove={ () => OnPaymentSuccess() }
                                onCancel={ () => toast('Payment is cancelled.') }
                                createOrder={ (data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: Number(totalAmout),
                                                    currency_code: 'USD'
                                                }
                                            }
                                        ]
                                    })
                                } }
                            /> }
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Checkout