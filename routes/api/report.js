const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const  RentedProduct= require("../../models/RentedProducts");
const  Appointments= require("../../models/Appointments");
const moment = require("moment")



// @route  GET api/reports/searchbyDate/:start/:end
// @desc   Get Report (Search for Report by custom date range )
// @access Private
// router.get("/searchbyorderDate/:start/:end",
//     auth,
//     async (req, res) => {
//         console.log(req.params)

//         start = req.params.start;
//         end = req.params.end;
//         try {
//             const order = await Order.find({
//                 orderDate: {
//                     $gte: start,
//                     $lte: end
//                 }
//             });
//             if (!order) {
//                 return res
//                     .status(404)
//                     .json({ msg: "No Order found" });
//             }

//             res
//                 .status(200)
//                 .json(order);
//         } catch (err) {
//             console.error(err.message);
//             // Check if id is not valid
//             if (err.kind === "ObjectId") {
//                 return res
//                     .status(404)
//                     .json({ msg: "No Order found" });
//             }
//             res
//                 .status(500)
//                 .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
//         }
//     });


// @route  GET api/reports
// @desc   Get Order (Search for Order by customer,user,custom date)
// @access Private
router.get('',
 auth,
    async (req, res) => {
        try {
            let result;
            // var gte = moment.utc(, 'DD-MM-YYYY');
            // var lte = moment.utc(, 'DD-MM-YYYY');
            if (req.query.reportType === "order") {
            const result = await RentedProduct.find({
                customer: { $eq: req.query.customer },
                user: { $eq: req.query.user },
                deliveryDate: { $gte:(req.query.start), $lte:(req.query.end) }

            }).populate("customer").populate("product").populate("user");
            return res.json(result);

       }
       else if (req.query.reportType === "appointment") {
             result = await Appointments.find({
                customer: { $eq: req.query.customer },
                user: { $eq: req.query.user },
                start: { $gte: req.query.start, $lte: req.query.end }
            }).populate("customer").populate("user")
            return res.json(result);

        }

            if (!result) {
                return res
                    .status(404)
                    .json({ msg: "No Order found" });
            }
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
