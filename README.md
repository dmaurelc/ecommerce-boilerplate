# E-commerce Monorepo

Plataforma e-commerce profesional construida con Turborepo, Next.js y NestJS.

## 🏗️ Arquitectura

Este monorepo utiliza Turborepo para la orquestación de builds e incluye:

- **Storefront**: Next.js 16.1.6 con App Router
- **API**: NestJS backend con arquitectura modular
- **Database**: Prisma ORM con PostgreSQL
- **Shared**: Tipos TypeScript y validaciones Zod
- **Config**: Configuraciones ESLint y Prettier

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker y Docker Compose

### Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servicios Docker (PostgreSQL, Redis)
pnpm docker:up

# Inicializar base de datos
pnpm db:push

# Iniciar servidores de desarrollo
pnpm dev
```

El storefront estará disponible en http://localhost:3000
La API estará disponible en http://localhost:3001

### Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
cp .env.example .env.local
```

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia todos los servidores de desarrollo |
| `pnpm build` | Compila todas las apps y paquetes |
| `pnpm lint` | Ejecuta linter en todos los paquetes |
| `pnpm db:generate` | Genera cliente Prisma |
| `pnpm db:push` | Aplica schema a la base de datos |
| `pnpm db:studio` | Abre Prisma Studio |
| `pnpm docker:up` | Inicia servicios Docker |

## 🛒️ Características

### Catálogo de Productos
- ✅ Homepage con productos destacados
- ✅ Listado de productos con filtros por categoría
- ✅ Ficha de producto con galería de imágenes
- ✅ Selector de variantes (tamaño, color, etc.)
- ✅ Productos relacionados de la misma categoría
- ✅ **Búsqueda de productos con sugerencias en tiempo real**

### Carrito de Compras
- ✅ Agregar/eliminar productos del carrito
- ✅ Actualizar cantidades
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de IVA (19% Chile)
- ✅ Drawer con resumen de compra

### Checkout
- ✅ Proceso en 3 pasos (Envío → Pago → Confirmación)
- ✅ Formulario de dirección de envío
- ✅ Selección de método de pago (Webpay/MercadoPago)
- ✅ Página de confirmación de pedido

### Backend API (Órdenes)
- ✅ POST `/api/orders` - Crear orden con items y dirección
- ✅ GET `/api/orders/:id` - Obtener orden por ID
- ✅ GET `/api/orders/customer/:customerId` - Órdenes de cliente
- ✅ PATCH `/api/orders/:id/status` - Actualizar estado de orden
- ✅ PATCH `/api/orders/:id/payment-status` - Actualizar estado de pago
- ✅ Generación de número de orden único (ORD-YYYY-XXXXXX)
- ✅ Transacciones de Prisma para integridad de datos

## 🏛️ Características de Arquitectura

### Patrón Data Access Layer

El storefront utiliza un Data Access Layer que puede cambiar entre:
- Backend NestJS (por defecto)
- Shopify Headless (vía `DATA_SOURCE=shopify`)

### Patrón Estrategia de Pagos

Múltiples proveedores de pago chilenos soportados:
- Transbank Webpay Plus
- MercadoPago
- Flow API

### Estructura del Monorepo

```
ecommerce-boilerplate/
├── apps/
│   ├── storefront/     # Frontend Next.js
│   └── api/           # Backend NestJS
├── packages/
│   ├── database/      # Cliente Prisma
│   ├── shared/        # Tipos & schemas
│   └── config/        # Configs linting
└── docker-compose.yml # PostgreSQL & Redis
```

## 📚 Documentación

- [Turborepo](https://turbo.build/repo/docs)
- [Next.js](https://nextjs.org/docs)
- [NestJS](https://docs.nestjs.com)
- [Prisma](https://www.prisma.io/docs)
