-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- name of database: wayside_education
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (255) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (255),
    "last_name" VARCHAR (255),
	"phone_number"  VARCHAR (25),
	"role" VARCHAR (80),
	"street_address" VARCHAR (255),
	"city" VARCHAR (255),
	"state" VARCHAR (25),
	"zip"  INTEGER
);

-- request_date set DEFAULT to "Expression" CURRENT_DATE
CREATE TABLE "event" (
  	"id" SERIAL PRIMARY KEY,
    "request_date" date DEFAULT CURRENT_DATE,
    "status" VARCHAR (255),
    "organization" VARCHAR (255),
    "program" VARCHAR (255),
	"program_date" date,
	"time_of_day" VARCHAR (255),
	"student_number" INTEGER,
	"grade_level" VARCHAR (255),
	"adult_sponsors" INTEGER,
	"location" VARCHAR (255),
    "contact_first_name" VARCHAR (255),
	"contact_last_name" VARCHAR (255),
	"contact_email" VARCHAR (255),
	"contact_phone_number" VARCHAR (25),
	"educator_id" INTEGER,
	"volunteer_id" INTEGER
);

CREATE TABLE "contact_log" (
  	"id" SERIAL PRIMARY KEY,
    "date_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "educator_id" INTEGER,
    "event_id" INTEGER,
    "notes" VARCHAR (1000)
);