DROP DATABASE IF EXISTS assignment_system;
CREATE DATABASE assignment_system;
USE assignment_system;

-- GROUPS
CREATE TABLE StudentGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- USERS
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','lecturer','admin') NOT NULL,
    groupId INT NULL,
    FOREIGN KEY (groupId) REFERENCES StudentGroups(id)
);

-- ASSIGNMENTS
CREATE TABLE Assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    groupId INT NOT NULL,
    lecturerId INT NOT NULL,
    openDate DATETIME,
    closeDate DATETIME,
    FOREIGN KEY (groupId) REFERENCES StudentGroups(id),
    FOREIGN KEY (lecturerId) REFERENCES Users(id)
);

-- SUBMISSIONS
CREATE TABLE Submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,

    assignmentId INT NOT NULL,
    studentId INT NOT NULL,

    filePath VARCHAR(255),
    submitDate DATETIME,
    studentComment TEXT,

    grade INT NULL,
    lecturerComment TEXT,

    status ENUM(
        'unsubmitted',
        'submitted',
        'checked',
        'late'
    ) DEFAULT 'unsubmitted',

    FOREIGN KEY (assignmentId) REFERENCES Assignments(id),
    FOREIGN KEY (studentId) REFERENCES Users(id),

    UNIQUE (assignmentId, studentId)
);