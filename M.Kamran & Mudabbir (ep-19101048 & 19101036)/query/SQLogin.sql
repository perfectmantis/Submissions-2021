USE [POSStock]
GO

SELECT [UserName]
      ,[Password]
  FROM [dbo].[Login] where UserName = 'admin' and Password = 'admin'
GO


