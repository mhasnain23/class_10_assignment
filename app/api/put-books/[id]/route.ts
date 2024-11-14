import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Books from "@/models/books";
import mongoose from "mongoose";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const body = await request.json();

        // Connect to database first to reduce connection overhead
        await connectToDB();

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid book ID format" },
                { status: 400 }
            );
        }

        // Validate request body
        const { title, author, name, isAvailable, image } = body;
        if (!title && !author && !name) {
            return NextResponse.json(
                { error: "Required fields missing" },
                { status: 400 }
            );
        }

        // Update all fields at once instead of selective updates
        const updatedBook = await Books.findByIdAndUpdate(
            id,
            {
                title,
                author,
                name,
                isAvailable,
                image,
            },
            {
                new: true,
                runValidators: true,
                lean: true // Add lean() for better performance
            }
        );

        if (!updatedBook) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Book updated successfully",
            data: updatedBook
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating book:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 