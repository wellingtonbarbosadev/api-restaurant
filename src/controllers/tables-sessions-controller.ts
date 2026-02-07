import { knex } from "@/database/knex";
import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    const tables_sessions = await knex("tables_sessions")
      .select()
      .orderBy("opened_at");
    return response.json(tables_sessions);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });
      const { table_id } = bodySchema.parse(request.body);
      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("Table already opened");
      }

      await knex<TableSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
