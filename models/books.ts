import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title: String,
    author: String,
    name: String,
})

const Books = mongoose.models.Books || mongoose.model("booksSchema", booksSchema)
export default Books