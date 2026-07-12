# Ruhul Amin - Professional Web Developer Portfolio

A premium, full-stack personal portfolio and Content Management System (CMS) built with **Next.js 15 (App Router)**, **MongoDB**, and **Framer Motion**. Designed for high-end aesthetics, smooth micro-animations, and seamless administrative control.

---

## 🚀 Key Features

### 💻 Premium User Experience
*   **Dynamic Banner Section:** Clean, side-gliding fade entry animations with slow-pulsing decorative background glows. Features an infinite-scrolling horizontal developer marquee that pauses on hover.
*   **Split-Grid Bio Layout:** A structured two-column about section highlighting core values, professional highlights, and statistics.
*   **Modern Card Grid Timeline:** Experience and education details are organized into a responsive multi-column grid of hover-reactive glass cards featuring contextual indicator icons.
*   **Interactive Projects Showcase:** Custom dynamic project cards that open a detailed media slider displaying project screenshots and captions.
*   **Certifications & Awards Grid:** A section detailing credentials, complete with direct external verification link indicators.
*   **Responsive Forms:** Contact submission inputs with instant status indicators.

### 🛡️ Admin CMS (Content Management System)
*   **Secure Admin Login:** JWT token-based authentication using HTTP-only cookies.
*   **Tabbed CMS Dashboard:** A centralized dashboard to add, edit, and delete elements across three tabs:
    *   **Projects Tab:** Creates and updates projects. Includes an integrated HTML5 canvas client-side image compressor (optimizes 3-5 screenshots to lightweight base64 JPEG strings) and screenshot caption fields.
    *   **Education & Experience Tab:** Full CRUD control over career timeline entries.
    *   **Certifications & Awards Tab:** Full CRUD control over credentials.
*   **Smart Data Seeding:** Integrates a self-healing seeding engine using database settings. It seeds default items on initial setup but respects all deletions, allowing the administrator to keep lists empty.

---

## 🛠️ Technology Stack

*   **Frontend Core:** React 19, Next.js 15 (App Router, Server Components)
*   **Styling & Layout:** Tailwind CSS v4, PostCSS, Vanilla CSS variables
*   **Animations:** Framer Motion (spring physics, viewport scroll triggers, loop states)
*   **Backend Server:** Next.js Route Handlers (RESTful API endpoints)
*   **Database:** MongoDB, Mongoose (Schema validation, connection pooling)
*   **Authentication:** JSON Web Tokens (JWT), client-side cookies
*   **Icons:** React Icons

---

## 📦 Directory Structure

```text
├── public/                # Static assets (images, default thumbnails)
├── src/
│   ├── app/               # Next.js App Router folders
│   │   ├── admin/         # Login page & CMS dashboard views
│   │   ├── api/           # API routes (auth, projects, education, certs)
│   │   ├── globals.css    # Global stylesheet & animations
│   │   ├── layout.jsx     # App shell (Navbar & Footer wrapper)
│   │   └── page.jsx       # Homepage viewport entry
│   ├── Components/        # Reusable animation & page components
│   │   ├── About.jsx
│   │   ├── Banner.jsx
│   │   ├── Education.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── Projects.jsx
│   ├── lib/
│   │   └── dbConnect.js   # Mongoose database client cache
│   └── models/            # Mongoose MongoDB validation schemas
├── .env.local             # Local environment secrets (ignored by Git)
├── .gitignore             # Git untrack specifications (excludes .next/ caches)
├── jsconfig.json          # Custom path alias mappings (@/* -> src/*)
├── package.json           # Node project scripts & dependencies
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ruhul2003/My-Portfolio.git
    cd My-Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and define the following variables:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Portfolio?appName=Cluster
    JWT_SECRET=your-custom-secure-secret-phrase
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

5.  **Build Production Bundle:**
    ```bash
    npm run build
    npm run start
    ```

---

## 🔒 Security & Optimization Details

*   **Cookie Authentication:** Authentication cookies are stored with HTTP-only flags, protecting them from client-side XSS access.
*   **Image Optimization:** Previews are parsed through a client-side HTML5 canvas compressor, resizing and converting uploaded images into highly compressed JPEG strings before hitting the database, ensuring serverless function payloads stay under Vercel thresholds.
*   **Database connection cache:** The Mongoose client uses a global cache instance in Next.js development mode, preventing connections from accumulating and reaching MongoDB Atlas connection limits during HMR.
