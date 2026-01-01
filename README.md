# 💼 Jobby App – Job Search Platform

Jobby App is a **React-based job search application** that allows users to authenticate, browse jobs, apply filters, view job details, and explore similar jobs.  
This project demonstrates real-world React concepts such as authentication, protected routes, API integration, loaders, failure views, and dynamic filtering.
This project extends the existing functionality by adding **location-based filtering**, **sticky UI elements**, and improved user experience, while ensuring all existing and new test cases pass successfully.

---

## 🚀 Live Demo

🔗 **Deployed URL**: https://<YOUR-VERCEL-URL>.vercel.app  
🔗 **GitHub Repository**: https://github.com/Elkari-PremSagar/Jobby-App.git

---

## 📌 Project Overview

The Jobby App allows users to:
- Log in securely
- Browse job listings
- Apply filters to find relevant jobs
- View detailed job information
- Handle loading and failure states gracefully

This **enhancement project** builds on top of the existing Jobby App by introducing **new filtering functionality and UI improvements**, following clean code principles.

---

## 🎯 Features

### 🔐 Authentication
- Login using valid credentials
- Displays error message for invalid credentials
- Redirects authenticated users away from Login page
- Protects Home, Jobs, and Job Details routes

### 🏠 Home Route
- Accessible only after login
- Navigates to Jobs route on clicking **Find Jobs**

### 💼 Jobs Route
- Displays user profile
- Fetches jobs with:
  - Employment Type filters
  - Salary Range filter
  - Search input
- Supports multiple filters simultaneously
- Loader displayed during API calls
- Failure View with Retry option
- No Jobs View when job list is empty

### 📄 Job Item Details Route
- Displays detailed job information
- Shows required skills
- Displays life at company section
- Shows similar jobs
- Opens company website in a new tab

### 🚫 Not Found Route
- Shown for invalid URLs

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Class Components)
- **Routing:** React Router DOM
- **Authentication:** JWT Token (Cookies)
- **Styling:** CSS / Styled Components
- **Icons:** React Icons
- **Loader:** react-loader-spinner
- **CSS3**
- **JavaScript (ES6+)**
- **REST APIs**
---

## 🔐 Authentication

- JWT-based authentication
- Token stored using `js-cookie`
- Protected routes redirect unauthenticated users to Login page

---

## 📂 Routes

| Path | Description |
|-----|-------------|
| `/login` | Login Route |
| `/` | Home Route |
| `/jobs` | Jobs Route |
| `/jobs/:id` | Job Item Details Route |
| `/not-found` | Not Found Route |

---

## 🔑 Login Credentials (For Testing)
- **Username: rahul
- **Password: rahul@2021
  
---

## 🔗 APIs Used

### Login API
- **URL:** https://apis.ccbp.in/login
- **Method:** POST

### Profile API
- **URL:** https://apis.ccbp.in/profile
- **Method:** GET

### Jobs API
- **URL:** https://apis.ccbp.in/jobs
- **Method:** GET
- **Query Params:**
  - employment_type
  - minimum_package
  - search

### Job Details API
- **URL:** https://apis.ccbp.in/jobs/:id
- **Method:** GET

---

## 📂 Project Setup

```bash
npm install
npm start

