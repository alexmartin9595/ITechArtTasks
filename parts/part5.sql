USE EnterpriseDb
GO

SELECT Name FROM Employee WHERE EmployeeId IN (
	SELECT EmployeeId FROM Salary WHERE Month = 5 AND Year = 2015); 