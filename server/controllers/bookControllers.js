const db = require("../models");
const book = db.Book;
const { Op } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    try {
      const { title, author, category, synopsis, cover, year, publisher } = req.body;

      if (!title & !author & !category & !synopsis & !cover & !year & !publisher)
        throw "Insert data is not complete";

      const data = await book.create({
        title,
        author,
        category,
        synopsis,
        cover,
        year,
        publisher,
      });
      res.status(200).send({ massage: "Book Added", data });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await book.findAll({
        attributes: ["title", "author", "category", "synopsis", "cover", "year", "publisher"],
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getBy: async (req, res) => {
    try {
      const { category, author } = req.query;

      // console.log(title);

      const user = await book.findAll({
        where: {
          [Op.or]: {
            author: author ? author : "",
            category: category ? category : "",
          },
        },
        raw: true,
      });
      // console.log(user);

      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);

      await book.destroy({
        where: {
          id,
        },
      });
      res.status(200).send("Book deleted");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { title, author, category, synopsis, cover, year, publisher, id } = req.body;

      await book.update(
        {
          title,
          author,
          category,
          synopsis,
          cover,
          year,
          publisher,
        },
        { where: { id } }
      );
      res.status(200).send("Book Updated");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  searchBy: async (req, res) => {
    try {
      const { title, author } = req.query;
      const result = await book.findAll({
        where: {
          [Op.or]: {
            title: {
              [Op.like]: `%${title}%`,
            },
            author: {
              [Op.like]: `%${author}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const result = await book.findAll({
        order: [[data, order]],
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  
};
