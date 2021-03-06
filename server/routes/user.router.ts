import { Request, Response } from "express";
import express from "express";
import rejectUnauthenticated from "../modules/authentication-middleware";
import pool from "../modules/pool";
import userStrategy from "../strategies/user.strategy";
import { encryptPassword } from "../modules/encryption";

const router: express.Router = express.Router();

router.get("/", rejectUnauthenticated, (req: Request, res: Response): void => {
  res.send(req.user);
});

router.get("/alluser", (req: Request, res: Response): void => {
  const queryText: string = `SELECT "id", "first_name", "last_name", "role" FROM "user" ORDER BY last_name ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error getting All Users: ${err}`);
      res.sendStatus(500);
    });
});

router.post(
  "/register",
  (req: Request, res: Response, next: express.NextFunction): void => {
    const username: string | null = <string>req.body.username;
    const password: string | null = encryptPassword(req.body.password);

    const queryText: string = `INSERT INTO "user" (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id`;
    pool
      .query(queryText, [
        username,
        password,
        req.body.first_name,
        req.body.last_name,
      ])
      .then((responseFromDB) => {
        const newUserId = responseFromDB.rows[0].id;
        pool
          .query(`SELECT "username" FROM "user" WHERE "id" = $1;`, [newUserId])
          .then((response) => res.send(response.rows))
          .catch((error) => {
            console.log("Error getting newly created username");
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log(`Error saving user to database: ${err}`);
        res.sendStatus(500);
      });
  }
);

router.post(
  "/login",
  userStrategy.authenticate("local"),
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);

router.post("/logout", (req: Request, res: Response): void => {
  req.logout();
  res.sendStatus(200);
});

export default router;
