# Enhanzer Assessment

This project contains a full-stack assessment app with:
- ASP.NET Core backend API
- Angular frontend
- SQL Server database
- Swagger API documentation
- EF Core migration support

## Tech Stack
- Backend: ASP.NET Core 8
- Frontend: Angular 22
- Database: SQL Server
- ORM: Entity Framework Core
- API Docs: Swagger / Swashbuckle

## Project Structure

- `backend/` — ASP.NET Core API
- `frontend/` — Angular frontend

## Prerequisites

Before running this project, install:
- .NET 8 SDK
- Node.js 18+ and npm
- SQL Server (local or remote)
- SQL Server Management Studio (optional, but useful for DB setup)

## 1) Database Setup

### Option A: Use SQL Server Management Studio (SSMS)
1. Open SSMS
2. Connect to your SQL Server instance
3. Create a new database, for example:
   - `EnhanzerAssessmentDb`
4. Run the script below to create the required table:

```sql
CREATE DATABASE EnhanzerAssessmentDb;
GO

USE EnhanzerAssessmentDb;
GO

CREATE TABLE Location_Details (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Location_Code NVARCHAR(200) NOT NULL,
    Location_Name NVARCHAR(200) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);
GO
```

### Option B: Use EF Core migration (recommended)
From the backend folder run:

```bash
dotnet ef database update
```

If `dotnet ef` is not installed yet, install it:

```bash
dotnet tool install --global dotnet-ef
```

Then update your connection string in:
- `backend/appsettings.json`

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=EnhanzerAssessmentDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

## 2) Backend Setup

Open a terminal in the `backend` folder and run:

```bash
dotnet restore
dotnet run
```

Then open Swagger in the browser:
- `http://localhost:5173/swagger`

The API is configured to run on:
- `http://localhost:5173`

## 3) Frontend Setup

Open a terminal in the `frontend` folder and run:

```bash
npm install
npm start
```

Then open:
- `http://localhost:4200`

## 4) Login Flow

The frontend login posts to:
- `POST /api/Auth/login`

The backend calls the external third-party API and validates the login response before allowing access. If invalid credentials are supplied, the backend responds with an unauthorized result and the UI shows the error message.

## 5) Billing Page

The billing page includes:
- item dropdown with fixed values:
  - Mango
  - Apple
  - Banana
  - Orange
  - Grapes
  - Kiwi
  - Strawberry
- batch dropdown populated from the backend `Location_Details` table
- calculated cost, price, margin, and totals

## 6) Swagger

Swagger is enabled in development mode from:
- `Program.cs`

You can access it from:
- `http://localhost:5173/swagger`

## 7) Migration Commands

To create a migration:

```bash
dotnet ef migrations add InitialCreate
```

To apply migrations:

```bash
dotnet ef database update
```

## 8) GitHub

After setting up the repo:

```bash
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Notes

- The SQL script is optional if you use EF Core migrations.
- For the final submission, you can provide either:
  - a generated `.sql` script from your database schema, or
  - the EF migration files plus the script created from them.

## License

This project is for assessment/demo purposes.
