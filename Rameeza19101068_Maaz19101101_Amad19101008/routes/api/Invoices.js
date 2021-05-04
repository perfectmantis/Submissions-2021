const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RentInvoice = require("../../models/Invoices");
const { check, validationResult } = require("express-validator");

// @route   POST api/invoices/add
// @desc    Add New Invoice
// @access  private
router.post(
    "/add",
    auth,
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array() });
        }

        try {
            let rentInvoice = new RentInvoice(req.body);
            await rentInvoice.save();
            res
                .status(200)
                .json({ msg: "Invoice Added Successfully" });
        } catch (err) {
            console.log(err);
            res
                .status(500)
                .send("Server error");
        }
    }
);


// @route   GET api/invoices
// @desc    Get all rentinvoices
// @access  Private
router.get("/", auth,
    async (req, res) => {
        try {
            const rentInvoices = await RentInvoice.find();
            res.json(rentInvoices);
        } catch (err) {
            console.log(err);
            res.statu(500).send("Server Error!");
        }
    });

// @route  GET api/nvoices/:id
// @desc   Get rentinvoices by id
// @access Private
router.get("/:id", auth,
    async (req, res) => {
        try {
            const rentInvoice = await RentInvoice.findById(req.params.id);

            if (!rentInvoice) {
                return res
                    .status(404)
                    .json({ msg: "No Invoice found" });
            }

            res.json(rentInvoice);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Invoice found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

 



module.exports = router;
