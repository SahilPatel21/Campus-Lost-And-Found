# 🎓 Campus Lost and Found Portal

> **Full-Stack Academic Web Application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS**  
> *Designed for College Project Demonstration, Practical Examination & Faculty Viva Evaluation.*

---

## 📑 Table of Contents

1. [Executive Summary & Abstract](#1-executive-summary--abstract)
2. [Key Features](#2-key-features)
3. [System Architecture & Flow](#3-system-architecture--flow)
4. [Technology Stack](#4-technology-stack)
5. [Project Folder Structure](#5-project-folder-structure)
6. [Database Design & Data Models](#6-database-design--data-models)
7. [REST API Specification](#7-rest-api-specification)
8. [Complete Postman API Testing Guide](#8-complete-postman-api-testing-guide)
9. [How to Run on ANY Computer (New PC Setup Guide)](#9-how-to-run-on-any-computer-new-pc-setup-guide)
10. [College Viva & Oral Exam Preparation (16 Key Q&A)](#10-college-viva--oral-exam-preparation)
11. [2-Minute Faculty Demonstration Script](#11-2-minute-faculty-demonstration-script)

---

## 1. Executive Summary & Abstract

### 1.1 The Problem
In busy college campuses with thousands of students, faculty members, and staff, personal belongings are misplaced daily — ranging from critical academic assets (Student ID cards, notebooks, scientific calculators, laboratory coats) to expensive personal valuables (laptops, wireless earbuds, keys, and wallets). 

Currently, campuses rely on unorganized bulletin boards, physical security registers, or chaotic social media/WhatsApp groups. These methods are:
- **Unsearchable:** Messages get lost within minutes of conversation.
- **Unverified:** No structured verification of ownership.
- **Slow & Inaccessible:** Students often never recover items lost in different campus blocks or lecture halls.

### 1.2 The Solution
The **Campus Lost and Found Portal** provides a centralized, authenticated, digital platform. Students and faculty can:
1. Quickly browse an up-to-date campus feed with real-time keyword search and category filters.
2. Report lost or found items with photos uploaded directly from their smartphone or computer.
3. Manage their listings via a private, dedicated **User Dashboard**.
4. Securely verify ownership and transition items through their lifecycle from **Open** to **Returned**.

The system is **100% free and open-source**, runs completely on local host environments without paid cloud hosting (no AWS S3 or Cloudinary bills), and adheres strictly to industry-standard **Model-View-Controller (MVC)** architectural practices.

---

## 2. Key Features

- 🔐 **Secure User Authentication:**
  - Student, Faculty, and Staff registration with automatic role tagging.
  - Password encryption using salted hashes (`bcryptjs`, 10 rounds).
  - Stateless session authorization using JSON Web Tokens (JWT).
  - Client-side token storage in `localStorage` with automatic session restoration on browser refresh.
  - Route guarding with `ProtectedRoute` for private actions.

- 📸 **Direct Device Photo Uploads (100% Free):**
  - Direct image uploads from computer folders, phone galleries, or device cameras using `multer`.
  - Local backend disk storage in `server/uploads/` with public static serving.
  - File validation (JPEG, PNG, WEBP, GIF, max 5 MB).
  - Dual-mode image selector allowing either direct device upload or pasting an external web link.

- 🔍 **Dynamic Multi-Criteria Search & Filtering:**
  - Real-time case-insensitive keyword search by item name.
  - Filter by item type: `Lost` vs. `Found`.
  - Filter by status: `Open` (active) vs. `Returned` (resolved).
  - Filter by category: `Electronics`, `ID Cards & Documents`, `Books & Stationery`, `Keys`, `Bags & Wallets`, `Clothing`, `Other`.
  - Instant one-click filter reset.

- 📊 **Interactive Personal Dashboard:**
  - Authenticated user metrics: Total Items Reported, Lost Count, Found Count, Returned Count.
  - Single-click **"Mark as Returned"** status toggle to close resolved cases.
  - Full item management (View Details, Edit, Delete).

- 🎨 **Modern Responsive UI (Tailwind CSS):**
  - Modern academic theme with deep indigo and amber accents.
  - Fully mobile-responsive layout for smartphones, tablets, and laptops.
  - Animated notifications and toast alerts using `react-hot-toast`.
  - Clean iconography using `react-icons`.

- ⚡ **Single-Command Startup:**
  - Pre-configured `concurrently` runner in root `package.json` to launch frontend (port 5173) and backend (port 5000) simultaneously with `npm run dev`.
  - One-click Windows launcher (`start-app.bat`).

---

## 3. System Architecture & Flow

The project follows a decoupled **Client-Server MVC Architecture**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (React 18 + Vite)                      │
│                                                                        │
│  [ Pages & UI Components ] ───> [ AuthContext & useAuth() ]            │
│                 │                               │                      │
│                 └─────────> [ Axios Service Layer (api.js) ]           │
│                                                 │                      │
│                                   (JWT Bearer Token in Header)         │
└─────────────────────────────────────────────────┼──────────────────────┘
                                                  │ HTTP Requests (Port 5000)
┌─────────────────────────────────────────────────┼──────────────────────┐
│                                                 ▼                      │
│                        EXPRESS.JS REST API BACKEND                     │
│                                                                        │
│  [ Middleware ] ───> authMiddleware (JWT) & errorMiddleware (404/500)   │
│         │                                                              │
│  [ Controllers ] ──> authController  itemController  uploadController  │
│         │                   │               │               │          │
│  [ Local Storage ]          │               │       [ /uploads/ ]      │
│         │                   ▼               ▼                          │
│  [ Mongoose ODM ] ────>  User Model     Item Model                     │
│                             │               │                          │
└─────────────────────────────┼───────────────┼──────────────────────────┘
                              ▼               ▼
                      ┌───────────────────────────────┐
                      │    MONGODB DATABASE (NoSQL)   │
                      │    Database: campusLostFound  │
                      │    Collections: users, items  │
                      └───────────────────────────────┘
```

---

## 4. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React.js | 18.3.x | Component-based UI rendering with virtual DOM |
| **Frontend Build Tool** | Vite | 5.4.x | Fast development server and production bundler |
| **Routing** | React Router DOM | 6.26.x | Client-side declarative routing and protected routes |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first responsive CSS styling |
| **HTTP Client** | Axios | 1.7.x | Asynchronous API communication with request interceptors |
| **Icons** | React Icons | 5.2.x | Feather Icons (`fi`) for clean user interface elements |
| **Notifications** | React Hot Toast | 2.4.x | Animated toast notifications for user actions |
| **Backend Runtime** | Node.js | v18+ | Server-side JavaScript runtime environment |
| **Web Framework** | Express.js | 4.19.x | RESTful API routing, middleware pipeline, and controllers |
| **Database** | MongoDB | v6.0+ | Document-oriented NoSQL database |
| **ODM Library** | Mongoose | 8.5.x | Data schemas, models, and validation rules |
| **Authentication** | JSON Web Token | 9.0.x | Signed bearer tokens for stateless authorization |
| **Password Security** | Bcrypt.js | 3.0.x | Salted hashing algorithm for user passwords |
| **File Handling** | Multer | 2.5.x | Multipart/form-data handler for local image uploads |
| **API Logger** | Morgan | 1.12.x | HTTP request logging for development debugging |
| **Multi-Process Runner**| Concurrently | 8.2.x | Runs frontend and backend servers together |

---

## 5. Project Folder Structure

```text
Lost And Found/
├── package.json                   # Root orchestrator: starts frontend & backend together
├── start-app.bat                  # 1-Click desktop launcher for Windows
├── Postman_Collection.json        # Pre-configured Postman API collection
├── README.md                      # Comprehensive project documentation
├── campus-lost-found.zip          # Complete downloadable project archive
│
├── server/                        # Backend REST API (Node.js, Express, MongoDB)
│   ├── config/
│   │   └── db.js                  # Database connection module
│   ├── controllers/
│   │   ├── authController.js      # User registration, login, profile logic
│   │   ├── itemController.js      # CRUD, search, filter, and user item logic
│   │   └── uploadController.js    # Multer photo upload handler
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT token guard (protect, optionalProtect)
│   │   └── errorMiddleware.js     # Global 404 & centralized error handler
│   ├── models/
│   │   ├── Item.js                # Item Mongoose schema with User ref
│   │   └── User.js                # User Mongoose schema with bcrypt hashing
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth route definitions
│   │   ├── itemRoutes.js          # /api/items route definitions
│   │   └── uploadRoutes.js        # /api/upload route definitions
│   ├── uploads/                   # Physical storage directory for uploaded photos
│   ├── utils/
│   │   ├── generateToken.js       # JWT creation helper
│   │   └── validators.js          # Email and password regex validators
│   ├── seed.js                    # Seeder script populating 6 sample campus items
│   ├── server.js                  # Main server entrypoint
│   ├── .env                       # Active server environment variables
│   └── .env.example               # Environment variables template
│
└── client/                        # Frontend Application (React 18, Vite, Tailwind CSS)
    ├── src/
    │   ├── components/
    │   │   ├── Footer.jsx           # Clean college project footer
    │   │   ├── ImageUploadInput.jsx # Dual-mode photo selector (File/URL)
    │   │   ├── ItemCard.jsx         # Card with badges and status controls
    │   │   ├── Loader.jsx           # Animated loading spinner
    │   │   ├── Navbar.jsx           # Navigation bar with user dropdown
    │   │   ├── ProtectedRoute.jsx   # Route guard for authenticated actions
    │   │   └── SearchFilter.jsx     # Search bar and dropdown filters
    │   ├── context/
    │   │   └── AuthContext.jsx      # Global authentication state & useAuth() hook
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx        # Login page with password show/hide
    │   │   │   └── Register.jsx     # Registration with student/faculty roles
    │   │   ├── dashboard/
    │   │   │   └── Dashboard.jsx    # User dashboard for my reported items
    │   │   ├── items/
    │   │   │   ├── EditItem.jsx     # Edit item & status toggle
    │   │   │   ├── ItemDetail.jsx   # Full single item details & copy contact
    │   │   │   └── ReportItem.jsx   # Report new lost or found item
    │   │   ├── About.jsx            # Project mission & safety guidelines
    │   │   └── Landing.jsx          # Public feed, hero & statistics bar
    │   ├── services/
    │   │   ├── api.js               # Central Axios instance with token interceptor
    │   │   ├── authService.js       # Auth API functions
    │   │   └── itemService.js       # Items & upload API functions
    │   ├── App.jsx                  # Main router with toast notifications
    │   ├── index.css                # Tailwind base & component classes
    │   └── main.jsx                 # React root renderer
    ├── index.html                   # HTML template with Google Fonts (Inter)
    ├── postcss.config.js            # PostCSS configuration
    ├── tailwind.config.js           # Custom Tailwind theme matching the project
    └── vite.config.js               # Vite configuration
```

---

## 6. Database Design & Data Models

Database Name: **`campusLostFound`**

### 6.1 `User` Model (`server/models/User.js`)
Stores authenticated students, faculty, and campus staff.

```javascript
{
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  password:    { type: String, required: true, select: false }, // Hashed with bcryptjs
  phone:       { type: String, default: '' },
  role:        { type: String, enum: ['STUDENT', 'FACULTY', 'STAFF'], default: 'STUDENT' },
  campusId:    { type: String, default: '' },
  isActive:    { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
}
```
- **Security Feature:** Password is removed from JSON responses automatically using `userSchema.methods.toJSON()`.
- **Pre-Save Middleware:** Passwords are automatically hashed with `bcrypt.genSalt(10)` prior to saving in MongoDB.

### 6.2 `Item` Model (`server/models/Item.js`)
Stores reported lost and found items.

```javascript
{
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category:    { type: String, required: true, default: 'Other' },
  type:        { type: String, required: true, enum: ['Lost', 'Found'] },
  location:    { type: String, required: true, trim: true },
  date:        { type: Date, required: true },
  contact:     { type: String, required: true, trim: true },
  imageUrl:    { type: String, default: '' },
  status:      { type: String, enum: ['Open', 'Returned'], default: 'Open' },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reportedBy:  { type: String, default: 'Campus Member' },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
}
```

---

## 7. REST API Specification

Base URL: **`http://localhost:5000/api`**

| HTTP Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Verify server health and database connectivity |
| `POST` | `/auth/register` | Public | Register a new user account with hashed password |
| `POST` | `/auth/login` | Public | Authenticate user and receive a JWT token |
| `GET` | `/auth/me` | **Private** | Fetch profile data of the currently logged-in user |
| `GET` | `/items` | Public | Retrieve all items with optional search & filter params |
| `GET` | `/items/:id` | Public | Retrieve a single item by its MongoDB `_id` |
| `POST` | `/items` | Public/Auth | Create and save a new lost or found item |
| `PUT` | `/items/:id` | Public/Auth | Update item details or change status to Returned |
| `DELETE` | `/items/:id` | Public/Auth | Permanently delete an item from MongoDB |
| `GET` | `/items/my-items`| **Private** | Retrieve only items reported by the logged-in user |
| `POST` | `/upload` | Public | Upload item photo via Multer (stored in `/uploads`) |

---

## 8. Complete Postman API Testing Guide

You can test all endpoints using **Postman in VS Code** or the desktop Postman application.

### Import the Ready-to-Use Postman Collection
1. Open Postman.
2. Click **Import** (top left).
3. Select the file: [`Postman_Collection.json`](file:///c:/Users/sahil/Desktop/Lost%20And%20Found/Postman_Collection.json).
4. All endpoints will load into a collection named **`Campus Lost and Found Portal API (with Auth)`**.

---

### Step-by-Step API Execution Sequence & Sample Data

#### 1. Server Health Check
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/health`
- **Expected Status:** `200 OK`
- **Expected Output:**
```json
{
  "success": true,
  "message": "Campus Lost and Found Portal API is running",
  "timestamp": "2026-11-01T08:30:00.000Z"
}
```

#### 2. Register a New Student / Faculty Account
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
```json
{
  "name": "Sahil Sharma",
  "email": "sahil.student@college.edu",
  "phone": "9876543210",
  "role": "STUDENT",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- **Expected Status:** `201 Created`
- **Output:** Returns user object and a signed `token`. Copy this token!

#### 3. User Login
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
```json
{
  "email": "sahil.student@college.edu",
  "password": "password123"
}
```
- **Expected Status:** `200 OK`
- **Output:** Returns authentication token and user information.

#### 4. Get Current User Profile (Protected)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/auth/me`
- **Headers:** `Authorization: Bearer <PASTE_TOKEN_HERE>`
- **Expected Status:** `200 OK`

#### 5. Upload Item Photo from Device (Multer)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/upload`
- **Body:** Select `form-data`
  - Key: `image` (Type: File)
  - Value: Select an image file (JPG or PNG) from your PC
- **Expected Status:** `200 OK`
- **Expected Output:**
```json
{
  "success": true,
  "message": "Photo uploaded successfully!",
  "filename": "item-1793440909443-428798597.png",
  "imageUrl": "http://localhost:5000/uploads/item-1793440909443-428798597.png"
}
```

#### 6. Report a Lost Item
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/items`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <TOKEN>` *(Optional)*
- **Request Body (JSON):**
```json
{
  "title": "Casio Scientific Calculator fx-991EX",
  "description": "Left my black Casio scientific calculator in Physics Lecture Hall 2 on desk 4 after the 3rd period.",
  "category": "Electronics",
  "type": "Lost",
  "location": "Science Block, Lecture Hall 2",
  "date": "2026-10-25",
  "contact": "Sahil Sharma - 9876543210 (Hostel Room 104)",
  "imageUrl": "http://localhost:5000/uploads/item-1793440909443-428798597.png",
  "status": "Open"
}
```
- **Expected Status:** `201 Created`
- **Output:** Copy the generated `_id` of the created item!

#### 7. Report a Found Item
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/items`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
```json
{
  "title": "Set of 3 Keys with Batman Keychain",
  "description": "Found a ring with 2 cupboard keys, 1 bike key, and a black Batman rubber keychain near the bike parking area.",
  "category": "Keys",
  "type": "Found",
  "location": "East Wing Two-Wheeler Parking",
  "date": "2026-10-26",
  "contact": "Main Gate Security Office (Ext: 104)",
  "imageUrl": "",
  "status": "Open"
}
```
- **Expected Status:** `201 Created`

#### 8. Retrieve All Items
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/items`
- **Expected Status:** `200 OK`

#### 9. Search Items by Keyword
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/items?search=calculator`
- **Expected Status:** `200 OK`

#### 10. Filter Items by Type and Status
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/items?type=Lost&status=Open`
- **Expected Status:** `200 OK`

#### 11. Retrieve Single Item by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/items/<ITEM_ID>`
- **Expected Status:** `200 OK`

#### 12. Update Item / Mark as Returned
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/items/<ITEM_ID>`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
```json
{
  "status": "Returned"
}
```
- **Expected Status:** `200 OK`

#### 13. Get My Reported Items (User Dashboard)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/items/my-items`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Expected Status:** `200 OK`

#### 14. Delete an Item
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/items/<ITEM_ID>`
- **Expected Status:** `200 OK`

---

## 9. How to Run on ANY Computer (New PC Setup Guide)

Follow these exact steps to run this project on any college computer, personal laptop, or evaluation system:

### 9.1 Prerequisites
Make sure the target computer has:
1. **Node.js** installed (v18 or higher): Check by running `node -v` in terminal.  
   *(If not installed, download from [nodejs.org](https://nodejs.org/) — ensure "Add to PATH" is checked).*
2. **MongoDB Database:** Choose either of the two easy options below:
   - **Option A (Local MongoDB):** Install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and ensure the service is running on `127.0.0.1:27017`.
   - **Option B (Free Cloud MongoDB Atlas — No local installation required!):** Create a free database on [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas), copy your connection string, and paste it into `server/.env`.

---

### 9.2 Extract and Setup Files
1. Copy or extract the project folder (`Lost And Found` or `campus-lost-found.zip`) to your desired location (e.g., Desktop).
2. Open the folder in **VS Code** or open a terminal inside this directory.

---

### 9.3 Install Dependencies
Open terminal in the project root directory and execute:
```bash
# 1. Install root dependencies (concurrently)
npm install

# 2. Install backend dependencies
npm install --prefix server

# 3. Install frontend dependencies
npm install --prefix client
```

---

### 9.4 Configure Environment Variables (`.env`)
Verify the `server/.env` file exists:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campusLostFound
JWT_SECRET=campus_secret_key_2024_lost_found_portal
CLIENT_URL=http://localhost:5173
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your cloud URI).*

---

### 9.5 Populate Sample College Data (Recommended for Viva)
Run this command from the project root to seed realistic campus items:
```bash
npm run seed
```
*Output: `🎉 Successfully seeded 6 items!`*

---

### 9.6 Start Both Servers Together (1 Single Command)
From the project root folder:
```bash
npm run dev
```

*(On Windows, you can also simply **double-click** [`start-app.bat`](file:///c:/Users/sahil/Desktop/Lost%20And%20Found/start-app.bat) to launch everything).*

**What happens next:**
- The **Backend Server** starts on: **`http://localhost:5000`**
- The **Frontend App** opens on: **`http://localhost:5173`**
- Both processes run together in one unified terminal window!

---

## 10. College Viva & Oral Exam Preparation

Here are the 16 most common questions asked by college faculty and external viva examiners, explained in clear, simple terms:

### Q1: What is the MERN stack?
> **Answer:** MERN is an acronym for four technologies:
> 1. **MongoDB:** A document-oriented NoSQL database that stores data in JSON-like BSON documents.
> 2. **Express.js:** A lightweight Node.js web application framework that handles routing, middlewares, and HTTP requests.
> 3. **React.js:** A frontend JavaScript library for building dynamic component-driven user interfaces.
> 4. **Node.js:** A cross-platform JavaScript runtime built on Chrome's V8 engine to execute JavaScript on the server.
> Together, they allow developers to build full-stack web applications using a single programming language: JavaScript.

### Q2: What is MVC architecture and how is it implemented in this project?
> **Answer:** MVC stands for **Model-View-Controller**:
> - **Model (`server/models/`):** Defines the data schema, structure, and database rules (`User.js`, `Item.js`).
> - **View (`client/src/`):** The React user interface displayed to the user in the browser.
> - **Controller (`server/controllers/`):** Contains the business logic (`authController.js`, `itemController.js`). Controllers receive HTTP requests from routes, query the models, process the data, and return JSON responses.

### Q3: Why did you separate the frontend and backend into two folders (`client` and `server`)?
> **Answer:** This represents the **Separation of Concerns** principle. The client runs inside the user's browser, whereas the server runs on a protected environment. Directly connecting React to MongoDB in the browser would expose database credentials and create severe security vulnerabilities. Keeping them separate allows the backend to act as a secure gatekeeper exposing a REST API.

### Q4: How does JWT authentication work in this application?
> **Answer:** 
> 1. When a user submits valid login credentials, Express verifies the password using `bcrypt.compare()` and generates a signed **JSON Web Token (JWT)** using `jwt.sign()`.
> 2. The token is sent to the client and saved in `localStorage`.
> 3. An Axios request interceptor (`api.js`) automatically reads the token and attaches it to the `Authorization: Bearer <token>` header on every subsequent request.
> 4. The backend `authMiddleware.js` verifies the token using `jwt.verify()` before granting access to private routes like `/api/auth/me` or `/api/items/my-items`.

### Q5: Why do we hash passwords with `bcryptjs` instead of storing them directly?
> **Answer:** Storing plain text passwords in a database is dangerous. If the database is compromised, user credentials are leaked. `bcryptjs` applies a one-way mathematical hashing algorithm combined with a cryptographic salt (10 rounds in our project). Even if someone reads the database, the original password cannot be decrypted.

### Q6: How does image upload work without paid cloud services (AWS S3 or Cloudinary)?
> **Answer:** We use the open-source **`multer`** middleware in Node.js. When a student selects a photo from their computer or smartphone, it is transmitted as `multipart/form-data` to `POST /api/upload`. Multer validates that the file is an image under 5 MB, assigns it a collision-free timestamped filename, and saves it in `server/uploads/`. Express exposes this directory statically using `app.use('/uploads', express.static(...))`.

### Q7: What are Axios interceptors and why are they used?
> **Answer:** Axios interceptors are middleware functions that run before a request is sent or after a response is received:
> - **Request Interceptor:** Automatically attaches the JWT bearer token from `localStorage` to every outgoing API call, eliminating the need to manually set headers in every component.
> - **Response Interceptor:** Detects if the backend returned a `401 Unauthorized` (expired session) and automatically clears `localStorage` so the user is prompted to log in again.

### Q8: How do search and filter queries work on the backend?
> **Answer:** In `itemController.js`, we inspect `req.query`. If a search string is provided, we construct a MongoDB query using case-insensitive regular expressions: `{ title: { $regex: search, $options: 'i' } }`. We also append exact-match filters for `type` (`Lost`/`Found`), `status` (`Open`/`Returned`), and `category`. Mongoose then executes `Item.find(filter).sort({ createdAt: -1 })`.

### Q9: What is the difference between `PUT` and `POST`?
> **Answer:**
> - `POST` is used to create a **new** record (e.g. `POST /api/items` adds a new document and returns status `201 Created`).
> - `PUT` is used to update or modify an **existing** record by ID (e.g. `PUT /api/items/:id` changes the item status to "Returned" and returns status `200 OK`).

### Q10: What is the difference between SQL and NoSQL (MongoDB)?
> **Answer:** 
> - SQL databases (like MySQL) are relational, table-based, and enforce rigid tabular schemas with foreign keys.
> - NoSQL databases (like MongoDB) are non-relational, document-oriented, and store records as flexible BSON documents. MongoDB is horizontally scalable and pairs natively with JavaScript and Node.js.

### Q11: What is the purpose of the `.env` file?
> **Answer:** A `.env` file stores **environment variables**—configuration settings and secrets such as database connection URIs, port numbers, and JWT secret keys—outside of the application source code. The `.env` file is added to `.gitignore` so sensitive credentials are never committed to version control.

### Q12: How does `concurrently` run both frontend and backend together?
> **Answer:** `concurrently` is a Node.js utility that spawns multiple subprocesses in parallel within a single command-line interface. Our root `package.json` script executes both `npm run dev --prefix server` and `npm run dev --prefix client` concurrently, with color-coded terminal prefixes (`[SERVER]` and `[CLIENT]`).

### Q13: What React Hooks are used in this project?
> **Answer:**
> - `useState`: Manages local component state (form inputs, item lists, filter options).
> - `useEffect`: Triggers side effects such as fetching API data on mount and listening to filter changes.
> - `useContext`: Provides global access to authentication state (`useAuth()`) across the entire component tree.
> - `useCallback`: Memoizes authentication functions (`login`, `register`, `logout`) to prevent unnecessary re-renders.

### Q14: How does `ProtectedRoute` guard private routes in React?
> **Answer:** `ProtectedRoute` is a higher-order wrapper component. It inspects `isAuthenticated` from `AuthContext`. If the user is authenticated, it renders the child component (e.g., `<Dashboard />`). If not, it redirects the visitor to `/login` using `<Navigate to="/login" replace state={{ from: location }} />`.

### Q15: What standard HTTP status codes are implemented?
> **Answer:**
> - `200 OK`: Request succeeded (GET, PUT, DELETE).
> - `201 Created`: New resource successfully created (POST register, POST items).
> - `400 Bad Request`: Client input validation error (missing required fields, passwords do not match).
> - `401 Unauthorized`: Missing or invalid authentication token.
> - `404 Not Found`: Resource or endpoint does not exist.
> - `500 Internal Server Error`: Unexpected server-side failure.

### Q16: How do you demonstrate and test this API using Postman?
> **Answer:** We import [`Postman_Collection.json`](file:///c:/Users/sahil/Desktop/Lost%20And%20Found/Postman_Collection.json) into Postman. We select the HTTP method, enter the endpoint URL (`http://localhost:5000/api/...`), configure request headers and JSON bodies, and send requests. Postman displays the exact HTTP status code, response time, and structured JSON output.

---

## 11. 2-Minute Faculty Demonstration Script

Follow this structured script when presenting this project to your college professor or external viva examiner:

1. **Introduction (15 seconds):**
   > *"Good morning/afternoon, Sir/Madam. Today I am presenting our college project: **Campus Lost and Found Portal**, developed using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js) with **Tailwind CSS** styling and an **MVC** architecture."*

2. **The Problem & Objective (20 seconds):**
   > *"On large college campuses, students frequently lose essential items like ID cards, calculators, chargers, and keys. Traditional WhatsApp groups or physical noticeboards are chaotic and unsearchable. Our portal provides a centralized, searchable platform where anyone can report a lost item or list an item they found in seconds."*

3. **Live Demonstration (60 seconds):**
   - **Show Home Feed:** Point out the quick statistics bar and the cards with category badges, date, and location.
   - **Demonstrate Search & Filtering:** Type `"calculator"` in the search bar to demonstrate real-time search. Select the `Lost` or `Found` filter to show MongoDB query filtering.
   - **Demonstrate Photo Upload & Reporting:** Click **"Report an Item"**, choose a photo directly from your device, fill in the details, and submit. Show that it appears immediately at the top of the feed.
   - **Demonstrate Item Details & Status Update:** Click on an item to view its details. Click **"Mark as Returned"** to show how the status transitions from `Open` to `Returned`.
   - **Demonstrate Authentication & Dashboard:** Log in with a student account, show the profile dropdown in the navbar, and navigate to **My Dashboard** to show user-specific item management.

4. **Technical Architecture & Closing (25 seconds):**
   > *"From a technical perspective, we designed a clean REST API with full CRUD endpoints. Data validation is handled on both the frontend form and backend Mongoose schema. Passwords are encrypted with bcrypt, sessions are managed with JWT, and all environment variables are securely decoupled in `.env`. Thank you, and I am happy to answer any questions."*

---

## 👨‍💻 Project Submission Metadata

- **Project Title:** Campus Lost and Found Portal
- **Technology Stack:** MongoDB, Express.js, React.js (Vite), Node.js, Tailwind CSS
- **Architecture:** Client-Server MVC (Model-View-Controller)
- **License:** Open Source for Academic & Educational Purposes
