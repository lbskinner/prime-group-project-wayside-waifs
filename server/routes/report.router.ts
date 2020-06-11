import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";
import rejectUnauthenticated from "../modules/authentication-middleware";

const router: express.Router = express.Router();

/**
 * Using post route to get the event in date range
 */
router.post(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {
    console.log(req.body);
    const queryText: string = `SELECT "event".*, "user".first_name, "user".last_name FROM "event" JOIN "user" ON "event".educator_id = "user".id WHERE "program_date" >= $1 AND "program_date" <= $2 ORDER BY "program_date" ASC;`;

    pool
      .query(queryText, [req.body.startDate, req.body.endDate])
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
// router.post(
//   "/",
//   (req: Request, res: Response, next: express.NextFunction): void => {
//     res.sendStatus(201);
//   }
// );

export default router;
