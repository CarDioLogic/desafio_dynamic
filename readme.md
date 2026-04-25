# Project Title

A full-stack application featuring a Laravel backend and a React (Vite) frontend.

## 🚀 Live Production
Check out the live site here: [#site](#site)

---

## Local Development Setup

Follow these steps to get the project running on your machine. You will need two terminal windows open.

### Backend Setup (Laravel)
* **Navigate to the backend:**
  `cd backend`
* **Install dependencies:**
  `composer install`
* **Initialize Environment:**
  `cp .env.example .env && php artisan key:generate`
* **Database Migration & Seeding:**
  `php artisan migrate:fresh --seed`
* **Run the server:**
  `php artisan serve` (Port: 8000)

### Frontend Setup (React)
* **Navigate to the frontend:**
  `cd frontend`
* **Install dependencies:**
  `npm i`
* **Run the project:**
  `npm run dev` (Port: 5174)

---

## Deployment Workflow

| Component | Hosting | Deployment Method |
| :--- | :--- | :--- |
| **Frontend** | GitHub Pages | GitHub Actions (Auto on push to main) |
| **Backend** | InfinityFree | GitHub Actions (Auto on push to main) |

### ⚠️ Important: Database Migrations
InfinityFree does not allow external connections to its MySQL databases. Therefore, any database or migration changes **must be deployed manually**:

1. Export your local database (SQL dump).
2. Log in to the InfinityFree control panel.
3. Import the SQL file via **phpMyAdmin**.

---

## 🛠 Tech Stack

* **Backend:** Laravel `12.57.0` (PHP `8.2.12`)
* **Frontend:** React `19.2.5`
* **Styling:** Tailwind CSS `4.2.4`
* **Environment:** Node.js `v24.11.1`

