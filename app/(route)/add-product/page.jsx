"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { ProductCategory } from '@/app/constants'
import { Button } from '@/components/ui/button'
import ImageUpload from './_components/ImageUpload'

function AddProduct() {
    const [formData, setFormData] = useState([])
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setFormData({
            userEmail: user?.primaryEmailAddress?.emailAddress
        })
    }, [user])

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const handleProductButtonClick = async () => {

        // Need to add validation for all fields
        // Return back to Form if any prefilled value and error

        setLoading(true)
        console.log(formData)
        const formDataObj = new FormData()
        formDataObj.append('image', formData.image)
        formDataObj.append('file', formData.file)
        formDataObj.append('data', JSON.stringify(formData))
        const result = await axios.post('api/products', formDataObj, {
            headers: {
                'Content-Type': 'multiport/form-data' // Passing JSON Data along woth Files and Images
            }
        })
        setLoading(false)
        if (result?.data?.success) {
            router.push('/dashboard')
        } else {
            console.log(result?.data?.error)
        }
    }

    return (
        <div className='mt-10'>
            <h2 className='text-3xl font-bold'>Add New Product</h2>
            <p>Start adding product details to sell your item</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>

                {/* Left Section */ }
                <div className='flex flex-col gap-5'>
                    <ImageUpload onImageSelect={ (e) => handleInputChange(e.target.name, e.target.files[0]) } />
                    <div>
                        <h4>Upload file which you want to Sell <span className='text-red-500'>*</span></h4>
                        <Input
                            type='file' name='file' className='cursor-pointer' accept=".pdf,.txt,.doc,.docx"
                            onChange={ (e) => handleInputChange(e.target.name, e.target.files[0]) }
                        />
                    </div>
                    <div>
                        <h4>Message to User</h4>
                        <Textarea
                            name='message' placeholder='Write Thank You Message to User.'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                </div>

                {/* Right Section */ }
                <div className='flex flex-col gap-5'>
                    <div>
                        <h4>Product Title <span className='text-red-500'>*</span></h4>
                        <Input
                            name='title' placeholder='Ex.UI Kit in Figma'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                    <div>
                        <h4>Price (in $) <span className='text-red-500'>*</span></h4>
                        <Input
                            type='number' min='0' name='price' placeholder='Ex.99, 199'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                    <div>
                        <h4>Category <span className='text-red-500'>*</span></h4>
                        <Select onValueChange={ (value) => handleInputChange('category', value) } >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                { ProductCategory.map((category, index) => (
                                    <SelectItem key={ index } value={ category }>{ category }</SelectItem>
                                )) }
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <h4>Description <span className='text-red-500'>*</span></h4>
                        <Textarea
                            name='description' placeholder='Add Product Description'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                    <div>
                        <h4>About Product (Optional)</h4>
                        <Textarea
                            name='about' placeholder='Add Product Information'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                    <Button onClick={ handleProductButtonClick } disabled={ loading }>
                        { loading ? <Loader2Icon className='animate-spin' /> : 'Add Product' }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct