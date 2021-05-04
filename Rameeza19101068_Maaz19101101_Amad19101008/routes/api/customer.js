const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Customer = require("../../models/Customer");
const { check, validationResult } = require("express-validator");
const RentedProducts = require("../../models/RentedProducts");
const mongoose = require("mongoose");
const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var moment = require("moment");

// @route   POST api/customer
// @desc    Authenticate Customer and get Token
// @access  Public
router.post(
  '/login',
  async (req, res) => {
    const { fullname, password } = req.body

    try {
      // check for existing user
      let customer = await Customer.findOne({ fullname })

      if (!customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Customer does not exists' }] })
      }
      const salt = await bcrypt.genSalt(10)
      const passwordEntered = await bcrypt.hash(password, salt)

      const isMatch = await bcrypt.compare(password, customer.password)

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] })
      }
      const payload = {
        customer: {
          id: customer._id,
          name: customer.fullname,
        },
      }

      jwt.sign(
        payload,
        config.get("jwtSecret_Customer"),
        { expiresIn: '1d' },

        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: [{ msg: 'Server error' }] })
    }
  }
)


// @route   POST api/customers/add
// @desc    Add New Customer
// @access  private
router.post(
  "/add",
  [
    check("name", "Customer Name Required").not().isEmpty(),
    check("address", "Address Required").not().isEmpty(),
    check("birthday", "Enter birth date.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      let body =req.body;
      // Check if email already exist.
      var password = ""
      if(body.password){
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(body.password, salt);
      }
      console.log("password",password)
      customerBody = {
        ...body,
        password: password 
      };
      let customer = new Customer(customerBody);
      await customer.save();
      res.status(200).json({ msg: "Customer Added Successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/customers/:id
//@desc      update customers.
router.post("/:id", async (req, res) => {
  try {
    let { name, birthday, online_account } = req.body;
    let { username } = { ...online_account };
    // now remove those key:items from the req.body with are not editable.
    if (name || birthday) {
      delete req.body["name"];
      delete req.body["birthday"];
      delete online_account["username"];
    }

    let customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).lean();

    if (!customer) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No customer found with this id." }] });
    }

    return res.status(200).json({ msg: "Customer updated successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route   GET api/customers
// @desc    Get all customers
// @access  Private
router.get("/",  async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.log(err);
    res.statu(500).send("Server Error!");
  }
});

// @route  GET api/customers/:id
// @desc   Get Customer by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "No Customer found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    // Check if id is not valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Customer found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  GET api/customer/:name
// @desc   Get Customer (Search for customer)
// @access Private
router.get("/search/:contactnumber",  async (req, res) => {
  try {
    const customer = await Customer.findOne({
      contactnumber: { $eq: req.params.contactnumber }
    });
    if (customer == null) {
      return status(404).json({ msg: "No Customer found" });
    }
    return res.status(200).json(customer);
  } catch (err) {
    console.error(err.message);
    // Check if id is not valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Customer found" });
    }
 return res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

//@route   GET api/customers/:contactnumber
//@desc    Get Customer through contact number
//@access  Private
router.get("/search/number/:contactnumber", auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      contactnumber: { $eq: req.params.contactnumber },
    });

    if (!customer) {
      return status(404).json({ msg: "No Customer found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err.message);

    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  DELETE api/customers/:id
// @desc   Delete a Customer
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: "No Customer found" });
    }

    await customer.remove();

    res.json({ msg: "Customer Successfully Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Customer found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  POST api/customers/insights
// @desc   Post customer insights
// @access Private

router.post("/:id/insights", auth, async (req, res) => {
  try {
    let { year, month, allTime } = { ...req.body };

    var startDate;
    var endDate;
    if (year) {
      //get year
      startDate = moment(year).format("YYYY-MM-DD");

      //make last date of the current year
      const lastDate = startDate.split("-");

      lastDate[1] = "12";
      lastDate[2] = "30";

      endDate = lastDate.join("-");
    }

    if (month) {
      startDate = moment(month).format("YYYY-MM-DD");
      // gets the last day of month , whether it is 29,30 or 31 automatically!
      endDate = moment(startDate).endOf("month").format(moment.HTML5_FMT.DATE);
    }

    if (allTime) {
      // Initial period is set to 2012 by client.
      startDate = moment("2012").format("YYYY-MM-DD");
      // Till current moment.
      endDate = moment().format(moment.HTML5_FMT.DATE);
    }

    //converted to ObjectId because aggregator is type-sensitive.
    var customerId = mongoose.Types.ObjectId(req.params.id);

    let orders = await RentedProducts.aggregate([
      {
        $match: {
          $and: [
            { customer: customerId },
            {
              rentDate: {
                // get in range between $gte and $lte for the requested timeframe...
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              // double is used to convert string to number for performing addition.
              $toDouble: "$total",
            },
          },
          insuranceAmt: {
            $sum: {
              $toDouble: "$insuranceAmt",
            },
          },
          Total_spent: {
            $sum: {
              $subtract: [
                { $toDouble: "$total" },
                { $toDouble: "$insuranceAmt" },
              ],
            },
          },
          // tax: {
          //    total - (product + insurance)
          // },
          // Used to count the documents. It should be the direct child of
          // the $group because it is an object accumulator...

          // It will give the total number of orders
          total_orders: { $sum: 1 },
        },
      },
    ]);

    let totalProducts = await RentedProducts.find(
      {
        customer: customerId,
        rentDate: {
          // get in range between $gte and $lte for the requested timeframe...
          $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
          $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
        },
      },
      { barcodes: 1, _id: 0 }
    );

    // .project({ barcodes: 1 })
    // .select('barcodes')

    var productAmount = 0;
    const calculateProductAmt = new Promise(async (resolve, reject) => {
      for (prod of totalProducts) {
        // console.log(prod.barcodes)
        for (bcode of prod.barcodes) {
          let singleProduct = await Product.findOne(
            {
              "color.sizes.barcodes": {
                $elemMatch: { barcode: parseInt(bcode) },
              },
            },
            { color: 1, _id: 0 }
          ).lean(); // anti-POJO
          // .select('color')
          // .project({ color: 1 })

          // I set this check of null to prevent null value incase no barcode is matched...
          if (singleProduct) {
            // will sum the amount of each product..
            productAmount += parseInt(singleProduct.color[0].sizes[0].price);
          }
        }
      }
      return resolve(productAmount);
    });

    const ProductTotal = await calculateProductAmt;

    console.log(orders);

    const totalTax = orders[0].total - (ProductTotal + orders[0].insuranceAmt);

    // Adding tax value.
    orders[0]["tax"] = totalTax;
    // orders[0]['total'] += totalTax

    // total orders gathered from Invoices collection.
    // const totalOrders = await Invoice.find({
    //   customer_id: req.params.id,
    //   createdAt: {
    //     // get in range between $gte and $lte for the requested timeframe...
    //     $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
    //     $lte: new Date(new Date(endDate).setHours(23, 59, 59)),
    //   },
    // }).countDocuments()

    return res.status(200).json({ msg: "Insights found.", orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong." }] });
  }

  // total orders.

  // total discounts. (no)

  // total insurance

  // damage = missing

  // late fees. (no)
});

// @route  GET api/customers/blocked
// @desc   get blocked customers
// @access Private
router.get("/status/blocked", auth, async (req, res) => {
  try {
    const customer = await Customer.find({ block_account: true })
      .select("name email")
      .lean();

    if (!customer) {
      return res.status(404).json({ msg: "No Customer found" });
    }

    res.json({ msg: "Blocked Cutomers", customer });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  GET api/customers/:id/unblock
// @desc   un-block customer by id
// @access Private
router.post("/:id/unblock", auth, async (req, res) => {
  try {
    await Customer.updateOne(
      { _id: req.params.id },
      {
        $set: { block_account: false },
      }
    );

    res.json({ msg: "Cutomers unblocked successfully!" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

module.exports = router;
