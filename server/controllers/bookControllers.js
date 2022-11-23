const db = require("../models");
const book = db.Book;

module.exports = {
  create: async (req, res) => {
    try {
      const { title, author, category, synopsis, cover } = req.body;

      if (!title & !author & !category & !synopsis & !cover)
        throw "Insert data is not complete";

      await book.create({
        title,
        author,
        category,
        synopsis,
        cover,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  
};
