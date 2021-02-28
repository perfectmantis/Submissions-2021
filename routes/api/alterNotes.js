const express = require('express')
const router = express.Router()
const _ = require('lodash')
const auth = require('../../middleware/auth')
const alterNotes = require('../../models/alterNotes')
const rentedProducts = require('../../models/RentedProducts')
const Product = require('../../models/Product')

// @route   POST api/alternotes
// @desc    Create alteration note
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    let { order, order_id, note, alter_request } = req.body

    let eachProdColorArr = []
    let eachProdSizeArr = []

    // Each product details of single order is pushed into it.
    let singleProdDetailsArr = new Array()

    let fetchOrder = await rentedProducts.findOne({
      _id: order,
    })

    if (!fetchOrder) {
      return res.status(404).json({
        errors: [{ msg: 'Order not found with this id.' }],
      })
    }

    //Check if it is order_id or barcode
    if (order_id.length >= 8) {
      // check if barcode really exist in that order.
      let barcodeExist = fetchOrder.barcodes.includes(order_id)

      if (!barcodeExist) {
        return res.status(400).json({
          errors: [{ msg: 'This barcode does not belong to this order.' }],
        })
      }

      // Find product document through barcode. (colors => sizes => barcodes)
      let singleProduct = await Product.findOne(
        {
          'color.sizes.barcodes': {
            $elemMatch: { barcode: parseInt(order_id) },
          },
        },
        { color: 1, name: 1 }
      )

      // To avoid nulls if no product is found with the barcode...
      if (singleProduct) {
        // Get colours for each barcode.
        singleProduct.color.forEach((clr) => {
          // Push in color array for traversing it later.
          eachProdColorArr.push(clr)
        })

        // Now traverse through each color.
        eachProdColorArr.forEach((prodclr) => {
          // Traverse through sizes array.
          prodclr.sizes.forEach((psize) => {
            // Traverse through each barcode inside the barcode array inside the sizes array...
            for (barcode of psize.barcodes) {
              // If barcode is matched.
              if (barcode.barcode == order_id) {
                // Updating details of single product..
                // Created new object to avoid references.
                let singleProdDetails = new Object()
                singleProdDetails.name = singleProduct.name
                singleProdDetails.colorname = prodclr.colorname
                singleProdDetails.size = psize.size

                // Save each product's info object inside this array. (name, color,size)
                singleProdDetailsArr.push(singleProdDetails)
              }
            }
          })
        })
      }
    } else if (order_id.length < 8 && order_id != fetchOrder.orderNumber) {
      return res.status(400).json({
        errors: [{ msg: 'This barcode does not belong to this order.' }],
      })
    }

    let alterNote = await alterNotes.create({
      order,
      order_id,
      note,
      alter_request,
      emp_name: req.user.name,
    })

    let checkTotalAlterations = await alterNotes
      .find({
        order,
        alter_request: true,
        done: false,
      })
      .countDocuments()

    // If it is an alter request only then make the status alteration else not.
    if (checkTotalAlterations == 1 && alter_request) {
      fetchOrder.reservedStatus = fetchOrder.status
      fetchOrder.status = 'alteration'
      await fetchOrder.save()
    }

    if (!alterNote) {
      return res.status(400).json({
        errors: [{ msg: 'Unable to create alteration request.' }],
      })
    }

    alterNote = { ...alterNote._doc, product: singleProdDetailsArr }

    return res.status(200).json({
      errors: [{ msg: 'Alteration note created.' }],
      alterNote,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server Error' })
  }
})

// // @route   GET api/alternotes
// // @desc    get alteration notes
// // @access  Private
// router.get('/:id', auth, async (req, res) => {
//   try {
//     // find all alteration notes.
//     const alterationNotes = await alterNotes
//       .find({ order: req.params.id })
//       .lean()
//       .sort({ createdAt: -1 })
//     // new to old.
//     // .sort({ createdAt: -1 })

//     // Outcome arrays.
//     let alterationNotesWithProds = []

//     if (!alterationNotes.length) {
//       return res.status(400).json({ msg: 'Alteration request not found.' })
//     }

//     for (alteration of alterationNotes) {
//       let eachProdColorArr = []
//       let eachProdSizeArr = []

//       // Each product details of single order is pushed into it.
//       let singleProdDetailsArr = new Array()

//       // check if order consists of order_id else ignore it.
//       if (alteration.order_id) {
//         // Get barcodes array from that order document.
//         let rentProds = await rentedProducts
//           .findOne({
//             orderNumber: alteration.order_id,
//           })
//           .select('barcodes')

//         // Check if the order document contains barcode array.
//         if (rentProds) {
//           // Traverse through each barcode.
//           for (bcode of rentProds.barcodes) {
//             // for each new barcode we will empty the eachProdColorArr for traversing of the latest barcode's colors array...
//             eachProdColorArr.length = 0

//             // for each new barcode we will empty the eachProdSizeArr for traversing of the latest barcode's color's sizes array...
//             eachProdSizeArr.length = 0

//             // Find product document through barcode. (colors => sizes => barcodes)
//             let singleProduct = await Product.findOne(
//               {
//                 'color.sizes.barcodes': {
//                   $elemMatch: { barcode: parseInt(bcode) },
//                 },
//               },
//               { color: 1, name: 1 }
//             )

//             // To avoid nulls if no product is found with the barcode...
//             if (singleProduct) {
//               // Get colours for each barcode.
//               singleProduct.color.forEach((clr) => {
//                 // Push in color array for traversing it later.
//                 eachProdColorArr.push(clr)
//               })

