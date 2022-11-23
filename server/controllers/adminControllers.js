const db = require("../models");
const bcrypt = require("bcrypt");
const admin = db.Admin;
const jwt = require("jsonwebtoken");
const transporter = require("../helper/transporter");
const {Op}= require("sequelize")

module.exports = {
registerAdmin: async (req, res) => {
    try {
      const {  username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      
      const data = await admin.create({
        username,
        email,
        password: hashPass,
      });      
      
      const token = jwt.sign({username: data.username }, "z1x2c3v4b5");
      res.status(200).send({data, token});
    } catch (err) {
      res.status(400).send(err);
    }
  },

  loginAdmin : async (req, res)=>{
    try {
      const { username, password } = req.body;

      const isAdminExist = await admin.findOne({
        where: {
           username: username ? username : "",
        },
        raw: true,
      });
      if (!isAdminExist) throw "Admin not found!";


      const token = jwt.sign({username: isAdminExist.username}, "z1x2c3v4b5");
      const isValid = await bcrypt.compare(password, isAdminExist.password);
      
      if (!isValid) {
        throw `Wrong Password!`;
      }
      
      res.status(200).send({
        token,
        isAdminExist,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};