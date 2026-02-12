# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-02-12

### Added
- 🎉 Initial release of E-commerce Monorepo
- Turborepo setup with pnpm workspaces
- Next.js 16.1.6 storefront with App Router
- NestJS API with 14 modules and ~47 endpoints
- Prisma ORM with PostgreSQL database (18 tables)
- Docker Compose configuration (PostgreSQL port 5433, Redis port 6379)
- shadcn/ui components (Button, Card, Input, Badge, Sheet)
- Zustand for state management with persistence
- Data Access Layer with adapter pattern (NestJS/Shopify)
- Product catalog with 6 seeded products
- Swagger/OpenAPI documentation at `/api/docs`

### Fixed
- Prisma client import - fixed default vs named export
- API URL prefix - added `/api` base path
- Integer parameter parsing in ProductsService
- Zustand persist storage configuration for SSR

### Tech Stack
- **Frontend**: Next.js 16.1.6, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: NestJS 10, Prisma, PostgreSQL
- **Infrastructure**: Docker, Turborepo
- **Payment Providers**: Transbank, MercadoPago, Flow (planned)
