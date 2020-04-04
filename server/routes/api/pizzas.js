const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Pizzas
router.get("/", async (req, res) => {
  const pizzas = await loadPizzaCollection();
  // Check for query parameter
  if (Object.keys(req.query).length) {
    //score has to be int
    if (req.query.score) {
      req.query.score = parseInt(req.query.score);
    }
    res.send(await pizzas.find(req.query).toArray());
  } else {
    res.send(await pizzas.find({}).toArray());
  }
});

//Get Pizza by id
router.get("/:id", async (req, res) => {
  const pizzas = await loadPizzaCollection();
  res.send(
    await pizzas.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray()
  );
});

// Add Pizza
router.post("/", async (req, res) => {
  const pizzas = await loadPizzaCollection();

  await pizzas.insertOne({
    restaurant: req.body.restaurant,
    pizza: req.body.pizza,
    description: req.body.description,
    style: req.body.style,
    score: req.body.score,
    createdAt: new Date(),
  });
  res.status(201).send();
  // console.log(res);
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const pizzas = await loadPizzaCollection();
  await pizzas.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });

  res.status(200).send();
});

router.put("/:id", async (req, res) => {
  const pizzas = await loadPizzaCollection();

  const response = await pizzas.updateOne({
    _id: new mongodb.ObjectID(req.params.id),
    restaurant: req.body.restaurant,
    pizza: req.body.pizza,
    description: req.body.description,
    style: req.body.style,
    score: req.body.score,
    updatedAt: new Date(),
  });

  console.log(response);

  res.status(204).send();
});

async function loadPizzaCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://james123:james123@cluster0-zljzo.mongodb.net/pizza_club?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return client.db("pizza_club").collection("pizzas");
}

module.exports = router;
