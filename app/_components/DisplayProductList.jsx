import React from 'react'
import ProductCardItem from './ProductCardItem'
import { useUser } from '@clerk/nextjs'

function DisplayProductList({ productList, editable = false }) {
    const { user } = useUser()

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            { productList?.length > 0
                ? productList.map((product, index) => (
                    <ProductCardItem
                        key={ index }
                        product={ product }
                        user={ user }
                        editable={ editable }
                    />
                ))
                : [1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={ index } className='h-[250px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
                ))
            }
        </div>
    )
}

export default DisplayProductList