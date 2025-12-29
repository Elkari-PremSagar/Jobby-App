# 💼 Jobby App – Job Search Platform

Jobby App is a **React-based job search application** that allows users to authenticate, browse jobs, apply filters, view job details, and explore similar jobs.  
This project demonstrates real-world React concepts such as authentication, protected routes, API integration, loaders, failure views, and dynamic filtering.

---

## 🚀 Project Overview

In this project, we build **Jobby App** by applying all the concepts learned so far in the React course.  
The application fetches data from APIs, handles authentication using JWT tokens, and provides a smooth job-search experience.

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

## ⚙️ Setup Instructions

1️⃣ Clone the repository:
```bash
git clone <repository-url>

