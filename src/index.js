import express from "express";
import cors from "cors";
import "dotenv/config"

import truckRoutes from './routes/truck.routes.js';
import dailyRoutes from './routes/daily.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT||5000
app.use(cors());
app.use(express.json());

app.use('/trucks', truckRoutes);
app.use('/daily', dailyRoutes);

app.get("/", (req, res) => {
  res.send("Transport backend running...");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
