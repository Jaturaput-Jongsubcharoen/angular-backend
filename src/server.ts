import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200' }));
app.use(express.json());

let fruits: string[] = ['Apple-backend', 'Banana-backend', 'Orange-backend', 'Mango-backend'];

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('API is healthy');
});

app.get('/api/fruits', (req: Request, res: Response) => {
  res.status(200).json(fruits);
});

app.post('/api/fruits', (req: Request, res: Response) => {
  const fruit = String((req.body as any)?.fruit ?? '').trim();
  if (!fruit) return res.status(400).json({ error: 'fruit is required' });

  fruits.push(fruit);
  res.status(201).json({ fruits });
});

app.put('/api/fruits', (req: Request, res: Response) => {
  const incoming = (req.body as any)?.fruits;
  if (!Array.isArray(incoming)) return res.status(400).json({ error: 'fruits must be an array' });

  fruits = incoming.map((x: unknown) => String(x).trim()).filter(Boolean);
  res.status(200).json(fruits);
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
