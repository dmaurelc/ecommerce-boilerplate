# PRD: Professional E-commerce Boilerplate (Monorepo)

## Contexto del Proyecto

Desarrollo de un starter-kit de grado producción, modular y escalable.
Arquitectura: Monorepo orientado a dominios.

## Stack Tecnológico Requerido

- **Gestor de Monorepo:** Turborepo
- **Frontend:** Next.js 16.1.6 (App Router, TypeScript, Strict Mode)
- **Backend:** NestJS (Modular, Dependency Injection, Swagger)
- **Base de Datos:** PostgreSQL + Prisma ORM
- **UI/UX:** Tailwind CSS + shadcn/ui + Lucide Icons
- **Estado:** Zustand (Client-side)
- **Validación:** Zod (Shared schemas)
- **Pagos (Chile):** Transbank SDK, MercadoPago SDK, Flow API (Strategy Pattern)
- **DevOps:** Docker (Local Dev), Dockploy (Production)

## Estructura de Módulos (Core)

1.  **Identity:** Auth.js (NextAuth) con roles (Admin/Customer).
2.  **Catalog:** Gestión de productos, variantes, categorías y stock.
3.  **Checkout:** Carrito persistente y lógica de impuestos (IVA 19%).
4.  **Payments:** Sistema de adaptadores para múltiples pasarelas chilenas.
5.  **Orders:** Flujo de estados (Pending -> Paid -> Shipped).
6.  **Marketing:** Motor de cupones y plantillas de email (Resend).
7.  **Admin:** Dashboard modular para gestión total.

## Requisito Headless

El Frontend debe usar un patrón de 'Data Access Layer'. Debe ser capaz de alternar entre el Backend de NestJS y Shopify Headless mediante variables de entorno.
