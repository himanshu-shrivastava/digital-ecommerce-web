import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartLine, PenBox, Trash2 } from 'lucide-react'
import DeleteProductDialog from './DeleteProductDialog'
import axios from 'axios'
import { toast } from 'sonner'

function ProductEditableOption({ children, product }) {

    const [deleting, setDeleting] = useState(false)
    const DeleteProduct = async () => {
        setDeleting(true)
        try {
            const remove_product = await axios.delete(`/api/products?productId=${product?.id}`)
            if (remove_product?.data?.success) {
                toast('Product is Deleted')
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            } else {
                console.log(remove_product?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                { children }
            </PopoverTrigger>
            <PopoverContent>
                <ul>
                    {/* <li className='flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer'><PenBox /> Edit</li> */ }
                    {/* <li className='flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer'><ChartLine /> Analytics</li> */ }
                    <DeleteProductDialog DeleteProduct={ DeleteProduct } deleting={ deleting }>
                        <li className='flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer text-red-600'>
                            <Trash2 /> Delete
                        </li>
                    </DeleteProductDialog>
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export default ProductEditableOption