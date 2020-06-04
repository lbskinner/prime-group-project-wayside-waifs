import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

/**
 * GET route, get contact log for individual events
 */
router.get(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {}
);

/**
 * POST route, post contact log for individual events
 */
router.post(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const newLogData = req.body;
    const queryText = `INSERT INTO "contact_log" ("educator_id", "event_id", "notes") VALUES ($1, $2, $3);`;
    pool
      .query(queryText, [
        newLogData.educator_id,
        newLogData.event_id,
        newLogData.notes,
      ])
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log("Post Contact Log Error: ", error);
        res.sendStatus(500);
      });
  }
);

export default router;
