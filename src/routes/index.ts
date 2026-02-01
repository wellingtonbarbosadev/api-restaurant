import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRouter } from "./tables-routes";

const routes = Router();
routes.use("/products", productsRoutes);
routes.use("/tables", tablesRouter);

export { routes };
