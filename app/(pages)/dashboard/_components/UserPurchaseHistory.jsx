"use client"

import DisplayProductList from '@/app/_components/DisplayProductList'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UserPurchaseHistory() {

    const [purchasedProducts, setPurchasedProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        user && GetUserPurchaseList()
    }, [user])

    const GetUserPurchaseList = async () => {
        setLoading(true)
        try {
            const products = await axios.get('/api/order')
            if (products?.data?.success) {
                setPurchasedProducts(products?.data?.success)
            } else {
                toast(products?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Purchase History
            </h2>

            <div>
                { !loading && purchasedProducts?.length === 0 &&
                    <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>No Purchase Found</h2>
                }
                <DisplayProductList productList={ purchasedProducts } purchased={ true } />
            </div>
        </div>
    )
}

export default UserPurchaseHistory