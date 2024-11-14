import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Books from "@/models/books";
import mongoose from "mongoose";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Validate if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid book ID format" },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDB();

        // Find and delete the book
        const deletedBook = await Books.findByIdAndDelete(id);

        // Check if book exists
        if (!deletedBook) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Book deleted successfully",
            data: deletedBook
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting book:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 