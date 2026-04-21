# GolfDraw - Golf Subscription & Prize Draw Platform

A full-stack web application where golf enthusiasts subscribe, log their scores, and enter monthly prize draws — with a portion of every subscription going to charity.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcrypt
- **Deployment:** Vercel

## Features

### User Authentication & Roles
- Registration and login with JWT-based authentication
- Three user roles: Visitor, Subscriber, Admin
- Protected routes with role-based access control

### Subscription System
- Monthly and yearly subscription plans
- Subscription status tracking (active, inactive, lapsed)
- Payments split between prize pool and charity contributions

### Golf Score Tracking
- Subscribers log golf scores (1-45)
- Track course name, handicap, weather conditions, round type (9-hole / 18-hole), and notes
- Scores serve as the subscriber's numbers for the monthly draw

### Monthly Prize Draws
- Admin-triggered monthly draws (random or algorithmic)
- Winning numbers generated from range 1-45
- Subscriber scores matched against winning numbers
- Three prize tiers: 5-match, 4-match, 3-match
- Jackpot rollover when top prize is unclaimed

### Winners & Verification
- Automatic winner detection based on score matching
- Proof upload system for winner verification (pending / approved / rejected)
- Prize payment status tracking (pending / paid)

### Charity Integration
- Directory of charities with descriptions, images, and events
- Subscribers choose a charity and set a contribution percentage (10%-100%)
- Total contributions tracked per charity
- Public charity directory and individual charity profile pages

### Admin Panel
- Dashboard with platform-wide statistics
- User management
- Charity management
- Draw execution and management
- Winner management
- Reports generation

### Public Pages
- Landing page
- How It Works explainer
- Charity Directory and Charity Profiles
- Login and Register pages

## Project Structure

```
project/
├── client/                  # React frontend (Vite)
│   └── src/
│       └── pages/
│           ├── public/      # Landing, Login, Register, Charity pages
│           ├── subscriber/  # Dashboard, Scores, Draws, Winnings, Settings
│           └── admin/       # Admin Dashboard, Users, Charities, Draws, Winners, Reports
├── server/                  # Express backend
│   ├── models/              # Mongoose models (User, Score, Draw, Winner, Charity, Payment)
│   ├── routes/              # API routes (auth, scores, charities, payments, draws, dashboard, admin)
│   ├── middleware/          # Auth middleware
│   └── config/             # Database configuration
├── vercel.json              # Vercel deployment config
└── package.json             # Root package with dev scripts
```

## API Endpoints

| Route              | Description                  |
|---------------------|------------------------------|
| `/api/auth`        | Registration, login, profile |
| `/api/scores`      | CRUD operations for golf scores |
| `/api/charities`   | Charity listing and management |
| `/api/payments`    | Subscription and donation payments |
| `/api/draws`       | Draw execution and results |
| `/api/dashboard`   | Subscriber dashboard stats |
| `/api/admin`       | Admin-only management routes |
| `/api/health`      | Health check endpoint |

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

```bash
npm run install:all
```

### Environment Variables

Create a `.env` file inside the `server/` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Run Development Server

```bash
npm run dev
```

This starts both the backend (port 5000) and frontend concurrently.

## How It Works

1. Users **register** and **subscribe** to a monthly or yearly plan
2. Subscribers **log their golf scores** which become their draw numbers
3. Each subscription payment is split between the **prize pool** and the subscriber's **chosen charity**
4. Admin runs a **monthly draw** generating winning numbers
5. Scores are **matched** against winning numbers to determine winners (5-match, 4-match, 3-match)
6. Winners **upload proof**, get **verified**, and receive their **prize payout**
7. Unclaimed jackpots **roll over** to the next month
