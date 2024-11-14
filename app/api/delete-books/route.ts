import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Books from "@/models/books";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest) {
    try {
        // Get bookId from searchParams
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

        // Connect to database
        await connectToDB();

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

        // Delete the book
        const deletedBook = await Books.findByIdAndDelete(bookId);

        return NextResponse.json(
            {
                success: true,
                message: "Book deleted successfully",
                data: deletedBook,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Delete book error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        );
    }
} 