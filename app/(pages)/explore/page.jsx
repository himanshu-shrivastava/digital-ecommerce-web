"use client"

import DisplayProductList from '@/app/_components/DisplayProductList'
import SortProducts from '@/app/_components/SortProducts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Loader2Icon, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function Explore() {

    const limit = 6
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [sort, setSort] = useState({
        label: 'Newest',
        field: 'id',
        order: 'desc'
    })

    useEffect(() => {
        if (sort) {
            setProductList([])
            GetProductList(0)
        }
    }, [sort])

    const GetProductList = async (offset_) => {
        setLoading(true)
        try {
            setOffset(offset_)
            const product_list = await axios.post('/api/all-products', {
                limit: Number(limit),
                offset: Number(offset_),
                searchtext: searchInput,
                sort: sort
            })
            if (product_list?.data?.success) {
                if (productList.length === 0)
                    setProductList(product_list?.data?.success)
                else
                    setProductList(prev => [...prev, ...product_list?.data?.success])
            } else {
                toast(product_list?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.messgae)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl'>Explore</h2>
            <div className='mt-5 mb-5 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <h2>Search :</h2>
                    <Input
                        placeholder='Type your product...' className='w-[250px]'
                        onChange={ (event) => setSearchInput(event.target.value) }
                    />
                    <Button onClick={ () => { GetProductList(0); setProductList([]) } }>
                        <Search />Search
                    </Button>
                </div>

                <SortProducts onSortChange={ (value) => setSort(value) } />
            </div>

            <DisplayProductList productList={ productList } />

            <div className='flex items-center justify-center mt-10 flex-col'>
                <Button onClick={ () => GetProductList(offset + 6) } disabled={ loading }>
                    { loading ? <Loader2Icon className='animate-spin' /> : 'Load More' }
                </Button>
            </div>
        </div>
    )
}

export default Explore