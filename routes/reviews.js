const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const fs = require('fs')

const debug = require('debug')('Reviews');

// Routes needed
// get all
// get one
// creating one
// Updating one
// Deleting one

// GET ALL
router.get("/", async (req, res) => {
  try {
    const Reviews = await Review.find();
    res.json(Reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findOne({ 'doc.id': req.params.id });
    if (review == null) {
      return res.status(404).json({ message: `Cannot find  by id${id}` });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {

try{
  if (Array.isArray(req.body)) {
    const Reviews = await Review.insertMany(req.body);
    res.status(201).json(Reviews);
  } else {

    // If the specified fields exist in the schema, patch
    const newReview = new Review(req.body)
    const savedReview = await newReview.save();

    res.status(200).json({message: "review added",doc: savedReview});
  }
} catch (err) {
   
  res.status(500).json({message: err.message});
}
});


//update one within the doc
router.patch("/:id", async (req, res) => {
    debug(`entered patch with id${req.params.id}`)
    try {
        const review = await Review.findOne({'_id': String(req.params.id)});
        if(review ==null){
            return res.status(404).json({message: `Cannot find Review by id ${req.params.id}`})
        } else {

         

            const updatedReview = await Review.findOneAndUpdate(
                { '_id': String(req.params.id) },
                { $set: req.body },
                { new: true } // This option returns the updated document
              );

            if (!updatedReview){
                return res.status(404).json({ message: `Unable to update Review` })
            } else {
                res.status(200).json(updatedReview);
            }

        }        

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      'doc.id': req.params.id,
    });
    if (review == null) {
      return res.status(404).json({ message: `Cannot find  by id${req.params.id}` });
    }
    res.json({ message: "Deleted Review", Review: review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE ALL
router.delete("/delete/all", async (req, res) => {
    try {
      await Review.deleteMany({});
      res.json({ message: 'All Reviews deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add original list
router.post("/reset/all", async (req, res) => {


    // Delete the existing database

    try {
        await Review.deleteMany({});

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
        const data =fs.readFileSync('./assets/backup_review_database.json','utf8')
        const Reviews = JSON.parse(data)

        for (let ReviewData of Reviews) {
            let newReview = new Review(ReviewData);
            await newReview.save();
        }

        res.status(200).json({ message: " Database reinitialize", db : Reviews})

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
          description: 'Deletes all Reviews',
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
