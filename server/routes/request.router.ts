import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {}
);

/**
 * POST route template
 */
router.post(
  "/new",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `INSERT INTO event ("request_date", "status", "organization", "program", "program_date", "time_of_day", "student_number", "grade_level", "adult_sponsors", "location", "contact_first_name", "contact_last_name", "contact_email", "contact_phone_number", "educator_id", "volunteer_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`;
    pool
      .query(queryText, [
        req.body.status,
        req.body.organization,
        req.body.program,
        req.body.program_date,
        req.body.time_of_day,
        req.body.student_number,
        req.body.grade_level,
        req.body.adult_sponsors,
        req.body.location,
        req.body.contact_first_name,
        req.body.contact_last_name,
        req.body.contact_email,
        req.body.contact_phone_number,
      ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(`Error saving user to database: ${err}`);
        res.sendStatus(500);
      });
  }
);

export default router;
