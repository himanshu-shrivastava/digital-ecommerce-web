import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { toast } from 'sonner'
import ProductListItem from '@/app/_components/ProductListItem'

function SimilarProduct({ category = '', productId = 0 }) {

    const [similarProducts, setSimilarProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetSimilarProductList()
    }, [])

    const GetSimilarProductList = async () => {
        setLoading(true)
        try {
            const product_detail = await axios.get(`/api/products?category=${category}&productId=${productId}`)
            if (product_detail?.data?.success) {
                setSimilarProducts(product_detail?.data?.success)
            } else {
                toast('GetSimilarProductList:' + product_detail?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e)
        } finally {
            setLoading(false)
        }
    }

    return similarProducts.length > 0 && (
        <div className='mt-20'>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Similar Products
            </h2>

            <div>
                { similarProducts?.length === 0 &&
                    <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>No Listing Found</h2>
                }
                <div className='grid gap-10 grid-cols-2 lg:grid-cols-3 mt-5'>
                    { similarProducts?.length > 0 &&
                        similarProducts.map((product, index) => (
                            <ProductListItem
                                key={ index }
                                product={ product }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SimilarProduct