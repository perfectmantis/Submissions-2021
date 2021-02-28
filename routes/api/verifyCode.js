const express = require("express");
const router = express.Router();
require('dotenv').config();

//twilio configuration
var ACCOUNT_SID = process.env.ACCOUNT_SID; 
var AUTH_TOKEN = process.env.AUTH_TOKEN;
var VERIFY_SERVICE_SID = process.env.VERIFY_SERVICE_SID;

const client = require('twilio')(ACCOUNT_SID,AUTH_TOKEN);
// @route   GET api/verify/getcode
// @desc    get code
// @access  public
router.get(
    "/getCode",
 async (req, res) => {
    client
        .verify
        .services(VERIFY_SERVICE_SID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: 'sms'
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ errors: error});
          });
});

// @route   POST api/verifyCode
// @desc    verify code
// @access  private
router.get(
    "/verifycode",
 async (req, res) => {
   client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: `+${req.query.phonenumber}`,
            code: req.query.code
        })

        .then(data => {
            setTimeout(function(){
           res.status(200).send(data);
        }, 500);

        })
        .catch((error) => {
            setTimeout(function(){
            res.status(500).json({ errors: error});
          });
        }, 510);
      
})

module.exports = router;