//               // Now traverse through each color.
//               eachProdColorArr.forEach((prodclr) => {
//                 // Traverse through sizes array.
//                 prodclr.sizes.forEach((psize) => {
//                   // Traverse through each barcode inside the barcode array inside the sizes array...
//                   for (barcode of psize.barcodes) {
//                     // If barcode is matched.
//                     if (barcode.barcode == bcode) {
//                       // Updating details of single product..
//                       // Created new object to avoid references.
//                       let singleProdDetails = new Object()
//                       singleProdDetails.name = singleProduct.name
//                       singleProdDetails.colorname = prodclr.colorname
//                       singleProdDetails.size = psize.size

//                       // Save each product's info object inside this array. (name, color,size)
//                       singleProdDetailsArr.push(singleProdDetails)
//                     }
//                   }
//                 })
//               })
//             }
//           }
//         }

//         // Set products(singleProdDetailsArr) array to the current alteration...
//         alteration = { ...alteration, products: singleProdDetailsArr }

//         // Then push it to the final array of alterations.
//         alterationNotesWithProds.push(alteration)
//       } else {
//         // Simply push to array because this alteration contains no (order_id).
//         alterationNotesWithProds.push(alteration)
//       }
//     }

//     return res.status(200).json(alterationNotesWithProds)
//   } catch (err) {
//     console.log(err)
//     res.status(500).send({ msg: 'Server Error' })
//   }
// })

// @route   GET api/alternotes/:id
// @desc    get alteration notes
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // find all alteration notes.
    const alterationNotes = await alterNotes
      .find({ order: req.params.id })
      .lean()
      .sort({ createdAt: -1 })

    // Outcome arrays.
    let alterationNotesWithProds = []

    if (!alterationNotes.length) {
      return res.status(400).json({ msg: 'No Alteration request found.' })
    }

    for (alteration of alterationNotes) {
      let eachProdColorArr = []
      let eachProdSizeArr = []

      // Each product details of single order is pushed into it.
      let singleProdDetailsArr = new Array()

      // check if order consists of order_id else ignore it.
      if (alteration.order_id && alteration.order_id.length === 8) {
        // for each new barcode we will empty the eachProdColorArr for traversing of the latest barcode's colors array...
        eachProdColorArr.length = 0

        // for each new barcode we will empty the eachProdSizeArr for traversing of the latest barcode's color's sizes array...
        eachProdSizeArr.length = 0

        // Find product document through barcode. (colors => sizes => barcodes)
        let singleProduct = await Product.findOne(
          {
            'color.sizes.barcodes': {
              $elemMatch: { barcode: parseInt(alteration.order_id) },
            },
          },
          { color: 1, name: 1 }
        )

        // To avoid nulls if no product is found with the barcode...
        if (singleProduct) {
          // Get colours for each barcode.
          singleProduct.color.forEach((clr) => {
            // Push in color array for traversing it later.
            eachProdColorArr.push(clr)
          })

          // Now traverse through each color.
          eachProdColorArr.forEach((prodclr) => {
            // Traverse through sizes array.
            prodclr.sizes.forEach((psize) => {
              // Traverse through each barcode inside the barcode array inside the sizes array...
              for (barcode of psize.barcodes) {
                // If barcode is matched.
                if (barcode.barcode == alteration.order_id) {
                  // Updating details of single product..
                  // Created new object to avoid references.
                  let singleProdDetails = new Object()
                  singleProdDetails.name = singleProduct.name
                  singleProdDetails.colorname = prodclr.colorname
                  singleProdDetails.size = psize.size

                  // Save each product's info object inside this array. (name, color,size)
                  singleProdDetailsArr.push(singleProdDetails)
                }
              }
            })
          })
        }

        // Set products(singleProdDetailsArr) array to the current alteration...
        alteration = { ...alteration, products: singleProdDetailsArr }

        // Then push it to the final array of alterations.
        alterationNotesWithProds.push(alteration)
      } else {
        // Set products a note of ('Order Note')
        alteration = { ...alteration, products: ['Order Note'] }

        // Simply push to array because this alteration contains order_id not a barcode instead.
        alterationNotesWithProds.push(alteration)
      }
    }

    return res.status(200).json(alterationNotesWithProds)
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: 'Server Error' })
  }
})

// @route   PUT api/alternotes/:id/done
// @desc    mark alteration as done.
// @access  Private
router.put('/:id/done', auth, async (req, res) => {
  try {
    let note = await alterNotes.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          done: true,
        },
      },
      { new: true }
    )

    let checkTotalNotes = await alterNotes
      .find({
        order: note.order,
        alter_request: true,
        done: false,
      })
      .select('_id')
      .lean()

    // It means that if alteration notes of this order _id becomes zero then only in that case we will make this order sttus:'active' otherwise if atleast 1 document is returned from alternotes of this order _id then it means that it have alteration request left which has to be mark as done later when its done thats why it is still in 'alteration' state :)
    if (checkTotalNotes.length == 0) {
      let order = await rentedProducts.findOne({ _id: note.order })

      order.status = order.reservedStatus
      order.reservedStatus = null

      await order.save()

      // await rentedProducts.updateOne(
      //   {
      //     _id: note.order,
      //   },
      //   {
      //     $set: {
      //       status: 'active',
      //     },
      //   }
      // )
    }

    return res.status(200).json({ msg: 'Alteration marked as done.' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: 'Server Error' })
  }
})

module.exports = router
