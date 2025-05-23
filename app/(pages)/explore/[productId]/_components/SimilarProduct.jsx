import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayProductList from '@/app/_components/DisplayProductList'

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
                console.log('Error: ', product_detail?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-14'>
            <h2 className='font-bold text-xl flex justify-between items-center'>
                Similar Products
            </h2>
            <div>
                { !loading && similarProducts?.length === 0 &&
                    <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>No similar product found in this Category</h2>
                }
                <DisplayProductList productList={ similarProducts } />
            </div>
        </div>
    )
}

export default SimilarProduct