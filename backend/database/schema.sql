DROP TABLE IF EXISTS tutoring_requests;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL ,
last_name VARCHAR(100) NOT NULL ,
email VARCHAR(255) UNIQUE NOT NULL,
 password_hash TEXT NOT NULL,
role VARCHAR(20)
NOT NULL
CHECK (role IN ('STUDENT','TUTOR')),
  created_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE subjects(
id SERIAL PRIMARY KEY,
name VARCHAR(100)  UNIQUE NOT NULL,
description TEXT
);
CREATE TABLE tutoring_requests(
id SERIAL PRIMARY KEY,
 tutor_id INTEGER  REFERENCES users(id)   ,
 subject_id INTEGER NOT NULL REFERENCES subjects(id),
 student_id INTEGER NOT NULL REFERENCES users(id),
 title VARCHAR(255) NOT NULL ,
 description TEXT NOT NULL,
 difficulty VARCHAR(20) NOT NULL  CHECK (difficulty IN ('BEGINNER','INTERMEDIATE','ADVANCED')),
 status VARCHAR(100) NOT NULL DEFAULT 'PENDING' CHECK (status IN (
    'PENDING',
    'ACCEPTED',
    'COMPLETED'
 )),
 tutor_response TEXT,
 response_at TIMESTAMP,
 created_at TIMESTAMP
        NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

 
