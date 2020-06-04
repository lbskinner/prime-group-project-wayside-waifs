import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

/**
 * GET individual event details
 */
router.get(
  "/details/:id",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const eventId = req.params.id;
    const queryText = `SELECT * FROM "event" WHERE "id" = $1;`;
    pool
      .query(queryText, [eventId])
      .then((responseFromDb) => {
        res.send(responseFromDb.rows);
      })
      .catch((error) => {
        console.log("Get Event Details Error: ", error);
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
