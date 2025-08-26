# 🛡️ DBView - Web-Based Secure Database Console

Built as part of my internship at **Defence Research and Development Organisation (DRDO)**, **DBView** is a lightweight, extensible, and secure web application for managing SQL databases with role-based access control.

![Node.js](https://img.shields.io/badge/Node.js-Express-informational)
![SQLite3](https://img.shields.io/badge/Database-SQLite3-blue)
![Docker](https://img.shields.io/badge/Containerized-Yes-green)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📖 Overview

DBView is designed to offer a user-friendly web interface for interacting with an SQLite database. Users can view table data, manage entries, and build queries — all within a secure and authenticated environment. While SQLite3 is used in this version, the system can be extended to support additional RDBMS with minimal changes.

> ✅ This was my flagship project during my DRDO internship, highlighting my full-stack capabilities and security-first design.

---

## 📂 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Security](#security)
- [Screenshots](#screenshots)
- [License](#license)
- [Contact](#contact)

---

## 🚀 Features

- View and explore SQLite3 tables through a clean UI
- Dynamic table rendering using Pug templates
- Role-based access control with PassportJS
- REST API structure for future extensibility
- Docker support for seamless deployment

---

## 🧱 Tech Stack

| Layer     | Technology      |
|-----------|------------------|
| Backend   | Node.js, Express |
| Database  | SQLite3          |
| Views     | Pug (Jade)       |
| Auth      | Passport.js      |
| UI Engine | Express Views    |
| Other     | Docker, dotenv    |

---

## ⚙️ Installation

```bash
# Clone the project
git clone https://github.com/pv1823/DB_View.git
cd DB_View

# Install dependencies
npm install
```

---

## ▶️ Usage

```bash
# Start the app
npm start
```

Visit: [http://localhost:3000/viewTable](http://localhost:3000/viewTable)

You’ll see dynamic table rendering from the underlying SQLite3 database.

---

## 🧠 Architecture

```
DB_View/
├── app.js                # Main server
├── bin/www               # Bootstraps Express
├── public/               # Static files (JS/CSS)
├── routes/               # View and DB routes
├── views/                # Pug templates
├── repo/                 # DB interaction logic
├── db_view.sqlite        # SQLite3 DB
├── Dockerfile
├── env → rename to .env
```

---

## 🔐 Security

- **Authentication**: Implemented via **PassportJS** (local strategy)
- **Session Management**: Express-session used with secret key
- **Access Control**: Extendable middleware to guard sensitive routes
- **Environment Config**: `.env` file for secrets and DB path

---

## 📸 Screenshots

> (Add demo GIF or screenshots of the DBView UI showing table list, role-based login, etc.)

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Feel free to reach out with questions or collaboration opportunities:

- GitHub: [@pv1823](https://github.com/pv1823)
- Email: [pv1823@gmail.com](mailto:pv1823@gmail.com)

---

> **Pro Tip:** This project demonstrates full ownership of design, backend development, database interaction, and containerization — ideal for backend/full-stack roles.