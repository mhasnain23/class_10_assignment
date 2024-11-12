import connectToDB from "@/database";
import Books from "@/models/books";
import { NextApiRequest, NextApiResponse } from "next";

// function saveToLocalStorage(data: any) {
//     if (typeof window !== "undefined") {
//         localStorage.setItem("data", JSON.stringify(data));
//     } else {
//         console.error("localStorage is not available.");
//     }
// }

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDB();

        const { name, author, title } = await req.body

        console.log(name, author, title);


        // Check if all fields are filled
        if (!name || !author || !title) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            });
        }

        const result = await Books.create({ name, title, author })

        if (result) {
            return res.status(200).json({
                message: "Data saved successfully!",
                success: true,
            });
        } else {
            return res.status(500).json({ message: "something went wrong!" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}