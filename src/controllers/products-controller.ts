import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .object({
          id: z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {
              message: "id must be a number",
            }),
        })
        .parse(request.params);

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products")
        .update({
          name,
          price,
          updated_at: knex.fn.now(),
        })
        .where(id);

      const productUpdated = await knex<ProductRepository>("products")
        .select()
        .where(id);

      return response.status(200).json(productUpdated);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const id = z
      .object({
        id: z
          .string()
          .transform((value) => Number(value))
          .refine((value) => !isNaN(value)),
      })
      .parse(request.params);

    await knex<ProductRepository>("products").delete().where(id);

    return response.json();
  }
}

export { ProductController };
