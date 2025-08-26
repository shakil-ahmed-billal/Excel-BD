# 🚀 Courier & Parcel Management System (MERN Stack)

![Project Banner](https://your-image-link.com/banner.png)

A **modern, full-stack courier and parcel management system** built with **MERN Stack (MongoDB, Express, React, Node.js)**. Designed to streamline logistics operations, it enables customers to book parcels, track deliveries, agents to manage assignments, and admins to monitor and report operations in real-time.

---

## 🎯 Project Objective

To develop a **comprehensive logistics solution** that allows:

- Customers to book parcels and track deliveries in real-time.
- Delivery agents to manage and optimize assigned deliveries.
- Admins to monitor operational metrics, assign agents, and generate reports.

The system supports **real-world courier scenarios**, including COD payments, failed deliveries, and parcel analytics.

---

## 🌟 Features

### Customer Dashboard
- **Register/Login** with role-based access.
- **Parcel Booking**: Enter pickup & delivery addresses, parcel type/size, COD or prepaid.
- **Booking History**: View past bookings and status updates.
- **Real-Time Tracking**: Track parcels on an interactive Google Map.
- **Notifications**: Receive updates via email/SMS (optional).

### Delivery Agent Dashboard
- **Parcel Management**: View all assigned parcels.
- **Status Updates**: Update parcel status — Picked Up, In Transit, Delivered, Failed.
- **Optimized Routes**: Suggested delivery routes using **Google Maps API**.
- **QR/Barcode Scan**: Confirm pickup and delivery using QR codes or barcodes.

### Admin Dashboard
- **User Management**: View all customers and delivery agents.
- **Parcel Assignment**: Assign agents to parcels.
- **Analytics & Reports**: Daily bookings, COD amounts, failed deliveries.
- **Export Data**: Download CSV/PDF reports for analysis.
- **Role-Based Access Control**: Secure dashboards and endpoints.

---

## 🛠️ Technology Stack

| Layer       | Technologies & Tools                                         |
|------------|---------------------------------------------------------------|
| Frontend   | React, Tailwind CSS, React Router, react-hot-toast, Axios      |
| Backend    | Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.IO        |
| APIs       | Google Maps API, Geolocation Tracking, QR/Barcode Generation  |
| Hosting    | Vercel (Frontend), Heroku/Render (Backend), MongoDB Atlas     |
| Tools      | Postman, Git, GitHub, VS Code, ESLint, Prettier              |

---

## 🗂️ Backend API Endpoints

- **Auth**
  - `POST /api/user/register` – Register new user with roles
  - `POST /api/user/login` – Login user and return JWT token
- **Parcel Management**
  - `POST /api/parcel` – Create parcel
  - `GET /api/parcel/:id` – View parcel details
  - `PUT /api/parcel/:id` – Update parcel status
  - `DELETE /api/parcel/:id` – Remove parcel (Admin only)
- **Agent Assignment**
  - `POST /api/parcel/assign` – Assign agent to parcel
- **Analytics & Reports**
  - `GET /api/admin/reports` – Fetch CSV/PDF reports
- **Real-Time Tracking**
  - `GET /api/parcel/track/:id` – Get live parcel location

> All endpoints are secured using **JWT** and role-based access middleware.

---

## ⚡ Advanced Features

- **QR/Barcode Confirmation**: Agents can scan parcels to confirm pickup or delivery.
- **Real-Time Updates**: Parcel status updates broadcasted with **Socket.IO**.
- **Email & SMS Notifications**: Customers get real-time alerts for status changes.
- **Multi-Language Support**: English & Bengali.
- **Responsive UI**: Optimized for desktop, tablet, and mobile devices.
- **Interactive Maps**: Google Maps integration for parcel tracking and route optimization.

---

## 👨‍💻 Demo Login Credentials

| Role     | Email               | Password   |
|----------|-------------------|------------|
| Admin    | admin@gmail.com    | admin123   |
| Agent    | agent@gmail.com    | agent123   |
| Customer | customer@gmail.com | customer123|

---

## 🌐 Live Demo

- **Frontend:** [https://excel-bd.vercel.app/](https://excel-bd.vercel.app/)  
- **Backend/API:** [https://server-eight-plum.vercel.app/](https://server-eight-plum.vercel.app/)

---

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](https://your-image-link.com/admin-dashboard.png)

### Customer Dashboard
![Customer Dashboard](https://your-image-link.com/customer-dashboard.png)

### Delivery Agent Dashboard
![Agent Dashboard](https://your-image-link.com/agent-dashboard.png)

### Parcel Tracking
![Parcel Tracking](https://your-image-link.com/parcel-tracking.png)

---

## 🚀 Setup & Installation

### Clone Repository
```bash
git clone <your-repo-url>
cd courier-parcel-management
