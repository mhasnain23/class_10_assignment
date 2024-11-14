import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Books from "@/models/books";
import mongoose from "mongoose";

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const bookId = request.nextUrl.searchParams.get("bookId");

        if (!bookId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book ID is required"
                },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDB();

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid book ID format"
                },
                { status: 400 }
            );
        }

        // Check if book exists
        const existingBook = await Books.findById(bookId);
        if (!existingBook) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book not found"
                },
                { status: 404 }
            );
        }

        // Update the book
        const updatedBook = await Books.findByIdAndUpdate(
            bookId,
            { $set: body },
            {
                new: true,
                runValidators: true
            }
        );

        return NextResponse.json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating book:", error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Failed to update book"
            },
            { status: 500 }
        );
    }
} 