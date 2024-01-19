const express = require("express");
const router = express.Router();
const Dealership = require("../models/dealership");
const fs = require('fs')

const debug = require('debug')('dealerships');

// Routes needed
// get all
// get one
// creating one
// Updating one
// Deleting one

// GET ALL
router.get("/", async (req, res) => {
  try {
    const dealerships = await Dealership.find();
    res.json(dealerships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  try {
    const dealership = await Dealership.findOne({ 'doc.id': req.params.id });
    if (dealership == null) {
      return res.status(404).json({ message: `Cannot find  by id${id}` });
    }
    res.json(dealership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {

try{
  if (Array.isArray(req.body)) {
    debug(" Just before calling Dealership.insertMany")
    const dealerships = await Dealership.insertMany(req.body);
    debug("Dealership.insertMany succes")

    res.status(201).json(dealerships);
  } else {

    // If the specified fields exist in the schema, patch
    const newDealership = new Dealership(req.body)
    const savedDealership = await newDealership.save();

    res.status(200).json(savedDealership);
  }
} catch (err) {
   
                res.status(500).json({message: err.message});
}
});


//update one within the doc
router.patch("/:id", async (req, res) => {
    debug(`entered patch with id${req.params.id}`)
    try {
        const dealership = await Dealership.findOne({'doc.id': req.params.id});
        if(dealership ==null){
            return res.status(404).json({message: `Cannot find dealership by id ${req.params.id}`})
        } else {

         

            const updatedDealership = await Dealership.findOneAndUpdate(
                { 'doc.id': req.params.id },
                { $set: req.body },
                { new: true } // This option returns the updated document
              );

            if (!updatedDealership){
                return res.status(404).json({ message: `Unable to update dealership` })
            } else {
                res.status(200).json(updatedDealership);
            }

        }        

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const dealership = await Dealership.findOneAndDelete({
      'doc.id': req.params.id,
    });
    if (dealership == null) {
      return res.status(404).json({ message: `Cannot find  by id${req.params.id}` });
    }
    res.json({ message: "Deleted Dealership", dealership: dealership });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE ALL
router.delete("/delete/all", async (req, res) => {
    try {
      await Dealership.deleteMany({});
      res.json({ message: 'All dealerships deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add original list
router.post("/reset/all", async (req, res) => {


    // Delete the existing database

    try {
        await Dealership.deleteMany({});

        Review.collection.drop(function(err, result) {
          if (err) {
              console.log('Error in dropping collection!', err);
          }
      });


      } catch (err) {
        res.status(500).json({ message: err.message });
      }


    try{
        console.log(process.cwd())
        const data =fs.readFileSync('./assets/backup_dealership_database.json','utf8')
        const dealerships = JSON.parse(data)

        for (let dealership of dealerships) {
            let newDealership = new Dealership(dealership);
            await newDealership.save();
        }

        res.status(200).json({ message: " Database reinitialize", db : dealerships})

    } catch (err) {
        res.status(500).json({message: err.message})
    }

  });

  router.get('/api/help', (req, res) => {
    res.json({
      endpoints: [
        {
          route: '/delete/all',
          method: 'DELETE',
          description: 'Deletes all dealerships',
        },
        {
          route: '/reset/all',
          method: 'POST',
          description: 'Reinitializes the database from a JSON file',
        },
        // Add other endpoints here...
      ],
    });
  });


module.exports = router;
