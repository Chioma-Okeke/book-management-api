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
    const paramId = req.params.id;
    try {
        const user = await userModel.findById(paramId);
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }
        const newBook = new bookModel({ ...req.body, userId: paramId });
        const createdBook = await newBook.save();
        user.publications.push(createdBook._id);
        await user.save();
        res.status(200).json({ createdBook });
    } catch (error) {
        next(error);
    }
}

async function update_A_book(req, res, next) {
    const { id } = req.params;
    const update = req.body;
    try {
        const bookUpdated = await bookModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });
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
