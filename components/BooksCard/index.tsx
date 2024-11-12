import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const BooksCard = () => {

    // const name = "hello"

    return (
        <div className='w-full h-full relative'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <Card className='flex items-center justify-center'>
                    <CardContent className='flex flex-col gap-3'>
                        <CardHeader>
                            <h2 className='text-xl font-bold'>Book 1</h2>
                        </CardHeader>
                        <CardTitle>
                            <h3 className='text-lg font-semibold'>Title 1</h3>
                        </CardTitle>
                        <CardDescription>
                            <h3 className='text-md font-semibold'>rich dad</h3>
                        </CardDescription>
                        <CardFooter className='flex gap-20'>
                            <button className='bg-green-600 hover:bg-green-700 hover:text-white/60 text-white/90 rounded-lg flex px-5 py-1.5 transition-all ease-in duration-[0.2s]'>Edit</button>
                            <button className='bg-red-600 hover:bg-red-700 hover:text-white/60 text-white/90 rounded-lg flex px-5 py-1.5 transition-all ease-in duration-[0.2s]'>delete</button>
                        </CardFooter>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default BooksCard
