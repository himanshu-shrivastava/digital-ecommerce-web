"use client"

import Image from 'next/image'
import React, { useState } from 'react'

function ImageUpload({ onImageSelect }) {

    const [image, setImage] = useState()
    const handleFileChange = (event) => {
        onImageSelect(event)
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    }
    return (
        <div>
            <h4>Upload Product Image</h4>
            <input
                type='file' id='imageupload' name='image' className='hidden'
                onChange={ handleFileChange }
            />
            <label htmlFor='imageupload'>
                <div className='p-5 flex justify-center items-center cursor-pointer border-dashed border-2 border-black bg-slate-200'>
                    { image
                        ? <Image src={ image } alt='uploadedimage' width={ 250 } height={ 250 } className='object-contain h-[200px]' />
                        : <Image src={ '/uploadimage.png' } alt='uploadimage' width={ 70 } height={ 70 } className='opacity-50' />
                    }
                </div>
            </label>
        </div>
    )
}

export default ImageUpload