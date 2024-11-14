import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title: { type: String, index: true },
    author: { type: String, index: true },
    name: { type: String, index: true },
    image: String,
    isAvailable: {
        type: Boolean,
        required: true,
        index: true
    }
}, {
    timestamps: true
});

booksSchema.index({ author: 1, title: 1 });

const Books = mongoose.models.Books || mongoose.model("Books", booksSchema)
export default Books