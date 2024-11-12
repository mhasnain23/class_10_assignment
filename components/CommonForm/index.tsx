"use client";

import { initialBooksFormData } from '@/utils';
import React, { ChangeEvent, FormEventHandler, useState } from 'react';

const BookForm = () => {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        name: ''
    });
    // const [booksLocalStorage, setBooksLocalStorage] = useState(initialBooksFormData)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await fetch('/api/post-books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            // Optionally reset the form or handle success
            setBookData({
                title: '',
                author: '',
                name: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const getDataFromLocalStorage = () => {
    //     const booksLocalStorage = localStorage.getItem("booksdata")

    // }


    return (
        <div className='mt-[3rem]'>
            <form onSubmit={handleSubmit} className='flex items-center gap-10 h-20 max-w-6xl mx-auto bg-white/20 backdrop-blur-[15px] rounded-md px-7'>
                <div className='w-full'>
                    <input
                        className='w-full border-none rounded-lg py-1 bg-gray-300 placeholder:text-black/50 text-[13px font-semibold'
                        type="text"
                        name="title"
                        placeholder='Title'
                        value={bookData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='w-full'>
                    <input
                        className='w-full border-none rounded-lg py-1 bg-gray-300 placeholder:text-black/50 text-[13px font-semibold'
                        type="text"
                        name="author"
                        placeholder='Author'
                        value={bookData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='w-full'>
                    <input
                        className='w-full border-none rounded-lg py-1 bg-gray-300 placeholder:text-black/50 text-[13px font-semibold'
                        name="name"
                        placeholder='Name'
                        value={bookData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='bg-blue-600 text-white/80 text-[13px] font-semibold tracking-tight flex px-6 py-1.5 rounded-lg hover:bg-blue-700 hover:text-white/50 transition-all ease-in duration-[0.2s]'>Submit</button>
            </form>
        </div>
    );
};

export default BookForm;