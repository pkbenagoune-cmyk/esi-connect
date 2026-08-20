-- ESI-Connect : structure de la base (semaine 4)
-- Ordre des DROP : les tables qui referencent d'abord

DROP TABLE IF EXISTS tutoring_requests;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,   -- valeur bidon en semaine 4 (bcrypt en semaine 5)
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE tutoring_requests (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id),
  tutor_id INTEGER REFERENCES users(id),
  subject_id INTEGER NOT NULL REFERENCES subjects(id),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(30) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  tutor_response TEXT,
  response_at TIMESTAMP,
  preferred_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES tutoring_requests(id),
    sender_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

CREATE INDEX idx_messages_request ON messages(request_id);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES tutoring_requests(id) UNIQUE,
    student_id INTEGER NOT NULL REFERENCES users(id),
    tutor_id INTEGER NOT NULL REFERENCES users(id),
    stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);