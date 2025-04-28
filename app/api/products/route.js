import { NextResponse } from "next/server"
import { and, desc, eq, getTableColumns, ne } from "drizzle-orm"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

import cloudinary from "@/configs/cloudinary"
import { db } from "@/configs/db"
import { storage } from "@/configs/firebaseConfig"
import { productsTable, usersTable } from "@/configs/schema"
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req) {

    /* Get FormData (Fields and Files) */
    const formData = await req.formData()
    const image = formData.get('image')
    const file = formData.get('file')
    const data = JSON.parse(formData.get('data'))

    const isImageUploaded = (image !== 'undefined')
    const isFileUploaded = (file !== 'undefined')

    try {
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
            } else {
                /* Upload Image to Cloud */
                const storageImageRef = ref(storage, 'digi-ecommerce/images/' + imageName + '.png')
                await uploadBytes(storageImageRef, image).then(snapshot => {
                    console.log('Image Uploaded')
                })
                imageUrl = await getDownloadURL(storageImageRef) ?? ''

                /* Upload File to Cloud */
                const storageFileRef = ref(storage, 'digi-ecommerce/files/' + fileName.toString())
                await uploadBytes(storageFileRef, file).then(snapshot => {
                    console.log('File Uploaded')
                })
                fileUrl = await getDownloadURL(storageFileRef) ?? ''
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
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const email = searchParams.get('email')
        const limit = searchParams.get('limit') ?? 9
        const productId = searchParams.get('productId') ?? 0
        const category = searchParams.get('category') ?? ''

        let db_select = []
        if (email) {
            db_select = await db.select({
                ...getTableColumns(productsTable),
                user: {
                    name: usersTable.name,
                    image: usersTable.image
                }
            }).from(productsTable)
                .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
                .where(and(
                    eq(productsTable.createdBy, email),
                    eq(productsTable.is_deleted, false)
                ))
                .orderBy(desc(productsTable.id))
        }
        else if (category && productId) {
            db_select = await db.select({
                ...getTableColumns(productsTable),
                user: {
                    name: usersTable.name,
                    image: usersTable.image
                }
            }).from(productsTable)
                .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
                .where(and(
                    eq(productsTable.category, category),
                    ne(productsTable.id, productId),
                    eq(productsTable.is_deleted, false),
                ))
        }
        else if (productId) {
            db_select = await db.select({
                ...getTableColumns(productsTable),
                user: {
                    name: usersTable.name,
                    image: usersTable.image
                }
            }).from(productsTable)
                .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
                .where(eq(productsTable.id, productId))
        }
        else {
            db_select = await db.select({
                ...getTableColumns(productsTable),
                user: {
                    name: usersTable.name,
                    image: usersTable.image
                }
            }).from(productsTable)
                .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
                .orderBy(desc(productsTable.id))
                .limit(Number(limit))
        }
        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'No Record(s) Found.' })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}

export async function DELETE(req) {
    try {
        const user = await currentUser()
        const { searchParams } = new URL(req.url)
        const productId = searchParams.get('productId')

        /* Hard Delete */
        // const db_query = await db.delete(productsTable)
        //     .where(and(
        //         eq(productsTable.id, Number(productId)),
        //         eq(productsTable.createdBy, user?.primaryEmailAddress?.emailAddress)
        //     ))
        //     .returning({ deletedId: productsTable.id })

        /* Soft Delete */
        const db_query = await db.update(productsTable)
            .set({ is_deleted: true })
            .where(and(
                eq(productsTable.id, Number(productId)),
                eq(productsTable.createdBy, user?.primaryEmailAddress?.emailAddress)
            ))
            .returning({ updatedId: productsTable.id })

        if (db_query) {
            return NextResponse.json({ 'success': db_query })
        } else {
            return NextResponse.json({ 'error': 'No record found for deletion' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}