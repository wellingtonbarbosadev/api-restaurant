import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await knex("products").select();

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, price } = request.body;

      await knex("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
