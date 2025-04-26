import React, { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { SortingOptions } from '../constants'

function SortProducts({ onSortChange }) {

    const [selectedSortOption, setSelectedSortOption] = useState('')

    return (
        <div>
            <Select
                onValueChange={ (value) => {
                    onSortChange(value)
                    setSelectedSortOption(value)
                } }
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By">
                        { selectedSortOption?.label || 'Sort By' }
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    { SortingOptions.map((option, index) => (
                        <SelectItem key={ index } value={ option }>{ option.label }</SelectItem>
                    )) }
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortProducts