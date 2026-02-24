EasyTrip Planner
A full-stack travel booking web application built using React + ASP.NET Core Web API.

 Features:
User Registration & Login (JWT Authentication)
Browse Travel Destinations
Trip Booking System
Cashfree Payment Integration
View Booking History
Feedback & Help Pages



Tech Stack:
Frontend-
React (Vite)
Axios
CSS

Backend-
ASP.NET Core Web API 
Entity Framework Core
MySQL
JWT Authentication
Cashfree Payment Gateway



 Project Structure:
EasyTrip/
│
├── frontend/                 → React Client
├── backend/
│   └── EasyTripPlanner/      → ASP.NET Core API
├── screenshots/
└── README.md


 How to Run Locally:
1️. Backend
cd backend/EasyTripPlanner
dotnet restore
dotnet run
2️. Frontend
cd frontend
npm install
npm run dev


 Environment Configuration-

Sensitive information like:
Database connection string
JWT secret key
Cashfree keys
are stored in : appsettings.Development.json
and are not committed to version control.



 Author:
Aishwarya Ukirade