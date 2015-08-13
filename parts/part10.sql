USE EnterpriseDb
GO

SELECT Employee.Name FROM Employee JOIN Salary ON Employee.EmployeeId = Salary.EmployeeId
	WHERE Salary.SalaryAmount > 1000;