"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SimilarProduct from './_components/SimilarProduct'
import AddToCartBtn from '@/app/_components/AddToCartBtn'
import { useUser } from '@clerk/nextjs'

function ProductDetail({ params }) {

    const { productId } = React.use(params)
    const [productDetail, setProductDetail] = useState()
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        GetProductDetail()
    }, [])

    const GetProductDetail = async () => {
        setLoading(true)
        try {
            const product_detail = await axios.get(`/api/products?productId=${productId}`)
            if (product_detail?.data?.success) {
                setProductDetail(product_detail?.data?.success[0])
            } else {
                toast(product_detail?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e)
        } finally {
            setLoading(false)
        }
    }

    return productDetail && (
        <div className='mt-10'>
            <h2>BACK</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-10'>
                <div>
                    <Card className='flex items-center justify-center max-h-[400px]'>
                        <Image
                            src={ productDetail?.imageUrl } alt={ productDetail?.title } width={ 400 } height={ 400 }
                            className='h-[400px] w-full object-contain'
                        />
                    </Card>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h2 className='font-bold text-2xl'>{ productDetail?.title }</h2>
                        <Badge className='text-black'>{ productDetail?.category }</Badge>
                    </div>
                    <h3 className='font-bold text-3xl text-yellow-600'>${ productDetail?.price }</h3>
                    <p className='text-gray-500'>The { productDetail?.category } will send to your registered email id once you purchase this digital content.</p>

                    <AddToCartBtn size='lg' user={ user } product={ productDetail } />

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent>{ productDetail?.description }</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>About Product</AccordionTrigger>
                            <AccordionContent>{ productDetail?.about }</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <SimilarProduct category={ productDetail?.category } productId={ productId } />
        </div>
    )
}

export default ProductDetail