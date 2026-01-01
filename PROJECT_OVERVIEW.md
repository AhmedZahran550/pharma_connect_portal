# MedYour Portal - Project Overview

A modern Next.js 15 admin portal for medical/pharmacy management featuring appointments, branches, orders, staff, tickets, and medical profiles.

---

## 🚀 Technologies & Packages

### Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| **Next.js** | ^15.1.0 | React framework with SSR/SSG |
| **React** | ^19.0.0 | UI library |
| **TypeScript** | ^5 | Type-safe JavaScript |

---

### UI & Styling

| Package | Purpose |
|---------|---------|
| **@mui/material** (v7.2.0) | Material UI component library |
| **@mui/icons-material** | Material UI icons |
| **@mui/x-data-grid** | Advanced data grid component |
| **@mui/x-date-pickers** | Date/time picker components |
| **@emotion/react** & **@emotion/styled** | CSS-in-JS styling (MUI dependency) |
| **TailwindCSS** (v4.1.11) | Utility-first CSS framework |
| **tailwind-merge** | Merge Tailwind classes |
| **tailwindcss-animate** | Animation utilities |
| **Framer Motion** | Animation library |
| **clsx** | Conditional class names |

---

### State Management & Data Fetching

| Package | Purpose |
|---------|---------|
| **Zustand** (v5.0.3) | Lightweight state management |
| **@tanstack/react-query** (v5.83) | Server state management & caching |
| **Axios** (v1.7.9) | HTTP client |
| **RxJS** (v7.8.1) | Reactive programming |

---

### Forms & Validation

| Package | Purpose |
|---------|---------|
| **react-hook-form** | Form state management |
| **@hookform/resolvers** | Validation resolvers |
| **Zod** (v4) | Schema validation |

---

### Maps & Calendar

| Package | Purpose |
|---------|---------|
| **Leaflet** & **react-leaflet** | Interactive maps |
| **FullCalendar** | Calendar/scheduling UI |

---

### Internationalization

| Package | Purpose |
|---------|---------|
| **i18next** | Core i18n framework |
| **react-i18next** | React bindings |
| **i18next-browser-languagedetector** | Auto language detection |

---

### Dev Tools

| Package | Purpose |
|---------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **lint-staged** | Pre-commit linting |
| **PostCSS** | CSS processing |

---

## 📁 Project Structure

```
medyour-portal/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles
│   │   ├── ClientWrapper.tsx      # Client-side wrapper
│   │   ├── systemLayout.tsx       # Authenticated layout
│   │   ├── publicLayout.tsx       # Public pages layout
│   │   ├── 📂 appointments/       # Appointment management
│   │   ├── 📂 branches/           # Branch management
│   │   ├── 📂 home/               # Dashboard home
│   │   ├── 📂 orders/             # Order management
│   │   ├── 📂 medicalprofiles/    # Medical profiles
│   │   ├── 📂 staff/              # Staff management
│   │   ├── 📂 tickets/            # Support tickets
│   │   ├── 📂 notifications/      # Notifications
│   │   ├── 📂 login/              # Login page
│   │   ├── 📂 forgetpassword/     # Password recovery
│   │   ├── 📂 reset-password/     # Password reset
│   │   └── 📂 email-verification/ # Email verification
│   │
│   ├── 📂 components/             # Reusable UI components
│   │   ├── customDataGrid.tsx     # Data grid wrapper
│   │   ├── navigationBar.tsx      # Main navigation
│   │   ├── drawer.tsx             # Side drawer
│   │   ├── Input.tsx, select.tsx  # Form inputs
│   │   ├── confirmationDialog.tsx # Modal dialogs
│   │   └── ...
│   │
│   ├── 📂 hooks/                  # Custom React hooks
│   │   ├── 📂 api/                # API-specific hooks
│   │   ├── useAuth.tsx            # Authentication
│   │   ├── useApiResource.ts      # API resource management
│   │   ├── useAppForm.tsx         # Form handling
│   │   └── ...
│   │
│   ├── 📂 stores/                 # Zustand stores
│   │   ├── AppUserStore.ts        # User state
│   │   ├── homeStatesStore.ts     # Dashboard state
│   │   ├── userCartStore.ts       # Shopping cart
│   │   ├── userOrderStore.tsx     # Order state
│   │   └── notificationsStore.ts  # Notifications
│   │
│   ├── 📂 types/                  # TypeScript definitions
│   ├── 📂 schemas/                # Zod validation schemas
│   ├── 📂 auth/                   # Auth utilities
│   ├── 📂 localization/           # i18n config & translations
│   ├── 📂 lib/                    # Shared libraries
│   └── 📂 utils/                  # Utility functions
│
├── 📂 public/                     # Static assets
├── Dockerfile                     # Docker configuration
├── next.config.ts                 # Next.js config
├── tsconfig.json                  # TypeScript config
└── package.json
```

---

## 🏗️ Architecture Summary

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router) |
| **UI Components** | MUI v7 + Tailwind CSS |
| **State Management** | Zustand (client) + React Query (server) |
| **Forms** | React Hook Form + Zod |
| **API Client** | Axios |
| **Maps** | Leaflet |
| **Calendar** | FullCalendar |
| **i18n** | i18next |

---

## 🔧 Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn start    # Start production server
yarn lint     # Run ESLint
yarn format   # Format with Prettier
```
