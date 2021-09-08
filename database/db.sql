CREATE DATABASE reservations;

USE reservations;

CREATE TABLE IF NOT EXISTS office (
	id_office INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	address VARCHAR(100) NOT NULL,
	town VARCHAR(50) NOT NULL,
	province VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee (
	id_employee INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	fname VARCHAR(20) NOT NULL,
	lname VARCHAR(20) NOT NULL,
	salary FLOAT(8,2) NOT NULL,
	id_office INT(11) NOT NULL,
	date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS reservation (
	id_reservation INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_vehicle INT(11) NOT NULL,
	date DATE NOT NULL,
	destination VARCHAR(50) NOT NULL,
	kilometres INT(11) NOT NULL,
	id_employee INT(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicle (
	id_vehicle INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS summarySalary(
	totalSalary FLOAT(11)
);

ALTER TABLE employee 
	ADD FOREIGN KEY (id_office) REFERENCES office(id_office);

ALTER TABLE reservation 
	ADD FOREIGN KEY (id_vehicle) REFERENCES vehicle(id_vehicle);

ALTER TABLE reservation 
	ADD FOREIGN KEY (id_employee) REFERENCES employee(id_employee);

{
	-- CREATE PROCEDURE higherSalary @salary FLOAT(8,2)
	-- AS
	-- 	SELECT * FROM employee WHERE salary >= @salary
	-- GO;
}

-- FILL TABLES

INSERT INTO office VALUES
(1, 'Avenida Atahualpa', 'Quito', 'Pichincha');

INSERT INTO employee VALUES
(1, 'Pedro', 'Lopez', '550.28', '1', '2021-09-01'),
(2, 'Marta', 'Morales', '950.28', '1', '2021-09-03'),
(3, 'Alejandro', 'Alvarez', '225.78', '1', '2021-08-15');

INSERT INTO employee VALUES
(4, 'Roberto', 'Fernandez', '775.22', '1', '2021-07-18');

-- SOTORED PROCEDURES

DELIMITER //
CREATE PROCEDURE getMaxSalary (OUT maxSalary FLOAT(8,2))
BEGIN
	SELECT MAX(salary) INTO maxSalary FROM employee;
END;
//


DELIMITER //
CREATE PROCEDURE getMinSalary (OUT minSalary FLOAT(8,2))
BEGIN
	SELECT MIN(salary) INTO minSalary FROM employee;
END;
//

-- TRIGGERS

DELIMITER //
CREATE TRIGGER beforeEmployeeInsert
BEFORE INSERT
ON employee FOR EACH ROW
BEGIN
    DECLARE rowcount INT;
    
    SELECT COUNT(*) 
    INTO rowcount
    FROM summarySalary;
    
    IF rowcount > 0 THEN
        UPDATE summarySalary
        SET totalSalary = totalSalary + new.salary;
    ELSE
        INSERT INTO summarySalary(totalSalary)
        VALUES(new.salary);
    END IF; 
END;
//
