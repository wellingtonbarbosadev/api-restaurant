import { knex } from "@/database/knex";
import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import id from "zod/v4/locales/id.js";

class TablesSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    const tables_sessions =
      await knex<TableSessionsRepository>("tables_sessions").orderBy(
        "closed_at",
      );
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

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = z
      .object({
        id: z
          .string()
          .transform((value) => Number(value))
          .refine((value) => !isNaN(value), { message: "id must be a number" }),
      })
      .parse(request.params);

    const session = await knex<TableSessionsRepository>("tables_sessions")
      .where({ id })
      .first();

    if (!session) {
      throw new AppError("Session table not found");
    }

    if (session.closed_at) {
      throw new AppError("Session table already closed");
    }

    return response.json(id);
  }
}

export { TablesSessionsController };
