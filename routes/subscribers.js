const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Routes needed
// get all
// get one
// creating one
// Updating one
// Deleting one

// GET ALL
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findOne({ name: req.params.id });
    if (subscriber == null) {
      return res.status(404).json({ message: `Cannot find  by id${id}` });
    }
    res.json(subscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriber: req.body.subscriber,
    subscriberdate: req.body.subscriberdate,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create one

//update one
router.patch("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findOne({ name: req.params.id });
    if (subscriber == null) {
      return res.status(404).json({ message: `Cannot find  by id${id}` });
    }

    // If the specified fields exist in the schema, patch
    for (let prop in req.body) {
      if (subscriber.schema.paths.hasOwnProperty(prop)) {
        subscriber[prop] = req.body[prop];
      }
    }

    const updatedSubscriber = await subscriber.save();
    res.status(200).json(updatedSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:name", async (req, res) => {
  try {
    const subscriber = await Subscriber.findOneAndDelete({
      name: req.params.name,
    });
    if (subscriber == null) {
      return res.status(404).json({ message: `Cannot find  by id${name}` });
    }
    res.json({ message: "Deleted Subscriber", subscriber2: subscriber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
