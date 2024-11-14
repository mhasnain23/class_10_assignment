import connectToDB from "@/lib/db";
import Books from "@/models/books";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDB();
        const body = await req.json();
        const { name, author, title, isAvailable, image } = body;

        // Validate data before DB operation
        if (!name?.trim() || !author?.trim() || !title?.trim()) {
            return NextResponse.json({
                message: "Required fields are missing!",
                success: false
            }, { status: 400 });
        }

        // Use create with lean for better performance
        const result = await Books.create({
            name,
            title,
            author,
            isAvailable: isAvailable ?? true,
            image: image || ""
        });

        return NextResponse.json({
            message: "Data saved successfully!",
            success: true,
            data: result
        }, { status: 201 }); // Use 201 for resource creation

    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Internal server error",
            success: false
        }, { status: 500 });
    }
}