USE EnterpriseDb
GO

SELECT Name, Birthdate FROM Employee WHERE  Birthdate = (
	SELECT MIN (Birthdate) FROM Employee); 