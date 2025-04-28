"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Products from '../_mockData/Products'
import axios from 'axios'
import { toast } from 'sonner'
import Link from 'next/link'
import DisplayProductList from './DisplayProductList'

function ProductList() {
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // setProductList(Products) // getting mockdata for testing
        GetProductList()
    }, [])

    const GetProductList = async () => {
        setLoading(true)
        try {
            const product_list = await axios.get('/api/products?limit=9')
            if (product_list?.data?.success) {
                setProductList(product_list?.data?.success)
            } else {
                toast(product_list?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Featured
                <span>
                    <Link href={ '/explore' }>
                        <Button>View All</Button>
                    </Link>
                </span>
            </h2>

            <DisplayProductList productList={ productList } />
        </div>
    )
}

export default ProductList