import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProductListing from './_components/UserProductListing'
import UserPurchaseHistory from './_components/UserPurchaseHistory'
import UserProductAnalytics from './_components/UserProductAnalytics'

function Dashboard() {
    return (
        <div className='mt-16'>
            <h2 className='font-bold text-2xl'>Dashboard</h2>
            <Tabs defaultValue="listing" className="mt-5">
                <TabsList>
                    <TabsTrigger value="listing">Listing</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="purchase">Purchase</TabsTrigger>
                </TabsList>
                <TabsContent value="listing">
                    <UserProductListing />
                </TabsContent>
                <TabsContent value="analytics">
                    <UserProductAnalytics />
                </TabsContent>
                <TabsContent value="purchase">
                    <UserPurchaseHistory />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Dashboard