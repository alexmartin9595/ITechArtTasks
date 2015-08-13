USE EnterpriseDb
GO

SELECT EmployeeId, COUNT(EmployeeId) AS SalaryCount, AVG(SalaryAmount) AS AverageSalary  FROM Salary
GROUP BY EmployeeId, Year
HAVING Year = 2015 AND COUNT(EmployeeId) > 1