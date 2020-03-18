const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Pizzas
router.get("/", async (req, res) => {
  const pizzas = await loadPizzaCollection();
  res.send(await pizzas.find({}).toArray());
});

// Add Pizza Score
router.post("/", async (req, res) => {
  const pizzas = await loadPizzaCollection();

  await pizzas.insertOne({
    restaurant: req.body.restaurant,
    pizza: req.body.pizza,
    description: req.body.description,
    style: req.body.style,
    score: req.body.score,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const pizzas = await loadPizzaCollection();
  await pizzas.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });

  res.status(200).send();
});

async function loadPizzaCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://james123:james123@cluster0-zljzo.mongodb.net/pizza_club?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  );

  return client.db("pizza_club").collection("pizzas");
}

module.exports = router;
