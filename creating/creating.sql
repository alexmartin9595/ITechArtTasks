CREATE DATABASE EnterpriseDb;
USE EnterpriseDb

CREATE TABLE Department
       (DepartmentId INT  IDENTITY(1,1)       -- код подразделения
             PRIMARY KEY,
    Name NVARCHAR(50)    -- название подразделения
             NOT NULL,  
    DepartmentAddress NVARCHAR(50) )  -- адрес подразделения
;
 

CREATE TABLE Employee
       (EmployeeId INT IDENTITY(1,1)        -- код работника
             PRIMARY KEY,
    Name NVARCHAR(30)     -- фамилия, имя работника
             NOT NULL, 
        Birthdate DATE)          -- дата рождения работника
;

CREATE TABLE Job
       (JobId INT  IDENTITY(1,1)        -- код должности
             PRIMARY KEY,
    JobName NVARCHAR(30)     -- название должности
             NOT NULL, 
        MinSalary INT)     -- минимальный месячный оклад
;
 

CREATE TABLE Career
       (JobId INT       -- код должности
             REFERENCES Job(JobId) NOT NULL,
        EmployeeId INT          -- код работника
             REFERENCES Employee(EmployeeId) NOT NULL,
        DepartmentId INT         -- код подразделения
             REFERENCES Department(DepartmentId),
    StartDate DATE           -- дата приема на работу
             NOT NULL, 
    EndDate DATE)            -- дата увольнения

CREATE TABLE Salary
       (EmployeeId INT        -- код работника
             REFERENCES Employee(EmployeeId),
        Month INT          -- месяц
             CHECK(Month>0 AND Month<13),
        Year INT           -- год
             CHECK(Year>2002 AND Year<2016),
    SalaryAmount INT)      -- зарплата