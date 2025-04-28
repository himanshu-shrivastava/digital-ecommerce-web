import React from 'react'

function RouteLayout({ children }) {
    return (
        <div className='p-5 sm:px-10 md:px-30 lg:px-42'>
            { children }
        </div>
    )
}

export default RouteLayout