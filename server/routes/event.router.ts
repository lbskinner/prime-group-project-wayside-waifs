import { Request, Response } from "express";
import express from "express";
import pool from "../modules/pool";

const router: express.Router = express.Router();

/**
 * GET route, get individual event details
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
 * PUT route, update all event details for individual event except status, educator and volunteer, these have their own put routes
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
 * PUT route, update status
 */
router.put(
  "/details/status",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const updatedEventStatus = req.body;
    const queryText = `Update "event" SET "status" = $1 WHERE "id" = $2;`;
    pool
      .query(queryText, [updatedEventStatus.status, updatedEventStatus.id])
      .then(() => res.sendStatus(200))
      .catch((error) => {
        console.log("Put Event Status Error: ", error);
        res.sendStatus(500);
      });
  }
);

/**
 * PUT route, update educator
 */
router.put(
  "/details/educator",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const updatedEventStatus = req.body;
    const queryText = `Update "event" SET "educator_id" = $1 WHERE "id" = $2;`;
    pool
      .query(queryText, [updatedEventStatus.educator_id, updatedEventStatus.id])
      .then(() => res.sendStatus(200))
      .catch((error) => {
        console.log("Put Event Educator Error: ", error);
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
 * PUT route, update volunteer
 */
router.put(
  "/details/volunteer",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const updatedEventStatus = req.body;
    const queryText = `Update "event" SET "volunteer_id" = $1 WHERE "id" = $2;`;
    pool
      .query(queryText, [
        updatedEventStatus.volunteer_id,
        updatedEventStatus.id,
      ])
      .then(() => res.sendStatus(200))
      .catch((error) => {
        console.log("Put Event Educator Error: ", error);
        res.sendStatus(500);
      });
  }
);
router.post(
  "/",
  (req: Request, res: Response, next: express.NextFunction): void => {
    res.sendStatus(201);
  }
);

// PUT ROUTE
router.put("/assign", (req: Request, res: Response): void => {
  const queryText: string = `UPDATE "event" SET "educator_id" = $1 WHERE "id" = $2;`;

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
