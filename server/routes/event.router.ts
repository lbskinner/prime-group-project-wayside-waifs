import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

//GET route for EVENT

router.get(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText = `SELECT * FROM "event";`;

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

// PUT ROUTE
router.put("/assign", (req: Request, res: Response): void => {
  const queryText: string = `UPDATE "event" SET "educator_user_id" = $1 WHERE "id" = $2;`;

  pool
    .query(queryText, [req.body.user, req.body.event])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error putting Assign Users: ${err}`);
      res.sendStatus(500);
    });
});

export default router;
