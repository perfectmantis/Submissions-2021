const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Inventory = require("../../models/Inventory");
const { check, validationResult } = require("express-validator");

// @route   POST api/inventory/add
// @desc    Add New Inventory
// @access  private
router.post(
    "/add",
    [
        check("product", "Product Name Required").not().isEmpty(),
        check("quantity", "Quantity Required").not().isEmpty(),
    ],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array() });
        }

        try {
            let inventory = new Inventory(req.body);

            await inventory.save();
            res
                .status(200)
                .json({ msg: "New Inventory Added Successfully" });
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server error");
        }
    }
);

// @route   GET api/inventory
// @desc    Get all inventory
// @access  Private
router.get("/", 
auth,
    async (req, res) => {
        try {
            const inventory = await Inventory.find();
            res
                .status(200)
                .json(inventory);
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server Error!");
        }
    });

// @route  GET  api/inventory/:id
// @desc   Get Product by id
// @access Private
router.get("/:id",auth, 
    async (req, res) => {
        try {
            const inventory = await Inventory.findById(req.params.id);

            if (!inventory) {
                return res
                    .status(404)
                    .json({ msg: "No Inventory found" });
            }

            res.json(inventory);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Inventory found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

// @route  DELETE  api/inventory/:id
// @desc   Delete a Product
// @access Private
router.delete("/:id",auth,
    async (req, res) => {
        try {
            const inventory = await Inventory.findById(req.params.id);

            if (!inventory) {
                return res
                    .status(404)
                    .json({ msg: "No Inventory found" });
            }

            await inventory.remove();

            res
                .status(200)
                .json({ msg: "Inventory Successfully Removed" });
        } catch (err) {
            console.error(err.message);
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Inventory found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

module.exports = router;
