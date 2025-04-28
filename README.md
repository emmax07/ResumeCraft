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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- Create the Resume table
CREATE TABLE `resumes` (
`id` INT NOT NULL AUTO_INCREMENT,  
 `user_email` VARCHAR(255) NOT NULL,  
 `filename` VARCHAR(255) NOT NULL,  
 `filepath` VARCHAR(255) NOT NULL,  
 `filedata` LONGTEXT NOT NULL,  
 `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),  
 KEY `user_email` (`user_email`),  
 CONSTRAINT `resumes_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
