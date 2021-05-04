const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Categories = require("../../models/categories");

router.get("/:type", auth, async (req, res) => {
  try {
    console.log("type", req.params.type);
    let catagories = await Categories.find({
      type: req.params.type,
    });
    return res.json({ catagories, msg: "catagories get Successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});
router.post("/add", auth, async (req, res) => {
  try {
    const title = req.body.title;
    const type = req.body.type;
    let category = await Categories.findOne({ title: title, type: type });
    if (!category) {
      let category = new Categories({ title, type });
      await category.save();
      return res.json({ category, msg: "Category added Successfully" });
    }
    return res.json({ msg: "Category already exist Successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
