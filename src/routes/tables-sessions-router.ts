import { TablesSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";

const tablesSessionsRouter = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRouter.get("/", tablesSessionsController.index);

export { tablesSessionsRouter };
