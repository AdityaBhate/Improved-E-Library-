import mongoose from "mongoose"

const BookSchema = mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    branch: {
        type: String
    },
    author: {
        type: String
    },

    uploadedBy: {
        type: String
    },
    originalName: {
        type: String
    },
    path: {
        type: String
    },
    downloadCount: {
        type: Number
    }
})

const BookModel = mongoose.model("BookModel", BookSchema)

export default BookModel