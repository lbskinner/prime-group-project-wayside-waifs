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
 * PUT route template
 */
router.put(
  "/details/edit",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const updatedEventData = req.body;
    const queryText = `Update "event" SET "organization" = $1, "program" = $2, "program_date" = $3, "time_of_day" = $4, 
        "student_number" = $5, "grade_level" = $6, "adult_sponsors" = $7, "location" = $8, "contact_first_name" = $9, 
        "contact_last_name" = $10, "contact_email" = $11, "contact_phone_number" = $12 WHERE "id" = $13;`;
    pool
      .query(queryText, [
        updatedEventData.organization,
        updatedEventData.program,
        updatedEventData.program_date,
        updatedEventData.time_of_day,
        updatedEventData.student_number,
        updatedEventData.grade_level,
        updatedEventData.adult_sponsors,
        updatedEventData.location,
        updatedEventData.contact_first_name,
        updatedEventData.contact_last_name,
        updatedEventData.contact_email,
        updatedEventData.contact_phone_number,
        updatedEventData.id,
      ])
      .then(() => res.sendStatus(200))
      .catch((error) => {
        console.log("Put Event Details Error: ", error);
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
