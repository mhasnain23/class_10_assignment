import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

// object of books
// let books = [
//     {
//         id: 1,
//         title: "herry potter",
//         author: "Jk Rowling",
//         available: true
//     },
// ]

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {

        return NextResponse.json({})

    } catch (error) {
        return NextResponse.json({ message: "something went wrong please try again!", error })
    }
}