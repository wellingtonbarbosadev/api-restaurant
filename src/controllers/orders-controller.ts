import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class OrdersController {
  async index(request: Request, response: Response, next: NextFunction) {
    const order = await knex<OrdersRepository>("orders").select();
    return response.json(order);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      );

      const { price } = await knex("products")
        .where({ id: product_id })
        .select("price")
        .first();

      await knex("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price,
      });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
