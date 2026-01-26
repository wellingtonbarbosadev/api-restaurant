import { ProductController } from "@/controllers/products-controller";
import { Router, Request, Response, NextFunction } from "express";

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    productsController.index(request, response, next);
  },
);

export { productsRoutes };
