const err = (error, req, res, next) => {
    const status = error.status || 500;
    // const message = error.message || "Internal sever error";
    return res.status(status).json({ success: false, status});
};

module.exports = err;
