BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Projects] (
    [Id] NVARCHAR(1000) NOT NULL,
    [Name] VARCHAR(250) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Projects_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2,
    [DeletedAt] DATETIME2,
    CONSTRAINT [Projects_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Projects_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[Tasks] (
    [Id] NVARCHAR(1000) NOT NULL,
    [Name] VARCHAR(250) NOT NULL,
    [Description] VARCHAR(max) NOT NULL,
    [ProjectId] NVARCHAR(1000) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Tasks_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2,
    [DeletedAt] DATETIME2,
    CONSTRAINT [Tasks_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[TimeTrackers] (
    [Id] NVARCHAR(1000) NOT NULL,
    [StartDate] DATETIME2 NOT NULL CONSTRAINT [TimeTrackers_StartDate_df] DEFAULT CURRENT_TIMESTAMP,
    [EndDate] DATETIME2,
    [TimeZoneId] VARCHAR(200) NOT NULL,
    [TaskId] NVARCHAR(1000) NOT NULL,
    [ColaboratorId] NVARCHAR(1000) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [TimeTrackers_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2,
    [DeletedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TimeTrackers_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Collaborators] (
    [Id] NVARCHAR(1000) NOT NULL,
    [Name] VARCHAR(250) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Collaborators_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2,
    [DeletedAt] DATETIME2,
    CONSTRAINT [Collaborators_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [Id] NVARCHAR(1000) NOT NULL,
    [Username] VARCHAR(250) NOT NULL,
    [Password] VARCHAR(512) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Users_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2,
    [DeletedAt] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Users_Username_key] UNIQUE NONCLUSTERED ([Username])
);

-- AddForeignKey
ALTER TABLE [dbo].[Tasks] ADD CONSTRAINT [Tasks_ProjectId_fkey] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Projects]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TimeTrackers] ADD CONSTRAINT [TimeTrackers_TaskId_fkey] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TimeTrackers] ADD CONSTRAINT [TimeTrackers_ColaboratorId_fkey] FOREIGN KEY ([ColaboratorId]) REFERENCES [dbo].[Collaborators]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Collaborators] ADD CONSTRAINT [Collaborators_Id_fkey] FOREIGN KEY ([Id]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
