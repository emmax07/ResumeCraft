# ResumeCraft

A website where people can make use of various resume template to build their resume

Created a database

-- Create the users table
CREATE TABLE `users` (
`id` int NOT NULL AUTO_INCREMENT,
`username` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`role` enum('admin','user') NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert an admin user
INSERT INTO `users` (`username`, `email`, `password`, `role`)
VALUES (
'admin',
'admin@resumecraft.com',
'$2y$10$Jkc2gGmP66gw.HcOIOk4huqgKTBzDhs4Ur8YBnHOGY/mvstuM/pF.',
'admin'
);

Admin info:
UserName: admin@resumecraft.com
Password: admin2025$
