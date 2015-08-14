USE EnterpriseDb
GO

SELECT Department.DepartmentId, Department.Name, result.CountEmployee FROM Department
JOIN (SELECT Career.DepartmentId, COUNT(Career.DepartmentId) AS CountEmployee FROM Career 
	WHERE EndDate > CAST(getdate() as date)
	GROUP BY Career.DepartmentId) result ON Department.DepartmentId = result.DepartmentId
GROUP BY Department.DepartmentId, Department.Name, result.CountEmployee