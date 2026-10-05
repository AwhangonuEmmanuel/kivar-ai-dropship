const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Magnetic Phone Holder",
      cost: 4.5,
      price: 19.99,
      category: "Phone Accessories",
      score: 92
    },
    {
      id: 2,
      name: "LED Galaxy Projector",
      cost: 8,
      price: 29.99,
      category: "Home",
      score: 88
    },
    {
      id: 3,
      name: "Portable Mini Blender",
      cost: 10,
      price: 34.99,
      category: "Kitchen",
      score: 84
    }
  ]);
});

app.get("/api/orders", (req, res) => {
  res.json([
    {
      id: "#KV1001",
      product: "Magnetic Phone Holder",
      amount: 19.99,
      status: "Processing"
    }
  ]);
});

app.post("/api/analyze", (req, res) => {
  const name = req.body.name;
  const cost = Number(req.body.cost);
  const price = Number(req.body.price);

  if (!name || !cost || !price) {
    return res.status(400).json({
      error: "Please enter all product information."
    });
  }

  const profit = price - cost;
  const margin = (profit / price) * 100;

  let score = 60;

  if (margin >= 50) score += 15;
  if (margin >= 70) score += 10;
  if (price >= 15) score += 5;

  if (score > 95) score = 95;

  res.json({
    product: name,
    cost: cost,
    price: price,
    profit: Number(profit.toFixed(2)),
    margin: Number(margin.toFixed(1)),
    score: score
  });
});

app.post("/api/generate-description", (req, res) => {
  const name = req.body.name;
  const category = req.body.category || "modern shoppers";

  if (!name) {
    return res.status(400).json({
      error: "Please enter a product name."
    });
  }

  const description =
    name +
    " is designed to make everyday life easier and more convenient. " +
    "It features a modern design and is perfect for " +
    category +
    ". " +
    "Upgrade your everyday experience with " +
    name +
    ".";

  res.json({
    title: name + " | Kivar Store",
    description: description
  });
});

app.listen(PORT, () => {
  console.log("================================");
  console.log("       KIVAR AI DROPSHIP");
  console.log("================================");
  console.log("Running at http://localhost:" + PORT);
});
