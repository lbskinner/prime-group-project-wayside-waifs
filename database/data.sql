INSERT INTO "user" ("username","password","first_name","last_name","role",)
VALUES ('ashley','$2b$10$aPm0vl6uz1rQSP2L0Sz5BOkiYLGHBfVbpgnJredQaRWgrJ9zWr6Qi','Ashley','Stanley','Educator'),
('karen','$2b$10$aPm0vl6uz1rQSP2L0Sz5BOkiYLGHBfVbpgnJredQaRWgrJ9zWr6Qi','Karen','Wallace','Educator'),
('john','$2b$10$aPm0vl6uz1rQSP2L0Sz5BOkiYLGHBfVbpgnJredQaRWgrJ9zWr6Qi','John','Parker','Educator'),
('amanday','$2b$10$aPm0vl6uz1rQSP2L0Sz5BOkiYLGHBfVbpgnJredQaRWgrJ9zWr6Qi','Amanda','Smasal','Educator');


INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id")
VALUES ('6/2/2020', 'Received','Lakeview Middle School','KIA','7/1/2020','Morning','15','4th Grade','3','School',
'Susan','Smith','ssmith@gmail.com','1231231234','1');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id","volunteer_id")
VALUES ('6/3/2020', 'Contacted','Pioneer Ridge Middle School','OUT','7/3/2020','Morning',
'15','5th Grade','1','Church','Megan','Price','meganprice@school.edu','7854568765','3','2');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id")
VALUES ('6/6/2020', 'Received','3 Trails School','KIA','6/20/2020','Morning','15','4th Grade','3',
'on_site','Jim','Smith','jims@abcschool.edu','8161231234','2');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id")
VALUES ('6/6/2020', 'Scheduled','Bridger School','AE','7/15/2020','Morning','15','8th Grade','5',
'School','James','Woods','jameswoods@bridger.edu','8161234567','3');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id","volunteer_id")
VALUES ('6/7/2020', 'Received','Critttenton Day School','KIA','7/20/2020','Morning','15','
1st Grade','2','on_site','Alan','Miller','amiller@school.edu','9133335569','4','1');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id","volunteer_id")
VALUES ('12/08/2019', 'Scheduled','Lewis and Clark','KIA','12/09/2019','Afternoon','25','
5th Grade','2','on_site','Barry','Nelson','bnelson@school.edu','9133335569','1','2'), ('12/01/2019', 'Contacted','Manor Hill','AE','12/02/2019','Evening','22','
4th Grade','2','on_site','Carl','Orion','corion@school.edu','9145335569','2','1'), ('11/10/2019', 'Received','Manor Hill','OUT','11/11/2019','Morning','18','
1st Grade','1','school','Devin','Pope','dpope@school.edu','9136785569','3','2'), ('10/28/2019', 'Scheduled','JA Rogers','KIA','10/29/2019','Afternoon','25','
5th Grade','2','school','Erin','Roberts','eroberts@school.edu','8135435569','4','1'), ('08/18/2019', 'Contacted','Three Trails','AE','08/19/2019','Evening','22','
5th Grade','2','on_site','Frank','Thompson','fthompson@school.edu','8135907569','1','1');

-- INSERT INTO "contact_log" (	"id","date_time", "educator_id", "event_id", "notes" )
-- VALUES (1, "6/1/2020", 2, 2, 'emailed to confirm date');