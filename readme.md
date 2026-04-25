# Project Title

A full-stack application featuring a Laravel backend and a React (Vite) frontend.

## 🚀 Live Production
* **/frontend**: Hosted on GitHub Pages ([Live Link](https://cardiologic.github.io/desafio_dynamic/))
* **/backend**: Hosted on render "https://desafio-dynamic.onrender.com/api/"

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
* **(optional) Run tests:**
  `php artisan test`
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
| **Frontend** | GitHub Pages | GitHub Actions (Auto on push) |
| **Backend** | Render | Dockerfile |

### Database Migrations
Migrations to production are handled automatically in the dockerfile using artisan commands.

---

## 🛠  Used Tech Stack and versions

* **Backend:** Laravel `12.57.0` (PHP `8.2.12`)
* **Frontend:** React `19.2.5`
* **Styling:** Tailwind CSS `4.2.4`
* **Environment:** Node.js `v24.11.1`

