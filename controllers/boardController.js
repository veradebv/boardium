exports.getBoards = async (req, res) => {
    // use req.user (user ID from JWT)
    res.send('This will return all boards for the user');
};

exports.createBoard = async (req, res) => {
    res.send('This will create a new board');
};