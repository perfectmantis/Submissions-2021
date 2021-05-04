const cron = require('node-cron')
const moment = require('moment')
const User = require('../models/User')
const rentedProducts = require('../models/RentedProducts')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const { weekly, biWeekly, monthly } = require('../helpers/timePeriod')

// salary update cron-job
exports.salaryUpdateJob = () => {
  //Run twice a day at the start of 12am and 12pm.
  cron.schedule('0 */12 * * *', async () => {
    console.log('salary effective date updated!')

    // Find only those users whose salary exist in db and whose effective_date is not empty.
    const users = await User.find({
      salary: { $ne: '' },
      // I set {$ne:[]} because in development there are some documents with empty array which are 
      //causing errors while running this crob-job.
      'salary.effective_date': { $exists: true, $ne: [] },
    }).select('salary')

    async function salaryCronJob() {
      for (user of users) {
        if (
          // Matching only(date-month-year) excluding Time(h.m.s.ms) because the cron job will run only once in a day at night 12.00 , not every minute...
          moment(
            user.salary.effective_date[user.salary.effective_date.length - 1]
          ).format(moment.HTML5_FMT.DATE) ===
          moment().format(moment.HTML5_FMT.DATE)
        ) {
          if (user.salary.period === 'weekly') {
            // check if weekly and update accordingly.
            user.salary.effective_date = weekly(user.salary.effective_date[0])
            await user.save()
          } else if (user.salary.period === 'bi-weekly') {
            // check if bi-weekly and update accordingly.
            user.salary.effective_date = biWeekly(user.salary.effective_date[1])
            await user.save()
          } else if (user.salary.period === 'monthly') {
            // check if monthly and update accordingly.
            user.salary.effective_date = monthly(user.salary.effective_date[0])
            await user.save()
          }
        }
      }
    }

    // Execute cronJob :)
    salaryCronJob()
  })
}

exports.lostOrderJob = () => {
  //check if return date is 6 days late.
  cron.schedule('0 */12 * * *', async function () {
    console.log('Lost Order Checker!')

    // Cron-job
    const results = await rentedProducts.find({ status: 'active' })

    lateOrders = []

    results.forEach((res) => {
      const diffInDays = moment().diff(moment(res.returnDate), 'days')
      if (diffInDays >= 6) {
        lateOrders.push(res)
      }
    })

    for (order of lateOrders) {
      // consider order as lost.
      order.status = 'lost'

      await order.save()

      // Block Customer
      await Customer.findByIdAndUpdate(order.customer, {
        $set: { block_account: true },
      })

      // make lost products disable for future scanning.
      for (bcode of order.barcodes) {
        let singleProduct = await Product.findOne(
          {
            'color.sizes.barcodes': {
              $elemMatch: { barcode: parseInt(bcode) },
            },
          },
          { color: 1 }
        )

        if (singleProduct) {
          for (color of singleProduct.color) {
            for (size of color.sizes) {
              for (barcode of size.barcodes) {
                if (barcode.barcode === bcode) {
                  // now make isLost: true to the object of that barcode!!
                  barcode.isLost = true
                  await singleProduct.save()
                }
              }
            }
          }
        }
      }
    }
  })
}
