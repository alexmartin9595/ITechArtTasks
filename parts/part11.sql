USE EnterpriseDb
GO

SELECT Employee.Name, DATEDIFF(dd, CAST(Career.StartDate AS DATE), CAST(Career.EndDate AS DATE)) AS Experience FROM Employee JOIN Career ON Employee.EmployeeId = Career.EmployeeId