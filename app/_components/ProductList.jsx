"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Products from '../_mockData/Products'
import ProductListItem from './ProductListItem'

function ProductList() {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        setProductList(Products)
    })

    return (
        <div>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Featured
                <span><Button>View All</Button></span>
            </h2>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5'>
                { productList.map((product, index) => (
                    <ProductListItem
                        key={ index }
                        product={ product }
                    />
                )) }
            </div>
        </div>
    )
}

export default ProductList