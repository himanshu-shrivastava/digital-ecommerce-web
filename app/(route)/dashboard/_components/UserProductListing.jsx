"use client"

import DisplayProductList from '@/app/_components/DisplayProductList'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UserProductListing() {
    const [userProductList, setUserProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        user && GetUserProductList()
    }, [user])

    const GetUserProductList = async () => {
        setLoading(true)
        try {
            const product_list = await axios.get('/api/products?email=' + user?.primaryEmailAddress.emailAddress)
            if (product_list?.data?.success) {
                setUserProductList(product_list?.data?.success)
            } else {
                toast(product_list?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Listing
                <Link href={ '/add-product' }>
                    <Button>+ Add New Product</Button>
                </Link>
            </h2>

            <div>
                { userProductList?.length === 0 &&
                    <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>No Listing Found</h2>
                }
                <DisplayProductList productList={ userProductList } editable={ true } />
            </div>
        </div>
    )
}

export default UserProductListing