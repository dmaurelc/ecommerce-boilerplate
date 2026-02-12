# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2026-02-12

### Fixed
- 🔧 **Header Accessibility & Alignment**
  - Agregado SheetTitle con sr-only para accesibilidad de screen readers
  - Separados layouts de mobile y desktop
  - Mobile: Menú | Logo (flex-1) | Carrito
  - Desktop: Logo | Búsqueda (flex-1) | Nav | Carrito
  - Carrito siempre alineado a la derecha
  - Agregado shrink-0 para evitar encogimiento no deseado

---

## [1.2.1] - 2026-02-12

### Fixed
- 🔧 **Responsive Header** - Corregido layout en móvil
  - Agregado menú hamburguesa con Sheet component para navegación
  - Barra de búsqueda oculta en móvil pequeño, visible en fila separada
  - Navegación desktop oculta en móvil, accesible desde menú
  - Ajustado tamaño del logo para móviles
  - Mejor distribución del espacio con gap-4

---

## [1.2.0] - 2026-02-12

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-12

### Added
- ✅ **Product Search with Suggestions** - Global search bar in header
  - Debounce (300ms) para optimizar búsquedas
  - Dropdown con máximo 5 sugerencias mientras escribes
  - Muestra imagen, nombre, categoría y precio
  - Enter para ver todos los resultados en `/products?search=`
  - Click en sugerencia navega al producto
  - Cierra dropdown con click fuera o tecla Escape
  - Estado de carga con spinner
  - Mensaje cuando no hay resultados

### Technical Details
- **Componente**: `apps/storefront/src/components/search/search-bar.tsx`
- **Hook personalizado**: `useDebounce` para retrasar la búsqueda
- **Data Access**: Usa `products.search()` del API existente
- **UX**: Animaciones de fade-in/zoom-in para el dropdown

---

## [1.1.0] - 2026-02-12

### Added
- ✅ **Global Layout** - Header sticky con navegación y footer compartido
- ✅ **Products Listing Page** - Grid de productos con filtros por categoría (`/products`)
- ✅ **Product Detail Page** - Galería de imágenes, selector de variantes, productos relacionados (`/product/[slug]`)
- ✅ **Shopping Cart** - Carrito funcional con persistencia en localStorage
  - Agregar/eliminar items del carrito
  - Actualizar cantidades
  - Cálculo automático de subtotal, IVA (19%) y total
  - Drawer con resumen de compra
- ✅ **Checkout Flow** - Proceso de compra en 3 pasos
  - Paso 1: Información de envío
  - Paso 2: Selección de método de pago (Webpay/MercadoPago)
  - Paso 3: Confirmación del pedido
- ✅ **Order Success Page** - Página de confirmación con número de pedido
- ✅ **Categories API** - Endpoint `/products/categories` para obtener categorías
- ✅ **Product Cards** - Componentes clickeables en homepage y listado
- ✅ **Label UI Component** - Nuevo componente de shadcn/ui

### Changed
- Homepage ahora usa layout global (header/footer eliminados del componente)
- Carrito ahora usa Zustand con persistencia local (localStorage)
- Productos en homepage ahora son enlaces clickeables

---

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
