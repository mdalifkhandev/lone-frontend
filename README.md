# GUEHI and CO Bank Management Site

> A modern bank management system for clients and lenders, featuring credit scoring, loan management, user profiles, dashboards, and industry solutions. Built with Next.js, React, TypeScript, Zustand, React Query, and Tailwind CSS.


## Features

- **User Authentication:** Secure sign up, login, forgot/reset password, and persistent sessions.
- **Profile Management:** Multi-step profile completion (personal, contact, financial info).
- **Account Management:** View and update personal and security information.
- **Credit Scoring:** Automated credit score calculation based on user financial data.
- **Loan Management:** Apply for loans, view credit limits, track application status, and manage repayments.
- **Dashboards:**
	- **Client Dashboard:** Credit score, financial summary, recent activity, and application status.
	- **Lender Dashboard:** View/filter client applications, approve/reject requests, and see client stats.
- **Industry Solutions:** Banking and lending solutions tailored for various industries (Construction, DeFi, Agriculture, etc).
- **Responsive UI:** Modern, mobile-friendly design using Tailwind CSS and Ant Design.
- **API Integration:** Axios for backend API calls, React Query for data fetching/caching.
- **Notifications:** Toast notifications for user feedback.

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **State Management:** Zustand, React Query
- **Styling:** Tailwind CSS, DaisyUI, Ant Design
- **API:** Axios
- **Icons:** React Icons

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set Environment Variables

Create a `.env.local` file and set:

```
NEXT_PUBLIC_API_URL=<your-backend-api-url>
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `src/app/` — Next.js app directory (routing, layouts, pages)
- `src/components/` — UI components, API hooks, utilities, and state stores
- `src/components/api/` — API client and React Query hooks
- `src/components/store/` — Zustand state management
- `src/components/interface/` — TypeScript interfaces and types
- `src/components/utils/` — Utility functions (credit score, percentage, etc)
- `public/` — Static assets (images, SVGs)

## Key Pages & Components

- **Authentication:** `/login`, `/signup`, `/forgot-password`
- **Profile:** `/profile`, `/complitprofil`
- **Account:** `/account` (personal info, security, loan status)
- **Lender Dashboard:** `/lender`
- **About:** `/about`
- **Home:** `/`


## Credit Scoring & Loan Logic

Credit score is calculated based on user financial data (income, bills, assets, etc). The score determines suggested credit limits and loan eligibility. Loan management features allow users to apply, track, and manage loans efficiently.

## Customization

- **Industry Solutions:** Easily add new industries in `src/components/data/industrySolutions.ts`.
- **Credit Tiers:** Adjust credit limit tiers in `src/components/data/creditLimitData.ts`.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint codebase

## License

This project is for educational/demo purposes. Please contact the author for production/commercial use.
