INSERT INTO users(first_name,last_name,email,password_hash,role)
VALUES
('Ayoub','Meziani','ayoub@esi.dz','not_hashed_yet','STUDENT'),
('Sara','Belkacem','sara@esi.dz','not_hashed_yet','STUDENT'),
('Mohamed','Ali','mohamed@esi.dz','not_hashed_yet','STUDENT'),
('Rami','Karim','rami@esi.dz','not_hashed_yet','STUDENT'),
('Aya','Mecheri','aya@esi.dz','not_hashed_yet','STUDENT'),
('Yasmine','Hamidi','yasmine@esi.dz','not_hashed_yet','STUDENT'),

('Ahmed','Benali','ahmed@esi.dz','not_hashed_yet','TUTOR'),
('Sarah','Kaci','sarah@esi.dz','not_hashed_yet','TUTOR');
INSERT INTO subjects(name,description)
VALUES 
('C Programming','Pointers and memory'),
('Mathematics','Linear Algebra'),
('Algorithms','Data structures and algorithms'),
('Databases','SQL and PostgreSQL'),
('Web Development','HTML CSS JavaScript'),
('Physics','Mechanics');
INSERT INTO tutoring_requests
(
student_id,
tutor_id,
subject_id,
title,
description,
difficulty,
status
)
VALUES

(
1,
NULL,
1,
'Need help with C pointers',
'I don''t understand pointer arithmetic and how pointers relate to arrays.',
'INTERMEDIATE',
'PENDING'
),

(
2,
1,
2,
'Linear Algebra Exam',
'I need to prepare eigenvalues and diagonalization for next week''s exam.',
'ADVANCED',
'ACCEPTED'
),

(
3,
NULL,
3,
'Binary Search Trees',
'Insertion works but my deletion breaks the tree structure.',
'INTERMEDIATE',
'PENDING'
),

(
4,
2,
4,
'SQL Optimization',
'I''m confused about the difference between primary keys and foreign keys.',
'BEGINNER',
'COMPLETED'
),

(
5,
NULL,
5,
'Flexbox Layout',
'My items refuse to center vertically.',
'BEGINNER',
'PENDING'
),

(
6,
1,
6,
'Newton Laws',
'Free body diagrams with friction confuse me.',
'INTERMEDIATE',
'ACCEPTED'
);


