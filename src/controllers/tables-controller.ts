import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import z from "zod";
import { AppError } from "@/utils/AppError";

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number");
      return response.json(tables);
    } catch (error) {
      next(error);
    }
  }
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_number: z.number(),
      });

      const { table_number } = bodySchema.parse(request.body);

      const tableExists = await knex("tables").select().where({ table_number });
      if (tableExists.length !== 0) {
        throw new AppError("Table number exists");
      }

      await knex("tables").insert({ table_number });

      return response.status(201).json({ table_number });
    } catch (error) {
      next(error);
    }
  }
}

export { TablesController };
