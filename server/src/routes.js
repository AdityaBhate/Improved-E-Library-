import express from "express"
import multer from "multer"
import {
    UserSignup,
    UserLogin,
    getUser
} from "./controllers/userContorller.js"

import {
    uploadBook,
    downloadBook,
    searchContent,
    getBooks,
    deleteBook
} from "./controllers/bookController.js"

const upload = multer({
    dest: "uploads"
});

const router = express.Router();
//auth routes
router.post("/user/signup", UserSignup);
router.post("/user/login", UserLogin);
router.get("/user/:id", getUser);

//file routes
router.get("/content/all")
router.post("/content/upload", upload.single("file"), uploadBook)
router.get("/file/:id", downloadBook).post("/file/:id", downloadBook);
router.get("/delete/:id", deleteBook)
// app.route("/file/:id").get(handleDownload).post(handleDownload);
//search routes
router.get("/search", searchContent)

export default router;