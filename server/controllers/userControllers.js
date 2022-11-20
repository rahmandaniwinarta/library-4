const db = require("../models");
const bcrypt = require("bcrypt");
const user = db.User;
const jwt = require("jsonwebtoken");
const transporter = require("../helper/transporter");

module.exports = {
  register: async (req, res) => {
    try {
      const { NIM, username, email, password } = req.body;

      // if (password !== confirmPassword)
      //   throw "one of the password is incorrect";

      if (password.length < 6) throw "Password minimal 6 character";

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        NIM,
        username,
        email,
        password: hashPass,
      });

      // console.log(data.id);

      const token = jwt.sign({ id: data.id }, "z1x2c3v4b5");

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Verification User",
        html: `<a href = "http://localhost:3000/verification/${token}" target = "_blank"> Click here to verifiy </a>`,
      });

      res.status(200).send("Register Success !");
    } catch (err) {
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { NIM, password } = req.body;

      const isUserExist = await db.User.findOne({
        where: {
          NIM: NIM ? NIM : "",
        },
        raw: true,
      });
      if (!isUserExist) throw "user not found!";

      const payload = { NIM: isUserExist.NIM, isAdmin: isUserExist.isAdmin };
      const token = jwt.sign(payload, "z1x2c3v4b5");

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) {
        throw `Wrong Password!`;
      }

      // console.log(token);
      res.status(200).send({
        token,
        isUserExist,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      console.log(req.user);
      const isUserExist = await db.User.findOne({
        where: {
          NIM: req.user.NIM,
        },
        raw: true,
      });

      res.status(200).send(isUserExist);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  verification: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
