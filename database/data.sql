INSERT INTO "user" ("email","password","first_name","last_name","phone_number","role","street_address","city","state","zip" )
VALUES ('ashley@example.com','1234','Ashley','Stanley','9134561234','Educator','1234 Main Street','Kansas City','MO','64108'),
('karen@example.com','1234','Karen','Wallace','91345664321','Educator','4567 Main Street','Kansas City','MO','64108'),
('john@example.com','1234','John','Parker','9134567896','Educator','555 Main Street','Kansas City','MO','64108'),
('amanday@example.com','1234','Amanda','Smasal','9134564455','Educator','896 Main Street','Kansas City','MO','64108');


INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id")
VALUES ('6/2/2020', 'Received','Lakeview Middle School','Tour-KIA','7/1/2020','Morning','15','4th Grade','3','School',
'Susan','Smith','ssmith@gmail.com','1231231234','1');

INSERT INTO "event" ("id","request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id","volunteer_id")
VALUES (2, '6/3/2020', 'Contacted','Pioneer Ridge Middle School','Once U-PAW-n a Time Reading','7/3/2020','Morning',
'15','5th Grade','1','Church','Megan','Price','meganprice@school.edu','7854568765','3','2');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id")
VALUES ('6/6/2020', 'Received','3 Trails School','Tour-KIA','6/20/2020','Morning','15','4th Grade','3',
'On-site','Jim','Smith','jims@abcschool.edu','8161231234','2');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id")
VALUES ('6/6/2020', 'Scheduled','Bridger School','Activating Em-PAW-thy','7/15/2020','Morning','15','8th Grade','5',
'School','James','Woods','jameswoods@bridger.edu','8161234567','3');

INSERT INTO "event" ("request_date","status","organization","program","program_date","time_of_day",
"student_number","grade_level","adult_sponsors","location","contact_first_name","contact_last_name",
"contact_email","contact_phone_number","educator_id","volunteer_id")
VALUES ('6/7/2020', 'Received','Critttenton Day School','Tour-KIA','7/20/2020','Morning','15','
1st Grade','2','On Site','Alan','Miller','amiller@school.edu','9133335569','4','1');

-- INSERT INTO "contact_log" (	"id","date_time", "educator_id", "event_id", "notes" )
-- VALUES (1, "6/1/2020", 2, 2, 'emailed to confirm date');