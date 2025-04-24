import { db } from "@/configs/db"
import { storage } from "@/configs/firebaseConfig"
import { productsTable } from "@/configs/schema"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { NextResponse } from "next/server"

export async function POST(req) {

    // get FormData (Fields, Files)
    const formData = await req.formData()
    console.log('formData', formData)
    const image = formData.get('image')
    const file = formData.get('file')
    const data = JSON.parse(formData.get('data'))

    /* Cloudinary - save images/files */
    // const arrayBuffer = await image.arrayBuffer()
    // const buffer = new Uint8Array(arrayBuffer)
    // const uploadResponse = await cloudinary.uploader.upload_stream({
    //     folder: 'retro-digital-e-commerce',
    //     use_filename: true,
    //     resource_type: 'image',
    // }).end(image)
    // console.log('uploadResponse', uploadResponse)

    // Save Product Image to DB
    const imageName = Date.now() + '.png'
    const storageImageRef = ref(storage, 'images/' + imageName)
    await uploadBytes(storageImageRef, image).then(snapshot => {
        console.log('Image Uploaded')
    })
    const imageUrl = await getDownloadURL(storageImageRef) ?? ''

    // Save Product File to DB
    const fileName = Date.now().toString()
    const storageFileRef = ref(storage, 'files/' + fileName)
    await uploadBytes(storageFileRef, file).then(snapshot => {
        console.log('File Uploaded')
    })
    const fileurl = await getDownloadURL(storageFileRef) ?? ''

    // Save Data to Database
    const db_insert = await db.insert(productsTable).values({
        title: data?.title,
        price: data?.price,
        description: data?.description,
        about: data?.about,
        category: data?.category,
        imageUrl: imageUrl,
        fileUrl: fileurl,
        message: data?.message,
        createdBy: data?.userEmail
    }).returning(productsTable)

    if (db_insert?.length > 0) {
        return NextResponse.json(db_insert[0])
    } else {
        return NextResponse.json({ 'error': 'Server Error, Please Try Again.' })
    }
}