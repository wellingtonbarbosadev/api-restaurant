import express from "express";
import { productsRoutes } from "./routes/products-routes";
import { routes } from "./routes/index";

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes)

app.listen(PORT, () => 
  console.log(`Server is running on http://localhost:${PORT}`)
);
