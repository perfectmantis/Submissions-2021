const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Appointments = require("../../models/Appointments");
const { check, validationResult } = require("express-validator");
const moment = require("moment");

// @route   POST api/appointments/add
// @desc    Add New Appointment
// @access  private
router.post("/add", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    let categories = [req.body.category]
    let appointment = new Appointments({...req.body,categories});
    await appointment.save();
    res.json({ appointment, msg: "AppointmentsAdded Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/appointments
// @desc    Get all Appointments
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointments.find().populate(
      "customer",
      "name contactnumber"
    );
    res.json(appointments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

// @route  POST api/appointments/:id/status/cancel
// @desc   Make status cancel.
// @access Private
router.post("/:id/status/cancel", auth, async (req, res) => {
  try {
    const appointment = await Appointments.findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: "Cancelled",
      },
      { new: true }
    );
    return res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!");
  }
});

// @route  POST api/appointments/:id/status/cancel
// @desc   Make status cancel.
// @access Private
router.post("/:id/status/checkedin", auth, async (req, res) => {
  try {
    let current_time = moment().format("hh:mm A");
    const appointment = await Appointments.findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: `CheckedIn`,
        checkedInAt: current_time,
      },
      { new: true }
    );
    return res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!");
  }
});

// @route  GET api/appointments/:id
// @desc   Get Appointmentsby id (Search Appointmentsby id)
// @access Private
router.get(
  "/:id",

  auth,
  async (req, res) => {
    try {
      const appointment = await Appointments.findById(req.params.id).populate(
        "customer"
      );
      res.json(appointment);
    } catch (err) {
      console.error(err.message);
      // Check if id is not valid
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "No Appointmentsfound" });
      }
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
    }
  }
);

// @route  GET api/currentDateAppointment/:date
// @desc   Get appointment by today's date
// @access Private
router.get("/currentDateAppointment/:date", auth, async (req, res) => {
  try {
   
        var start = new Date();
    start.setHours(-23, -59, -59, -999);

    var end = new Date();
    end.setHours(0, 0, 0, 0);
   
        const result = await Appointments.find({date: { $gte: start, $lt: end }}).populate(
      "customer"
    );


    if (!result) {
      return res.status(404).json({ msg: "No Appointmentsfound" });
    }
    return res.json(result);
  } catch (err) {
    console.error(err.message);
    // Check if id is not valid
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Appointmentsfound" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});
// @route  DELETE api/appointments/:id
// @desc   Cancel an Appointment
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointments.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "No Appointment found" });
    }

    await appointment.remove();

    res.json({ msg: "Appointment Cancelled" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No Appointmentsfound" });
    }
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

// @route    POST api/appointments/:id
//@desc      update appointments.
router.post("/:id", auth, async (req, res) => {
  try {
    let categories =[];
    let appointments = await Appointments.findOne({ _id: req.params.id });
    if (req.body.category != "") {
      categories = [...appointments.categories, req.body.category];
    }
    else{
      categories = [...appointments.categories];
    }
    const newAppointment = await Appointments.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body, categories },
      { new: true }
    ).lean();

    if (!appointments) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No Appointment found with this id." }] });
    }

    return res
      .status(200)
      .json({ newAppointment, msg: "Appointment updated successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errors: [{ msg: "Server Error: Something went wrong" }] });
  }
});

module.exports = router;
