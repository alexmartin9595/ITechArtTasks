USE EnterpriseDb
GO

INSERT INTO Department(Name, DepartmentAddress)
VALUES ('D1','1001');
INSERT INTO Department(Name, DepartmentAddress)
VALUES ('D2','1002');
INSERT INTO Department(Name, DepartmentAddress)
VALUES ('D3','1003');
INSERT INTO Department(Name, DepartmentAddress)
VALUES ('D4','1004');
INSERT INTO Department(Name, DepartmentAddress)
VALUES ('D5','1005');
INSERT INTO Department(Name, DepartmentAddress)
VALUES ('D6','1006');

INSERT INTO Employee(Name,  Birthdate)
VALUES ('Alex', CAST('1995-05-02' as date));
INSERT INTO Employee(Name, Birthdate)
VALUES ('Hanna', CAST('1990-02-27' as date));
INSERT INTO Employee(Name,  Birthdate)
VALUES ('Alan', CAST('1987-12-01' as date));
INSERT INTO Employee(Name,  Birthdate)
VALUES ('Nick', CAST('1992-01-01' as date));
INSERT INTO Employee(Name,  Birthdate)
VALUES ('Igor', CAST('1993-06-03' as date));
INSERT INTO Employee(Name,  Birthdate)
VALUES ('Mike', CAST('1994-01-23' as date));

INSERT INTO Job(JobName, MinSalary)
VALUES ('PR', 350);
INSERT INTO Job(JobName, MinSalary)
VALUES ('HR', 400);
INSERT INTO Job(JobName, MinSalary)
VALUES ('tester', 850);
INSERT INTO Job(JobName, MinSalary)
VALUES ('junior', 1200);
INSERT INTO Job(JobName, MinSalary)
VALUES ('senior', 1750);
INSERT INTO Job(JobName, MinSalary)
VALUES ('team lead', 2500);


INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (1, 2, 2013, 310);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (2, 11, 2014, 380);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (3, 9, 2013, 400);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (4, 10, 2014, 1100);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (5, 8, 2014, 1600);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (6, 9, 2014, 2100);

INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (1, 1, 2015, 350);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (2, 1, 2015, 400);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (3, 1, 2015, 850);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (4, 2, 2015, 1250);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (6, 2, 2015, 1700);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (6, 2, 2015, 2200);

INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (1, 5, 2015, 360);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (2, 5, 2015, 420);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (3, 5, 2015, 890);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (4, 5, 2015, 1000);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (5, 5, 2015, 1800);
INSERT INTO Salary(EmployeeId, Month, Year, SalaryAmount)
VALUES (6, 5, 2015, 2700);

INSERT INTO Career(JobId, EmployeeId, DepartmentId, StartDate, EndDate)
VALUES (1, 1, 1, CAST('2014-12-12' as date), CAST('2015-08-13' as date));
INSERT INTO Career(JobId, EmployeeId, DepartmentId, StartDate, EndDate)
VALUES (2, 2, 6, CAST('2014-08-28' as date), CAST('2015-08-13' as date));
INSERT INTO Career(JobId, EmployeeId, DepartmentId, StartDate, EndDate)
VALUES (3, 3, 2, CAST('2011-02-05' as date), CAST('2015-08-13' as date));
INSERT INTO Career(JobId, EmployeeId, DepartmentId, StartDate, EndDate)
VALUES (4, 4, 5, CAST('2013-08-03' as date), CAST('2015-08-13' as date));
INSERT INTO Career(JobId, EmployeeId, DepartmentId, StartDate, EndDate)
VALUES (4, 5, 4, CAST('2013-11-23' as date), CAST('2015-08-13' as date));
INSERT INTO Career(JobId, EmployeeId, DepartmentId, StartDate, EndDate)
VALUES (4, 6, 3, CAST('2013-07-12' as date), CAST('2015-08-13' as date));