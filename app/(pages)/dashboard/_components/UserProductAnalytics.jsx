"use client"

import DisplayProductList from '@/app/_components/DisplayProductList'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UserProductAnalytics() {

    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        user && GetAnalyticsData()
    }, [user])

    const calculateTotal = () => {
        let total = 0
        purchaseHistory?.length > 0 && purchaseHistory.forEach(item => {
            total += Number(item?.products?.price)
        })
        return total
    }

    const GetAnalyticsData = async () => {
        setLoading(true)
        try {
            const purchase_list = await axios.get('/api/analytics')
            if (purchase_list?.data?.success) {
                setPurchaseHistory(purchase_list?.data?.success)
            } else {
                toast(purchase_list?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Analytics Data
            </h2>
            <div>
                { purchaseHistory?.length === 0
                    ?
                    <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>
                        We do not have any purchase history of your listed products.
                    </h2>
                    :
                    <div className='flex flex-col gap-2 mt-5 w-[1000px]'>
                        <Card className='flex flex-col gap-2 bg-yellow-200 p-3'>
                            <h2>Total Product Sold : <span className='font-bold'>{ purchaseHistory?.length }</span></h2>
                            <h2>Total Amount : <span className='font-bold text-xl'>${ calculateTotal() }</span></h2>
                        </Card>
                        <div className='p-2'>
                            { purchaseHistory.map((history, index) => (
                                <div key={ index } className='grid gap-2'>
                                    <div className='grid grid-cols-4 gap-5 items-center'>
                                        <Link href={ `/explore/${history?.products?.id}` }>
                                            <Image
                                                src={ history?.products?.imageUrl } alt={ history?.products?.title } width={ 70 } height={ 70 }
                                                className='h-[80px] w-[80px] object-cover'
                                            />
                                        </Link>
                                        <div className='w-[350px] -ml-20'>
                                            <h2 className='font-bold'>{ history?.products?.title }</h2>
                                            <Badge>{ history?.products?.category }</Badge>
                                        </div>
                                        <h2 className='text-sm text-end'>{ history?.orders?.emailId }</h2>
                                        <h2 className='font-bold text-lg text-center'>${ history?.products?.price }</h2>
                                    </div>
                                    <hr className='border-black border-2' />
                                </div>
                            )) }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserProductAnalytics