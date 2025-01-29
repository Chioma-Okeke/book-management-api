const { Router } = require("express");
const {
    get_A_books,
    get_All_books,
    publish_A_book,
    update_A_book,
    delete_A_book,
} = require("../controller/bookController");
const authMiddleware = require("../Middleware/authMiddleware");

const router = Router()
    .get("/book/:id", authMiddleware, get_A_books)
    .get("/books", authMiddleware, get_All_books)

    .post("/book/", authMiddleware, publish_A_book)
    .put("/book/:id", authMiddleware, update_A_book)

    .delete("/book/:id", authMiddleware, delete_A_book);

module.exports = router;
