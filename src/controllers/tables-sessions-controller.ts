import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express";

class TablesSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    const tables_sessions = await knex("tables_sessions")
      .select()
      .orderBy("opened_at");
    return response.json({ tables_sessions });
  }
}

export { TablesSessionsController };
