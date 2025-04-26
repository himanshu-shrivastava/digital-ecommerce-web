import cloudinary from "@/configs/cloudinary"
import { db } from "@/configs/db"
import { storage } from "@/configs/firebaseConfig"
import { productsTable, usersTable } from "@/configs/schema"
import { desc, eq, getTableColumns } from "drizzle-orm"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { NextResponse } from "next/server"

export async function POST(req) {

    /* Get FormData (Fields and Files) */
    const formData = await req.formData()
    const image = formData.get('image')
    const file = formData.get('file')
    const data = JSON.parse(formData.get('data'))

    const isImageUploaded = (image !== 'undefined')
    const isFileUploaded = (file !== 'undefined')

    if (isImageUploaded && isFileUploaded && data.title && data.price && data.category && data.description) {
        const fileNameExt = file.name.split('.').pop()
        let imageName = Date.now() + '-' + (image.name).split('.')[0]
        let fileName = Date.now() + '-' + (file.name).split('.')[0]
        let imageUrl = null
        let fileUrl = null

        if (process.env.NEXT_PUBLIC_CLOUD_FOR_UPLOAD === 'cloudinary') {
            /* Upload Image to Cloud */
            const arrayBufferImage = await image.arrayBuffer()
            const bufferImage = Buffer.from(arrayBufferImage).toString('base64')
            const base64Image = 'data:' + image.type + ';base64,' + bufferImage
            const uploadImageResponse = await cloudinary.uploader.upload(base64Image, {
                folder: 'retro-digi-ecommerce/images',
                public_id: imageName,
                resource_type: 'image'
            })
            imageUrl = uploadImageResponse.secure_url ?? null
            console.log('imageUrl', imageUrl)

            /* Upload File to Cloud */
            const arrayBufferFile = await file.arrayBuffer()
            const bufferFile = Buffer.from(arrayBufferFile).toString('base64')
            const base64File = 'data:' + file.type + ';base64,' + bufferFile
            const uploadFileResponse = await cloudinary.uploader.upload(base64File, {
                folder: 'retro-digi-ecommerce/files',
                public_id: fileName + (fileNameExt !== 'pdf' ? '.' + fileNameExt : ''),
                resource_type: 'auto'
            })
            fileUrl = uploadFileResponse.secure_url ?? null
            console.log('fileUrl', fileUrl)
        } else {
            /* Upload Image to Cloud */
            const storageImageRef = ref(storage, 'digi-ecommerce/images/' + imageName + '.png')
            await uploadBytes(storageImageRef, image).then(snapshot => {
                console.log('Image Uploaded')
            })
            imageUrl = await getDownloadURL(storageImageRef) ?? ''
            console.log('imageUrl', imageUrl)

            /* Upload File to Cloud */
            const storageFileRef = ref(storage, 'digi-ecommerce/files/' + fileName.toString())
            await uploadBytes(storageFileRef, file).then(snapshot => {
                console.log('File Uploaded')
            })
            fileUrl = await getDownloadURL(storageFileRef) ?? ''
            console.log('fileUrl', fileUrl)
        }

        /* Save Data to Database */
        const db_insert = await db.insert(productsTable).values({
            imageUrl: imageUrl,
            fileUrl: fileUrl,
            message: data?.message ?? '',
            title: data?.title,
            price: data?.price,
            category: data?.category,
            description: data?.description,
            about: data?.about,
            createdBy: data?.userEmail
        }).returning(productsTable)

        if (db_insert?.length > 0) {
            return NextResponse.json({ 'success': db_insert[0] })
        } else {
            return NextResponse.json({ 'error': 'Server Error, Please Try Again.' })
        }
    } else {
        return NextResponse.json({ 'error': 'Required fields should not be empty.' })
    }
}

export async function GET(req) {

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (email !== 'undefined') {
        const db_select = await db.select({
            ...getTableColumns(productsTable),
            user: {
                name: usersTable.name,
                image: usersTable.image
            }
        }).from(productsTable)
            .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
            .where(eq(productsTable.createdBy, email))
            .orderBy(desc(productsTable.id))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'Server Error:, Please reload the page again.' })
        }
    } else {
        return NextResponse.json({ 'error': 'Invalid Request' })
    }
}