const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RentedProduct = require("../../models/RentedProducts");
const Customer = require("../../models/Customer");
const { check, validationResult } = require("express-validator");
const shortid = require("shortid");
const moment = require("moment");




// @route  GET api/returnproducts/searchbyContactNumber
// @desc   Get Order by Customer number
// @access Private
router.get('/searchbyContactNumber',
     auth,
    async (req, res) => {
        try {

            const result = await RentedProduct.find({
                customerContactNumber: { $eq: req.query.number }
            }).populate("customer",{name:1,contactnumber:1})
            .sort({ rentDate:1 })
            if (result == null) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            if (!result ) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            return res.json(result);

        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });

    // @route  GET api/returnproducts/searchbyContactNumber
// @desc   Get Order by Customer number
// @access Private
router.post('/:contact/:date/pending',
auth,
async (req, res) => {
   try {
       var now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7);
    const yesterday = new Date(
      now.getFullYear()-1,
      now.getMonth(),
      now.getDate()
    );
    const result = await RentedProduct.find({
      customerContactNumber: { $eq: req.params.contact },
      status: { $in: "pending" },
      rentDate: { $gte: yesterday, $lte: today },
    }).sort({ rentDate: 1 });


       if (result == null) {
           return res
               .status(404)
               .json({ msg: "No Order found" });
       }
       if (!result ) {
           return res
               .status(404)
               .json({ msg: "No Order found" });
       }
       return res.json(result);

   } catch (err) {
       console.error(err.message);
       // Check if id is not valid
       if (err.kind === "ObjectId") {
           return res
               .status(404)
               .json({ msg: "No Order found" });
       }
       res
           .status(500)
           .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
   }
});

    // @route  GET api/returnproducts/searchbyOrderNumber
// @desc   Get Order by Customer number
// @access Private
router.get('/searchbyOrderNumber',
auth,
async (req, res) => {
   try {
       const result = await RentedProduct.find({
           orderNumber: { $eq: req.query.orderNumber }
       }).populate("customer",{name:1,contactnumber:1})
       if (!result) {
           return res
               .status(404)
               .json({ msg: "No Order found" });
       }
       return res.json(result);

   } catch (err) {
       // Check if id is not valid
       if (err.kind === "ObjectId") {
           return res
               .status(404)
               .json({ msg: "No Order found" });
       }
       res
           .status(500)
           .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
   }
});

// @route  GET api/returnproducts/:id
// @desc   Get Order by id
// @access Private
router.get("/:id", auth,
    async (req, res) => {
        try {
            const customer = await RentedProduct.findById(req.params.id);

            if (!customer) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }

            res.json(customer);
        } catch (err) {
            console.error(err.message);
            // Check if id is not valid
            if (err.kind === "ObjectId") {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
            res
                .status(500)
                .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
        }
    });



module.exports = router;
