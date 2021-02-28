const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const moment = require("moment");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
var multer = require("multer");
const { isAdmin } = require("../../middleware/isAdmin");
var cloudinary = require("cloudinary");
const config = require("config");
const {
  weekly,
  biWeekly,
  monthly,
  datePrompt,
} = require("../../helpers/timePeriod");

// cloundinary configuration
cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret"),
});

// multer configuration
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter });

// @route   POST /api/users/add
// @desc    Add new user
// @access  Private

router.post(
  "/add",
  upload.single("avatar"),
  auth,
  // isAdmin,
  [
    check("username", "User Name is Required").not().isEmpty(),
    check("fullname", "Full Name is Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("contactnumber", "Please Enter Contact Number").not().isEmpty(),
    check("gender", "Please select your Gender").not().isEmpty(),
    check(
      "password",
      "Please Enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      let body = JSON.parse(JSON.stringify(req.body));

      var sections;
      if (req.body.sections) {
        sections = req.body.sections.split(",");
      }
      // check if there is any record with same email and username
      const userByEmail = await User.findOne({ email: body.email });
      const userByUsername = await User.findOne({ username: body.username });

      if (userByEmail) {
        return res
          .status(422)
          .json({ errors: [{ msg: "User with this Email already exists" }] });
      }
      if (userByUsername) {
        return res.status(500).json({
          errors: [{ msg: "User with this Username already exists" }],
        });
      }

      // save user record
      // const { avatar } = file.path;
      const avatar = gravatar.url(body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      let userBody;
      const salt = await bcrypt.genSalt(10);

      const password = await bcrypt.hash(body.password, salt);

      if (req.file == undefined) {
        userBody = { ...body, avatar, sections, password };
        let user = new User(userBody);
        await user.save();

        res.status(200).json({ user, msg: "User Added Successfully" });
      } else {
        const avatar = req.file.path;

        cloudinary.uploader.upload(avatar, async function (result) {
          userBody = {
            ...body,
            password,
            avatar: result.secure_url,
            sections,
          };

          let user = new User(userBody);
          await user.save();

          res.status(200).json({ user, msg: "User Added Successfully" });
        });
      }
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  }
);


// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

// // @route   GET api/users/:status
// // @desc    Get all users
// // @access  Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const users = await User.find()
//     res.json(users)
//   } catch (err) {
//     console.log(err)
//     res.status(500).send('Server Error!')
//   }
// })

// @route   GET api/users/search/sarchval
// @desc    Search user
// @access  Private
router.get("/search/:val", auth, async (req, res) => {
  try {
    const search = req.params.val;
    // const users = await User.find({username: /search/, contactnumber: /search/, email: /search/, gender: /search/, accountStatus: /search/});
    // const users = await User.find({username: {$regex: search}, contactnumber: {$regex: search}, email: {$regex: search}, accountStatus: {$regex: search} });
    const users = await User.find({
      $or: [
        { username: search },
        { contactnumber: search },
        { email: search },
        { gender: search },
        { accountStatus: search },
      ],
    });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

// @route   GET /api/users/id
// @desc    Get User by Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "No user found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    // Check if id is not valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No User found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route   GET api/users/verifySalaryCode/:code
// @desc    Verify Salary Code
// @access  Private
router.get("/verifySalaryCode/:code", auth, async (req, res) => {
  try {
    if (req.params.code === process.env.salarySecretCode) {
      return res.status(200).json({ msg: "Successfully Authorize" });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "Wrong Authorization code." }] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route  PUT api/users/:id
// @desc   Update a user
// @access Private
router.post(
  "/:id",
  upload.single("avatar"),
  [
    check("username", "User Name is Required").not().isEmpty(),
    check("fullname", "Full Name is Required").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("contactnumber", "Please Enter Contact Number").not().isEmpty(),
    check("gender", "Please select your Gender").not().isEmpty(),
    check("birthday", "Please select your Birth Date").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // check if there is any record with same email and username of not this user
      const userByEmail = await User.findOne({
        _id: { $ne: req.params.id },
        email: body.email,
      });
      const userByUsername = await User.findOne({
        _id: { $ne: req.params.id },
        username: body.username,
      });
      if (userByEmail) {
        return res
          .status(422)
          .json({ errors: [{ msg: "User with this Email already exists" }] });
      }
      if (userByUsername) {
        return res.status(500).json({
          errors: [{ msg: "User with this Username already exists" }],
        });
      }

      if (body.birthday === "undefined") {
        return res
          .status(500)
          .json({ errors: [{ msg: "Please select birthday" }] });
      }
      var sections;
      if (req.body.sections) {
        sections = req.body.sections.split(",");
      }

      if (req.body.salary) {
        var parsedSalary = JSON.parse(req.body.salary);

        var salary;
        // Period : Weekly
        if (parsedSalary[0].period === "weekly") {
          const nextMonday = weekly();
          salary = {
            period: parsedSalary[0].period,
            base_rate: parsedSalary[0].base_rate,
            effective_date: nextMonday,
          };
        }
        // Period : bi-weekly
        if (parsedSalary[0].period === "bi-weekly") {
          const NextandThirdMon = biWeekly();

          salary = {
            period: parsedSalary[0].period,
            base_rate: parsedSalary[0].base_rate,
            effective_date: NextandThirdMon,
          };
        }

        // Period : monthly
        if (parsedSalary[0].period === "monthly") {
          // grabbed the last monday of the month using momentjs..

          const lastMonOfMonth = monthly();

          salary = {
            period: parsedSalary[0].period,
            base_rate: parsedSalary[0].base_rate,
            effective_date: lastMonOfMonth,
          };
        }
      }

      const avatar = gravatar.url(body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //check if the accountStatus is set to 'inactivated'..
      let inactivated_date;
      if (req.body.accountStatus && req.body.accountStatus === "inactive") {
        inactivated_date = Date.now();
      }
      // It will update any number of requested fields both by Employee and Admin...
      let fieldsToUpdate;
      if (req.file === undefined) {
        fieldsToUpdate = { ...req.body };
        await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ...req.body,
              inactivated_date,
              salary,
              sections,
            },
          },
          { new: true }
        );
      } else {
        const avatar = req.file.path;
        cloudinary.uploader.upload(avatar, async function (result) {
          await User.updateOne(
            { _id: req.params.id },
            {
              $set: {
                ...body,
                avatar: result.secure_url,
                inactivated_date,
                salary,
                sections,
              },
            },
            { new: true }
          );
        });
      }

      res.status(200).json({ msg: "User Updated Successfully" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  POST api/users/changestatus/:id
// @desc   Change Account status (blocked/active)
// @access Private
router.post(auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findById(req.params.id);

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          accountStatus: "block",
        },
      }
    );
    res.status(200).json({ msg: "Status Updated Successfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route  POST api/users/changestatus/:id
// @desc   Change Account status (blocked/active)
// @access Private
router.post("/:id/:eventid/remove",auth, async (req, res) => {
  try {
    
    const user = await User.findById(req.params.id);
    const newEventArr = [...user.removedevents,req.params.eventid]
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          removedevents: newEventArr,
        },
      }
    );
    res.status(200).json({ msg: "Status Updated Successfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});
// @route  POST api/users/changestatus/:id
// @desc   get removeevents list
// @access Private
router.get("/:id/getEvents",auth, async (req, res) => {
  try {
    
    const user = await User.findById(req.params.id);
    const remove_arr = user && user.removedevents;
    res.status(200).json({remove_arr});
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route   POST /api/users/updatePassword/:id
// @desc    Update Password
// @access  Public

router.post(
  "/updatepassword/:id",
  [check("currentpassword", "Current Password Field Required").not().isEmpty()],

  async (req, res) => {
    try {
      // const errors = validationResult(req)
      // if (!errors.isEmpty()) {
      //   return res.status(422).json({ errors: errors.array() })
      // }
      const user = await User.findById(req.params.id);

      const salt = await bcrypt.genSalt(10);

      const isMatch = await bcrypt.compare(
        req.body.currentpassword,
        user.password
      );
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Wrong Password!!" }] });
      }

      if (req.body.newpassword !== req.body.confirmpassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Confrim Password didn't match!!" }] });
      }
      const newpass = await bcrypt.hash(req.body.newpassword, salt);

      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            password: newpass,
            isPasswordChanged: true,
            accountStatus: "active",
          },
        }
      );
      res.json({ type: "success", msg: "Password Updated Successfully!!" });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  DELETE api/users/:id
// @desc   Delete a user
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Delete user Document
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "No User found" });
    }
    await user.remove();

    res.status(200).json({ msg: `Account Removed successfully` });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No User found" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route   GET api/users/forgetpassword/email
// @desc    Validate Email and Get Token
// @access  Private

router.get(
  "/forgetpassword/:email",
  [check("email", "Please Enter a Valid Email").isEmail()],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email } = req.params;
    try {
      // check for existing user
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Email" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 300000 },
        (err, token) => {
          if (err) throw err;

          if (token) {
            return res.status(200).json({ token: token });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/users/resetpassword/reset_token
// @desc    Reset Password
// @access  Public

router.post("/resetpassword", async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user_id = jwt.verify(req.body.resetToken, process.env.jwtSecret);
    //  check for existing user
    let user = await User.findById(user_id.user.id);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const password = req.body.newpassword;

    const salt = await bcrypt.genSalt(10);

    newpassword = await bcrypt.hash(req.body.newpassword, salt);

    const userID = user._id;

    await User.updateOne(
      { _id: userID },
      {
        $set: {
          password: newpassword,
        },
      }
    );
    res.status(200).json({ msg: "Password Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
