# EduTrade GH

Production-ready online marketplace for educational items in Ghana.

## Overview

EduTrade GH is a student-focused marketplace built for buying and selling educational materials, school supplies, and related items across Ghana.

### Features

- **User Authentication**: Secure registration, login, password reset, and email verification
- **Product Listings**: Create, edit, and manage product listings with images
- **Marketplace**: Browse, search, and filter products by category, school, region, and price
- **User Profiles**: Complete seller profiles with ratings and verification badges
- **Real-time Messaging**: Direct communication between buyers and sellers
- **Wishlist & Cart**: Save products and manage shopping carts
- **Checkout**: Production-ready checkout flow with payment abstraction layer
- **Reviews & Ratings**: User-generated reviews and seller ratings
- **Admin Dashboard**: Moderation and analytics
- **Responsive Design**: Mobile, tablet, and desktop support
- **Accessibility**: WCAG 2.2 AA compliant

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Authentication
- NextAuth.js

### Storage
- Cloudinary

### Forms & Validation
- React Hook Form
- Zod

### State Management
- Zustand

## Project Structure

```
.
├── app/                 # Next.js app directory
│   ├── (auth)/         # Authentication pages
│   ├── (marketplace)/  # Marketplace pages
│   ├── (dashboard)/    # User dashboard
│   ├── admin/          # Admin panel
│   ├── api/            # API routes
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── features/      # Feature-specific components
├── features/          # Feature modules
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and helpers
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── services/          # Business logic services
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
└── middleware/        # Next.js middleware
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/drusillatawiah6-source/EduTrade-GH.git
cd EduTrade-GH
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration

5. Initialize the database:
```bash
npm run db:push
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run type-check` - Run TypeScript type checking

## Design System

### Color Palette

- **Primary Green**: `#006B3F`
- **Gold**: `#FCD116`
- **Accent Red**: `#CE1126`
- **White**: `#FFFFFF`
- **Light Gray**: `#F5F5F5`
- **Dark Gray**: `#2D2D2D`

## Development Workflow

The project is built in phases:

1. **Phase 1**: Authentication & User Profiles
2. **Phase 2**: Marketplace & Listings
3. **Phase 3**: Wishlist, Cart & Checkout
4. **Phase 4**: Messaging & Notifications
5. **Phase 5**: Admin Panel & Optimization

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

## License

MIT
