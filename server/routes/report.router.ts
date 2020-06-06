import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT * FROM "event" ORDER BY "program_date" DESC LIMIT 4;`;

    pool
      .query(queryText)
      .then((responseDb) => {
        res.send(responseDb.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  }
);

/**
 * POST route template
 */
router.post(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {
    res.sendStatus(201);
  }
);

export default router;
