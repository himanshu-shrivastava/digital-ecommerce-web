"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { CartContext } from './_context/CartContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function Provider({ children }) {

    const { user } = useUser()
    const [cart, setCart] = useState([])

    useEffect(() => {
        user && CheckNewUser()
        user && GetCartItems()
    }, [user])

    const CheckNewUser = async () => {
        const result = await axios.post('/api/user', { user: user })
        console.log('Logged In user Updated')
    }

    const GetCartItems = async () => {
        const cart_items = await axios.get(`/api/cart?emailId=${user?.primaryEmailAddress?.emailAddress}`)
        if (cart_items?.data?.success) {
            setCart(cart_items?.data?.success)
        } else {
            console.log(cart_items?.data?.error)
        }
    }

    return (
        <div>
            <CartContext.Provider value={ { cart, setCart } }>
                <PayPalScriptProvider options={ { clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID } }>
                    <Header />
                    <div>
                        { children }
                    </div>
                </PayPalScriptProvider>
            </CartContext.Provider>
        </div>
    )
}

export default Provider