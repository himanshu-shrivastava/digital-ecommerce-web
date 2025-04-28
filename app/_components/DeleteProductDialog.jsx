import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

function DeleteProductDialog({ children, DeleteProduct, deleting }) {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    { children }
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription asChild>
                            <div>
                                <h2>Do you really want to delete this product?</h2>
                                <div className='flex justify-end gap-5 mt-5'>
                                    <DialogClose asChild>
                                        <Button data-state='close'>Close</Button>
                                    </DialogClose>
                                    <Button disabled={ deleting } variant='destructive' onClick={ DeleteProduct }>Delete</Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteProductDialog