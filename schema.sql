CREATE DATABASE IF NOT EXISTS jobtrack
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE jobtrack;

CREATE TABLE demo_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token_hash CHAR(64) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_active DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
);

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL,
    date DATE NOT NULL,
    session_id INT NULL,
    INDEX idx_session_id (session_id),
    CONSTRAINT fk_applications_session
        FOREIGN KEY (session_id)
        REFERENCES demo_sessions(id)
        ON DELETE CASCADE
);
