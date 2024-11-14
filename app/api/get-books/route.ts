import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Books from "@/models/books";

export async function GET() {
    try {
        await connectToDB();

        const books = await Books.find({})
            .lean()
            .select('title author name image isAvailable')
            .exec();

        return NextResponse.json({
            message: "Books fetched successfully",
            data: books
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}