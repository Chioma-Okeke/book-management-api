const { Router } = require("express");
const {
    get_A_books,
    get_All_books,
    publish_A_book,
    update_A_book,
    delete_A_book,
} = require("../controller/bookController");

const router = Router();

router.get("/book/:id", get_A_books);
router.get("/books", get_All_books);

router.post("/book/:id", publish_A_book);
router.put("/book/:id", update_A_book);

router.delete("/book/:id", delete_A_book);

module.exports = router;
