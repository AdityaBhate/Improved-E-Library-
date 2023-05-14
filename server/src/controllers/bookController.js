import BookModel from "../models/BookModel.js";
import fs from "fs"

export const getBooks = async (req, res) => {
    BookModel.find({}).then(function (users) {
        res.send(users);
    });
}

export async function deleteBook(req, res) {
    try {

        const document = await BookModel.findById(req.params.id);

        await document.remove();

        const currentPath = process.cwd()
        fs.unlink(`D:/Project/code/server/${document.path}`, (err) => {
            if (err) throw err;
            console.log(`File ${document.fileName} was deleted.`);
        });

        res.json({
            message: "Document and file deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete document and file"
        });
    }
}

export const uploadBook = async (req, res) => {
    const fileData = {
        name: req.body.name,
        path: req.file.path,
        originalName: req.file.name,
        category: req.body.category,
        branch: req.body.branch,
        uploadedBy: req.body.uploadedBy,
        author: req.body.author,
        downloadCount: 0,
    };
    try {
        const book = await BookModel.create(fileData);
        res.send("Success");
    } catch (error) {
        res.send(error)
    }
};

export const downloadBook = async (req, res) => {
    try {
        const file = await BookModel.findById(req.params.id);

        // file.downloadCount++;
        // await file.save();
        // console.log(file.downloadCount);

        res.download(file.path, file.originalName);
    } catch (error) {
        res.send(error)
    }
}

export const searchContent = async (req, res) => {

    if (req.cookies.User) {
        let category = req.query.category;
        let branch = req.query.branch;
        let name = req.query.name;
        let resData = await BookModel.find({
            "$or": [{
                name: {
                    $regex: name
                },
                branch: {
                    $regex: branch
                },
                category: {
                    $regex: category
                }
            }]
        })
        res.send(resData)
    } else {
        res.send({
            "Message": "User not authenticated"
        })
    }

}