import { ProductController } from "@/controllers/products-controller";
import { Router, Request, Response, NextFunction } from "express";

const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    productController.index(request, response, next);
  },
);

export { productsRoutes };
