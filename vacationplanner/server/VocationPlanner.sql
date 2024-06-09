"DB" : "vocationPlanner"
CREATE TABLE IF NOT EXISTS "todos" (
    "id" VARCHAR(255) PRIMARY KEY,
    "user_email" VARCHAR(255),
    "title" VARCHAR(255),
    "progress" VARCHAR(255),
    "date" TIMESTAMP
);
CREATE TABLE IF NOT EXISTS
"users"("id" VARCHAR(255) PRIMARY KEY,
        "email" VARCHAR(255),
        "hashed_password" VARCHAR(255));