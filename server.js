import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app  = express();
app.use(cors(
    { origin: process.env.CORS_ORIGIN || '*' }
));

let fruits = ["Apple-backend", "Banana-backend", "Orange-backend", "Mango-backend"];

app.get("api/health", (req, res) => {
    res.status(200).send("API is healthy");
});

app.get("api/fruit", (req, res) => {
    
    res.json(fruits);
    res.status(200).json(fruits);
});

app.post("/api/fruits", (req, res) => {
  const fruit = String(req.body?.fruit ?? "").trim();
  if (!fruit) return res.status(400).json({ error: "fruit is required" });

  fruits.push(fruit);
  res.status(201).json({ fruits });
});

app.put("/api/fruits", (req, res) => {
  const incoming = req.body?.fruits;
  if (!Array.isArray(incoming)) return res.status(400).json({ error: "fruits must be an array" });

  fruits = incoming.map((x) => String(x).trim()).filter(Boolean);
  res.json(fruits);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});