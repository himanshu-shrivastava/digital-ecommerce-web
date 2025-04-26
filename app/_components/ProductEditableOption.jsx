import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChartLine, GitGraph, PenBox, Trash2 } from 'lucide-react'

function ProductEditableOption({ children }) {
    return (
        <Popover>
            <PopoverTrigger>
                { children }
            </PopoverTrigger>
            <PopoverContent>
                <ul>
                    <li className='flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer'><PenBox /> Edit</li>
                    <li className='flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer'><ChartLine /> Analytics</li>
                    <li className='flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer text-red-600'><Trash2 /> Delete</li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export default ProductEditableOption