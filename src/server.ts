import express from "express";
import { productsRoutes } from "./routes/products-routes";

const app = express();
app.use(express.json());
const PORT = 3333;

app.use(productsRoutes)

app.listen(PORT, () => 
  console.log(`Server is running on http://localhost:${PORT}`)
);
