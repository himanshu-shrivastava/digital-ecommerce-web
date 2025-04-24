"use client"

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { ProductCategory } from '@/app/constants'
import { Button } from '@/components/ui/button'
import ImageUpload from './_components/ImageUpload'

function AddProduct() {

    const [formData, setFormData] = useState([])

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const handleProductButtonClick = () => {
        console.log('formData', formData)
        //Validate the input Data
        //Upload Images to Cloud and generate Image Url
        //Upload file to Cloud and generate file Url
        //Save Form data along with image url and file url to DB
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
                        <h4>Upload file which you want to Sell</h4>
                        <Input
                            type='file' name='file' className='cursor-pointer'
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
                        <h4>Product Title</h4>
                        <Input
                            name='title' placeholder='Ex.UI Kit in Figma'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                    <div>
                        <h4>Price (in $)</h4>
                        <Input
                            type='number' min='0' name='price' placeholder='Ex.99, 199'
                            onChange={ (e) => handleInputChange(e.target.name, e.target.value) }
                        />
                    </div>
                    <div>
                        <h4>Category</h4>
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
                        <h4>Description</h4>
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
                    {/* <div> */ }
                    <Button onClick={ handleProductButtonClick }>Add Product</Button>
                    {/* </div> */ }
                </div>
            </div>
        </div>
    )
}

export default AddProduct