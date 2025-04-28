import React, { useContext } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { CartContext } from '../_context/CartContext'
import CartItem from './CartItem'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function CartList({ children }) {

    const { cart } = useContext(CartContext)

    const calculateTotal = () => {
        let total = 0
        cart.forEach(item => {
            total += Number(item.price)
        })
        return total
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger>{ children }</SheetTrigger>
                <SheetContent className='z-[100]'>
                    <SheetHeader>
                        <SheetTitle>Cart ({ cart?.length })</SheetTitle>
                        <SheetDescription asChild>
                            { cart?.length > 0
                                ?
                                <div>
                                    <p>Your all cart items are listed here:</p>
                                    <div className='flex flex-col gap-2 mt-5'>
                                        {
                                            cart?.length > 0 && cart.map((product, index) => (
                                                <CartItem key={ index } product={ product } />
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <h2 className='flex font-bold text-2xl justify-between mt-10'>
                                            Total : <span>${ calculateTotal() }</span>
                                        </h2>
                                        <SheetClose asChild>
                                            <Link href={ '/checkout' }>
                                                <Button className='w-full mt-3'>Checkout</Button>
                                            </Link>
                                        </SheetClose>
                                    </div>
                                </div>
                                :
                                <div>
                                    <p className='mt-5'>Your cart is empty.</p>
                                    <SheetClose asChild>
                                        <Link href={ '/' }>
                                            <Button className='w-full mt-3'>Continue Shopping</Button>
                                        </Link>
                                    </SheetClose>
                                </div>
                            }
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default CartList