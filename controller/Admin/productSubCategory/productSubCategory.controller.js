
const { con } = require("../../../modal/modal");



module.exports={productsubcgtget: async (req, res) => {
  try {
    const data = "SELECT *from productSubCategory";
    await con.query(data, (err, result) => {
      if (err) {
        return res.send({ error: err.sqlMessage });
      }
      res.json({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ Error: err.message });
  }},

productsubcgtpost: async (req, res) => {
  try {
    const data = req.body;
    const q1 = "INSERT into productSubCategory SET ?";
    await con.query(q1, data, (err, result) => {
      if (err) {
        return res.send({ error: err.sqlMessage });
      }
      res.json({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ Error: err.message });
  }},


productsubcgtupdate: async (req, res) => {
  try {
    const data = req.body;
    const id=req.params.cid;
    const q1 = "UPDATE  productSubCategory SET ? where cid = ?";

    await con.query(q1, [data, id], (err, result) => {
      if (err) {
        return res.send({ error: err.sqlMessage });
      }
      res.json({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ Error: err.message });
  }},


productsubcgtdelete :async (req, res) => {
  try {
    const cid = req.params.cid;
    const q1 = "DELETE from productSubCategory where cid = ?";
    await con.query(q1, cid, (err, result) => {
      if (err) {
        return res.send({ error: err.sqlMessage });
      }
      res.json({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ Error: err.message });
  }},

};