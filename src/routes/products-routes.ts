import { ProductController } from "@/controllers/products-controller";
import { Router, Request, Response, NextFunction } from "express";

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);

export { productsRoutes };
