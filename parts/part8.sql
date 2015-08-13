USE EnterpriseDb
GO

SELECT EmployeeId, AVG(SalaryAmount) AS AverageSalary FROM Salary
WHERE Year = 2015
GROUP BY EmployeeId;