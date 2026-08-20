-- ESI-Connect : donnees de depart
-- Semaine 4 : les mots de passe ne sont pas encore geres (hachage bcrypt en semaine 5)

INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES
('Alex',    'Martin',   'alex.martin@esi.dz',    'not_hashed_yet', 'STUDENT'),
('Sara',    'Belkacem', 'sara.belkacem@esi.dz',  'not_hashed_yet', 'STUDENT'),
('Yasmine', 'Hamidi',   'yasmine.hamidi@esi.dz', 'not_hashed_yet', 'TUTOR'),
('Karim',   'Benali',   'karim.benali@esi.dz',   'not_hashed_yet', 'TUTOR');

INSERT INTO subjects (name, description) VALUES
('C Programming',   'Pointers, arrays, memory management and structures.'),
('Mathematics',     'Algebra, calculus and probability.'),
('Algorithms',      'Sorting, graphs and dynamic programming.'),
('Databases',       'SQL and database design.'),
('Web Development', 'HTML, CSS, JavaScript and React.'),
('Physics',         'Mechanics and electromagnetism.');

INSERT INTO tutoring_requests
(student_id, tutor_id, subject_id, title, description, difficulty, status, tutor_response, response_at, created_at, updated_at) VALUES
(1, NULL, 1, 'Need help with C pointers',
 'I do not understand pointer arithmetic and how pointers relate to arrays.',
 'Intermediate', 'PENDING', NULL, NULL, NOW() - INTERVAL '4 days', NULL),
(2, 3, 2, 'Linear algebra exam prep',
 'I need help preparing eigenvalues and diagonalization for next week exam.',
 'Advanced', 'ACCEPTED', NULL, NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
(1, NULL, 3, 'Binary search trees',
 'Insertion works but my deletion breaks the tree structure.',
 'Intermediate', 'PENDING', NULL, NULL, NOW() - INTERVAL '2 days', NULL),
(2, 4, 4, 'SQL query optimization',
 'I am confused about primary keys and foreign keys and how they relate tables.',
 'Beginner', 'COMPLETED',
 'Great question! A primary key uniquely identifies each row in a table. A foreign key is a column that references the primary key of another table, creating the relation. Think of it as: the foreign key always lives on the many side of a one-to-many relation. I added two schema examples in our session notes.',
 NOW() - INTERVAL '1 day', NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day'),
(1, NULL, 5, 'Flexbox layout',
 'My items refuse to center vertically no matter what I try.',
 'Beginner', 'PENDING', NULL, NULL, NOW() - INTERVAL '1 day', NULL),
(2, 3, 6, 'Newton laws',
 'Free body diagrams with friction on an inclined plane confuse me.',
 'Intermediate', 'COMPLETED',
 'The trick is to always rotate your axes along the inclined plane: x parallel to the slope, y perpendicular. Then the weight splits into mg sin(theta) and mg cos(theta), and friction opposes the motion along x. Draw the diagram in that order every time and it becomes mechanical.',
 NOW() - INTERVAL '6 hours', NOW() - INTERVAL '4 days', NOW() - INTERVAL '6 hours');

-- Messages de test
INSERT INTO messages
(request_id, sender_id, content, created_at)
VALUES
-- Conversation de la demande 2 : Sara ↔ Yasmine
(2, 2, 'Bonjour Yasmine, je voudrais commencer par les valeurs propres.', NOW() - INTERVAL '2 hours'),
(2, 3, 'Bonjour Sara ! Bien sûr. Commençons par revoir le calcul du polynôme caractéristique.', NOW() - INTERVAL '90 minutes'),
(2, 2, 'D’accord, je bloque justement sur cette partie.', NOW() - INTERVAL '60 minutes'),
(2, 3, 'Pas de problème, je vais te montrer un exemple étape par étape.', NOW() - INTERVAL '30 minutes'),

-- Conversation de la demande 4 : Sara ↔ Karim
(4, 2, 'Bonjour Karim, merci pour ton aide sur les bases de données.', NOW() - INTERVAL '5 hours'),
(4, 4, 'Avec plaisir ! As-tu compris la différence entre une clé primaire et une clé étrangère ?', NOW() - INTERVAL '4 hours'),
(4, 2, 'Oui, maintenant c’est beaucoup plus clair.', NOW() - INTERVAL '3 hours'),
(4, 4, 'Parfait ! N’hésite pas à me contacter si tu as d’autres questions.', NOW() - INTERVAL '2 hours'),

-- Conversation de la demande 6 : Sara ↔ Yasmine
(6, 2, 'Bonjour Yasmine, je ne comprends pas la décomposition du poids sur le plan incliné.', NOW() - INTERVAL '4 hours'),
(6, 3, 'Il faut commencer par choisir les axes parallèlement et perpendiculairement au plan.', NOW() - INTERVAL '3 hours'),
(6, 2, 'Donc la composante parallèle est mg sin(theta) ?', NOW() - INTERVAL '2 hours'),
(6, 3, 'Exactement ! Et la composante perpendiculaire est mg cos(theta).', NOW() - INTERVAL '1 hour');

-- Avis de test sur les demandes COMPLETED
INSERT INTO ratings
(request_id, student_id, tutor_id, stars, comment, created_at)
VALUES
(4, 2, 4, 5, 'Excellent tuteur, explications très claires.', NOW() - INTERVAL '1 hour'),
(6, 2, 3, 4, 'Très bonne aide, les explications étaient utiles.', NOW() - INTERVAL '45 minutes');