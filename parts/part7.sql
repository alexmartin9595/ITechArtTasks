USE EnterpriseDb
GO

SELECT EmployeeId FROM Salary Name WHERE Month = 5 AND Year = 2015 AND SalaryAmount < (
	SELECT SalaryAmount FROM Salary Name WHERE Month < 5 AND Year = 2015);