import React from 'react'
import ProductListItem from './ProductListItem'

function DisplayProductList({ productList }) {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            { productList?.length > 0
                ? productList.map((product, index) => (
                    <ProductListItem
                        key={ index }
                        product={ product }
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