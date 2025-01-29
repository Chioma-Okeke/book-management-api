const bookModel = require("../model/bookModel");
const userModel = require("../model/userModel");

const get_All_books = async (req, res, next) => {
    try {
        const returnedBooks = await bookModel.find();
        res.status(200).json(returnedBooks);
    } catch (error) {
        next(error);
    }
};

const get_A_books = async (req, res, next) => {
    const { id } = req.params;
    try {
        const returnedBook = await bookModel.findById(id);
        if (!returnedBook) {
            throw new Error({ status: 404 });
        }
        res.status(200).json({ returnedBook });
    } catch (error) {
        next({ status: 404 });
    }
};

async function publish_A_book(req, res, next) {
    const userId = req.user;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ msg: "You need to login to publish a book" });
        }

        const newBook = new bookModel({ ...req.body, userId: userId._id });
        const createdBook = await newBook.save();
        user.publications.push(createdBook._id);
        await user.save();
        res.status(200).json({ createdBook });
    } catch (error) {
        next(error);
    }
}

async function update_A_book(req, res, next) {
    const userInfo = req.user;
    const update = req.body;
    const { id } = req.params;

    if (!userInfo.publications.includes(id)) {
        return res
            .status(401)
            .json({ msg: "You can only edit books created by you" });
    }
    try {
        const bookUpdated = await bookModel.findByIdAndUpdate(
            id,
            update,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!bookUpdated) {
            throw new Error({ status: 404 });
        }
        res.status(200).json(bookUpdated);
    } catch (error) {
        next({ status: 404 });
    }
}

async function delete_A_book(req, res, next) {
    const { id } = req.params;
    const userInfo = req.user

    if (!userInfo.publications.includes(id)) {
        return res.status(401).json({msg: "You can only delete books created by you"})
    }
    
    try {
        await bookModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Book deleted" });
    } catch (error) {
        next({ status: 404 });
    }
}

module.exports = {
    get_A_books,
    get_All_books,
    publish_A_book,
    update_A_book,
    delete_A_book,
};
