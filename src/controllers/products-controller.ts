import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const product = request.body;

      await knex("products").insert(product);

      return response.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
