CREATE DATABASE IF NOT EXISTS
"authTodos"

CREATE TABLE  IF NOT EXISTS 

"users" ("user_id"  SERIAL PRIMARY KEY,
         "username" VARCHAR(255),
         "userEmail" VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS 
"todos" ("todo_id" SERIAL PRIMARY KEY,
         "user_id" INT REFERENCES "users"("user_id") NOT NULL,
         "description" VARCHAR(255),
         "created_Date" DATE,
         "due_Date" DATE);