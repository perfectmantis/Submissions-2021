const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Coupon = require("../../models/Coupons");
const { check, validationResult } = require("express-validator");

// @route   POST api/Coupon/add
// @desc    Add New Coupon
// @access  private
router.post(
  "/add",
  // [
  //   check("discount_amount", "Discount Amount  Required").not().isEmpty(),
  //   check("coupon_type", "Coupon Type Required").not().isEmpty(),
  //   check("note", "Note Color Required").isArray().not().isEmpty(),
  // ],
  auth,
  async (req, res) => {
    const { eligibility } = req.body;
    try {
      const result = await Coupon.findOne({ code: req.body.code });
    if (result) {
      return res.status(404).json({ msg: "Coupon Code Must be unique " });
    }
      const CouponBody = {
        discount_amount: req.body.discount_amount,
        coupon_type: req.body.coupon_type,
        max_life: req.body.max_life,
        coupon_notes: [{ title: req.body.note }],
        code: req.body.code,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        tags: req.body.tags,
        eligibility: req.body.eligibility,
        number_of_use_per_customer: req.body.number_of_use_per_customer,
      };
      if (req.body.min_requirement) {
        CouponBody["min_requirement"] = req.body.min_requirement;
      }

      if (
        req.body.coupon_type == "percentage" &&
        (req.body.max_payout == "" || req.body.max_payout == undefined)
      ) {
        return res.status(500).send("max payout is required");
      }
      if (req.body.coupon_type == "percentage" && req.body.max_payout) {
        CouponBody["max_payout"] = req.body.max_payout;
      }

      if (eligibility !== "all" && req.body.product_ids) {
        CouponBody["product_ids"] = req.body.product_ids;
      }
      if (eligibility !== "all" && req.body.product_tags) {
        CouponBody["product_tags"] = req.body.product_tags;
      }
      if (req.body.coupon_type == "amount") {
        delete CouponBody["max_payout"];
      }
      let coupon = new Coupon(CouponBody);
      await coupon.save();
      res.status(200).json({ coupon, msg: "Coupon Added Successfully" });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route  POST api/Coupon/changeStatus/:id
// @desc   changeStatus
// @access Private
router.post("/changeStatus/:id/:status", auth, async (req, res) => {
  try {
    await Coupon.updateOne(
      { _id: req.params.id },
      {
        $set: {
          disabled: req.params.status,
        },
      }
    );
    res.json({ msg: "Coupon Status changed Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  POST api/Coupon/add_note/:id
// @desc   Update a Coupon Notes
// @access Private
router.post("/add_note/:id", auth, async (req, res) => {
  try {
    const result = await Coupon.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { coupon_notes: JSON.parse(req.body.notes) },
      },
      { new: true }
    );
    res.json({
      msg: "Coupon Note Add  Successfully",
      result: result.coupon_notes,
    });
  } catch (err) {
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  POST api/Coupon/add_note/:id
// @desc   Update a Coupon Notes
// @access Private
router.post("/update_tags/:id", auth, async (req, res) => {
  try {
    const result = await Coupon.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { tags: req.body.new_tags },
      },
      { new: true }
    );
    res.json({
      msg: "Tags Updated  Successfully",
      result: result.tags,
    });
  } catch (err) {
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});
//
// @route  Apply Coupon api/coupon/apply
// @desc   Apply Coupon
// @access Private
router.post("/apply_coupon", auth, async (req, res) => {
  try {
    const { coupon_code, total, products, customerId } = req.body;
    // console.log(req.body);
    const result = await Coupon.findOne({ code: coupon_code });

    if (result == null) {
      return res.status(404).json({ msg: "No Coupon found" });
    }
    const {
      max_life,
      usage,
      coupon_type,
      eligibility,
      coupon_status,
      min_requirement,
      start_date,
      end_date,
      used_customers,
      number_of_use_per_customer,
    } = result;

    // count customer
    if (coupon_status == "active") {
      if (Number(usage) >= Number(max_life)) {
        return res.status(404).json({ msg: "Limit Exceed" });
      }

      used_customers.map((s) => {
        if (
          s.customer == customerId &&
          !(s.usage < number_of_use_per_customer)
        ) {
          return res.status(404).json({ msg: "One time Per customer" });
        }
      });
      if (eligibility == "only") {
        OnlyCouponCode(req, res, products, result);
      }
      if (eligibility == "all") {
        AllCouponCode(req, res, products, result);
      }
      if (eligibility == "exclude") {
        ExcludeCouponCode(req, res, products, result);
      }
      if (eligibility == "each") {
        EachCouponCode(req, res, products, result);
      }
    } else {
      return res.status(404).json({ msg: "Coupon is Inactive" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  POST api/Coupon/:id
// @desc   Update a Coupon
// @access Private
router.post("/:id", auth, async (req, res) => {
  try {
    await Coupon.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.json({ msg: "Coupon Updated Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route   POST api/Coupon
// @desc    Post all Coupon
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const new_date = new Date();
    let query = {};
    if (req.body.coupon_status == "active") {
       query["coupon_status"] = 'active';
      query["end_date"] = { $gt: new_date };
    }
    if (req.body.coupon_status == "inactive") {
      query = {
        $or: [{ end_date: { $lt: new_date } }, { coupon_status: "inactive" }],
      };
    }
    // end_date
    var limit = 10;
    var page = req.body.currentPage ? parseInt(req.body.currentPage) : 1;
    var skip = (page - 1) * limit;
    const coupons = await Coupon.find(query).skip(skip).limit(limit);
    const total = await Coupon.count(query);
    res.status(200).json({ coupons: coupons, total: total });
  } catch (err) {
    res.status(500).send("Server Error!");
  }
});

// @route  GET api/coupon/:id
// @desc   Get Coupon by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id).populate({
      path: "used_orders",
      populate: {
        path: "customer",
        model: "customer",
      },
    });

    if (!coupon) {
      return res.status(404).json({ msg: "No Coupon found" });
    }

    res.json(coupon);
  } catch (err) {
    // Check if id is not valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Coupon found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  DELETE api/coupon/:id
// @desc   Delete a coupon
// @access Private
router.delete(
  "/:id",

  async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.id);

      if (!coupon) {
        return res.status(404).json({ msg: "No Coupon found" });
      }

      await coupon.remove();

      res.status(200).json({ msg: "Coupon Successfully Removed" });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "No Coupon found" });
      }
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  POST api/Coupon/:couponId/:status/status_update
// @desc   Update a Coupon Status
// @access Private
router.post("/:couponId/:status/status_update", auth, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      { _id: req.params.couponId },
      {
        $set: { coupon_status: req.params.status },
      },
      { new: true }
    );
    res.json({
      msg: "Coupon Updated  Successfully",
      coupon,
    });
  } catch (err) {
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});
module.exports = router;

const AllCouponCode = (req, res, products, result) => {
  let { min_requirement } = result;
  var discount_products_total = 0;
  products.map((item, index) => {
    discount_products_total += Number(item.price);
  });
  if (min_requirement) {
    if (discount_products_total >= min_requirement) {
      return res.status(200).json({ msg: "Apply Coupon", result: result });
    } else {
      return res
        .status(404)
        .json({ msg: "Total of eligible items does not meet req." });
    }
  }
  return res.status(200).json({ msg: "Apply Coupon", result: result });
};
const OnlyCouponCode = (req, res, products, result) => {
  let { min_requirement, product_tags } = result;
  let discount_products = [];

  var discount_products_total = 0;

  products.map((item, index) => {
    if (
      result.product_ids.includes(item.productId) ||
      belongsToTags(product_tags, item.productTag)
    ) {
      discount_products_total += Number(item.price);
      discount_products.push(item);
    }
  });
  if (discount_products.length > 0) {
    if (min_requirement) {
      if (discount_products_total >= min_requirement) {
        return res.status(200).json({
          msg: "Apply Coupon",
          result: result,
          discount_products: discount_products.length,
        });
      } else {
        return res
          .status(404)
          .json({ msg: "Total of eligible items does not meet req." });
      }
    }
    return res.status(200).json({
      msg: "Apply Coupon",
      result: result,
      discount_products: discount_products.length,
    });
  }

  return res.status(404).json({ msg: "These Products are Not Includes" });
};

const ExcludeCouponCode = (req, res, products, result) => {
  let { min_requirement, product_tags, product_ids } = result;
  let discount_products = [];
  var discount_products_total = 0;

  products.map((item1, index) => {
    const result1 = product_ids.includes(item1.productId);
    if (!result1 && !belongsToTagsExclude(product_tags, item1.productTag)) {
      discount_products_total += Number(item1.price);
      discount_products.push(item1);
    }
  });

  if (discount_products.length > 0) {
    if (min_requirement) {
      if (discount_products_total >= min_requirement) {
        return res.status(200).json({
          msg: "Apply Coupon",
          result: result,
          discount_products: discount_products.length,
        });
      } else {
        return res
          .status(404)
          .json({ msg: "Total of eligible items does not meet req." });
      }
    }
    return res.status(200).json({
      msg: "Apply Coupon",
      result: result,
      discount_products: discount_products.length,
    });
  }
  return res.status(404).json({ msg: "These Products are Not Includes" });
};

const EachCouponCode = (req, res, products, result) => {
  let { min_requirement, product_tags } = result;
  let discount_products = [];
  var discount_products_total = 0;

  products.map((itemEach, index) => {
    if (
      result.product_ids.includes(itemEach.productId) ||
      belongsToTags(product_tags, itemEach.productTag)
    ) {
      discount_products_total += Number(itemEach.price);
      discount_products.push(itemEach);
    }
  });

  if (discount_products.length > 0) {
    if (min_requirement) {
      if (discount_products_total >= min_requirement) {
        return res.status(200).json({
          msg: "Apply Coupon",
          result: result,
          discount_products: discount_products.length,
        });
      } else {
        return res
          .status(404)
          .json({ msg: "Total of eligible items does not meet req." });
      }
    }
    return res.status(200).json({
      msg: "Apply Coupon",
      result: result,
      discount_products: discount_products.length,
    });
  }
  return res.status(404).json({ msg: "These Products are Not Includes" });
};

const belongsToTags = (couponsTags, productTag) => {
  if (couponsTags.length > 0) {
    const convertTagToArray = productTag.split(",");
    const found = convertTagToArray.some((r) => couponsTags.includes(r.trim()));
    return found;
  }
  return false;
};

const belongsToTagsExclude = (couponsTags, productTag) => {
  if (couponsTags.length > 0) {
    const convertTagToArray = productTag.split(",");
    var found1 = convertTagToArray.some((r) => couponsTags.includes(r.trim()));
    if (found1) {
      return true;
    }
    return false;
  }
  return false;
};
