# Obscur Clothes - Business Card Website

## Overview

This is a full-stack web application built for Obscur Clothes, a premium streetwear brand specializing in Chinese luxury streetwear. It serves as a gothic-styled business card website featuring brand information, Avito marketplace listings, customer reviews, and real-time statistics. The application uses a modern tech stack with React frontend, Express backend, and PostgreSQL database with an animated gray fire background and horizontal scrolling carousels.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Gothic style, dark theme with gray/white/black colors and purple/violet accents, horizontal scrolling carousels, lots of animations, real-time updates for all data.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state and local React state
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database serverless
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Build Process**: esbuild for server bundling

## Key Components

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schema definitions in `/shared/schema.ts`
- **Validation**: Zod for runtime type validation with drizzle-zod integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### UI Components
- **Design System**: Custom components built on Radix UI primitives
- **Theme**: Dark theme with purple/violet brand colors
- **Animations**: CSS-based animations with Tailwind classes
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Business Logic
- **Real-time Updates**: Mock real-time data simulation for stats and listings
- **Mock Data**: Structured mock data for Avito listings and customer reviews
- **Statistics**: Live updating counters for subscribers, deals, and ratings

## Data Flow

1. **Client Requests**: Frontend makes API requests through TanStack Query
2. **Server Processing**: Express server handles requests and routes to appropriate handlers
3. **Database Operations**: Drizzle ORM performs type-safe database operations
4. **Response**: Server returns JSON responses consumed by React components
5. **UI Updates**: React components re-render based on query results

The application currently uses mock data but is structured to easily integrate with real Avito API and user management systems.

## Recent Changes

### January 14, 2025
- ✓ Created gothic-styled business card website with animated gray fire background
- ✓ Implemented horizontal scrolling carousels for listings and reviews
- ✓ Added real-time data simulation for Telegram subscribers, deals, and ratings
- ✓ Created gothic UI components with dark theme and purple/violet accents
- ✓ Updated mock data with realistic Russian streetwear listings
- ✓ Integrated smooth scrolling navigation and mobile-responsive design

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **drizzle-orm**: Type-safe database ORM
- **class-variance-authority**: Type-safe component variants
- **wouter**: Lightweight React router

### Development Tools
- **Vite**: Fast build tool and development server
- **esbuild**: JavaScript bundler for server code
- **tsx**: TypeScript execution for development
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `/dist/public`
- **Backend**: esbuild bundles server code to `/dist/index.js`
- **Database**: Drizzle migrations in `/migrations` directory

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with hot reload
- **Production**: Compiled JavaScript served by Node.js
- **Database**: Configured via `DATABASE_URL` environment variable

### Project Structure
```
/client          # React frontend application
/server          # Express backend server
/shared          # Shared TypeScript definitions
/migrations      # Database migration files
/components.json # shadcn/ui configuration
```

The application is designed for easy deployment on platforms like Replit, Vercel, or traditional hosting with minimal configuration required.