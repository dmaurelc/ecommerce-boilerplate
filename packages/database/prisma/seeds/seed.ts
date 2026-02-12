import { PrismaClient } from '@prisma/client';
import { ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'cat_audio',
        name: 'Audio',
        slug: 'audio',
        description: 'Auriculares, parlantes y equipos de audio',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_relojes',
        name: 'Relojes',
        slug: 'relojes',
        description: 'Smartwatches y relojes inteligentes',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_camaras',
        name: 'Cámaras',
        slug: 'camaras',
        description: 'Cámaras digitales y mirrorless',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_computacion',
        name: 'Computación',
        slug: 'computacion',
        description: 'Laptops, periféricos y accesorios',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat_gaming',
        name: 'Gaming',
        slug: 'gaming',
        description: 'Periféricos y equipos para gaming',
      },
    }),
  ]);

  const categoryMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

  console.log(`✅ Created ${categories.length} categories`);

  // Create Products
  const products = [
    {
      id: 'prod_auriculares_bt',
      name: 'Auriculares Bluetooth Pro',
      slug: 'auriculares-bluetooth-pro',
      description: 'Experimenta el sonido premium con estos auriculares Bluetooth de última generación. Cuenta con cancelación de ruido activa para que puedas disfrutar tu música sin interrupciones, además de 30 horas de batería para uso prolongado.',
      price: 49990,
      compareAtPrice: 69990,
      sku: 'AUD-BT-PRO-001',
      barcode: '789456123001',
      status: ProductStatus.ACTIVE,
      stock: 15,
      categoryId: categoryMap['audio'],
      images: [
        { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', altText: 'Auriculares frente', position: 1 },
        { url: 'https://images.unsplash.com/photo-1546435770-a3e5fe4c53e?w=800&h=800&fit=crop', altText: 'Auriculares lado', position: 2 },
      ],
      variants: [
        { name: 'Negro', price: 49990, sku: 'AUD-BT-PRO-001-BLK', stock: 10, options: { color: 'Negro' } },
        { name: 'Blanco', price: 49990, sku: 'AUD-BT-PRO-001-WHT', stock: 5, options: { color: 'Blanco' } },
      ],
    },
    {
      id: 'prod_smartwatch_fitness',
      name: 'Smartwatch Fitness',
      slug: 'smartwatch-fitness',
      description: 'Monitorea tu salud 24/7 con GPS integrado y resistencia al agua 5ATM. Ideal para deportistas y personas activas.',
      price: 89990,
      compareAtPrice: 119990,
      sku: 'WATCH-FIT-002',
      barcode: '789456123002',
      status: ProductStatus.ACTIVE,
      stock: 8,
      categoryId: categoryMap['relojes'],
      images: [
        { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', altText: 'Smartwatch frente', position: 1 },
        { url: 'https://images.unsplash.com/photo-1579586197110-a6e6eee06e9d?w=800&h=800&fit=crop', altText: 'Smartwatch app', position: 2 },
      ],
      variants: [
        { name: '40mm Negro', price: 89990, sku: 'WATCH-FIT-002-40-BLK', stock: 4, options: { size: '40mm', color: 'Negro' } },
        { name: '44mm Negro', price: 89990, sku: 'WATCH-FIT-002-44-BLK', stock: 4, options: { size: '44mm', color: 'Negro' } },
      ],
    },
    {
      id: 'prod_camara_4k',
      name: 'Cámara Mirrorless 4K',
      slug: 'camara-mirrorless-4k',
      description: 'Captura momentos increíbles con resolución 4K, autofocus rápido y grabación en 60fps. Perfecta para fotógrafos aficionados y profesionales.',
      price: 459990,
      compareAtPrice: 529990,
      sku: 'CAM-4K-003',
      barcode: '789456123003',
      status: ProductStatus.ACTIVE,
      stock: 3,
      categoryId: categoryMap['camaras'],
      images: [
        { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop', altText: 'Cámara frontal', position: 1 },
        { url: 'https://images.unsplash.com/photo-1516035069371-880f686eebe0?w=800&h=800&fit=crop', altText: 'Cámara lateral', position: 2 },
      ],
      variants: [
        { name: 'Solo cuerpo', price: 459990, sku: 'CAM-4K-003-BODY', stock: 2, options: { kit: 'Solo cuerpo' } },
        { name: 'Con lente 18-55mm', price: 499990, sku: 'CAM-4K-003-KIT', stock: 1, options: { kit: 'Con lente 18-55mm' } },
      ],
    },
    {
      id: 'prod_laptop_gaming',
      name: 'Laptop Gaming Pro',
      slug: 'laptop-gaming-pro',
      description: 'RTX 4060, 32GB RAM DDR5, 1TB NVMe SSD. Potencia pura para gaming y creación de contenido.',
      price: 899990,
      compareAtPrice: 1099990,
      sku: 'LAP-GAM-004',
      barcode: '789456123004',
      status: ProductStatus.ACTIVE,
      stock: 5,
      categoryId: categoryMap['computacion'],
      images: [
        { url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=800&fit=crop', altText: 'Laptop abierta', position: 1 },
        { url: 'https://images.unsplash.com/photo-1593640408182-31c70c826d5f?w=800&h=800&fit=crop', altText: 'Laptop teclado', position: 2 },
      ],
      variants: [
        { name: '16GB RAM', price: 899990, sku: 'LAP-GAM-004-16', stock: 2, options: { ram: '16GB', storage: '512GB' } },
        { name: '32GB RAM', price: 999990, sku: 'LAP-GAM-004-32', stock: 3, options: { ram: '32GB', storage: '1TB' } },
      ],
    },
    {
      id: 'prod_teclado_mecanico',
      name: 'Teclado Mecánico RGB',
      slug: 'teclado-mecanico-rgb',
      description: 'Switches azules táctiles con retroiluminación RGB personalizable. Diseño compacto TKL sin teclado numérico.',
      price: 59990,
      compareAtPrice: 79990,
      sku: 'KEY-MEC-005',
      barcode: '789456123005',
      status: ProductStatus.ACTIVE,
      stock: 20,
      categoryId: categoryMap['gaming'],
      images: [
        { url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop', altText: 'Teclado superior', position: 1 },
        { url: 'https://images.unsplash.com/photo-1587829745545-44f198517a30?w=800&h=800&fit=crop', altText: 'Teclado detalle', position: 2 },
      ],
      variants: [
        { name: 'Switches Azules', price: 59990, sku: 'KEY-MEC-005-BLU', stock: 12, options: { switch: 'Azules' } },
        { name: 'Switches Rojos', price: 62990, sku: 'KEY-MEC-005-RED', stock: 8, options: { switch: 'Rojos' } },
      ],
    },
    {
      id: 'prod_mouse_gaming',
      name: 'Mouse Inalámbrico Gaming',
      slug: 'mouse-inalambrico-gaming',
      description: 'Sensor óptico 16000 DPI con 6 botones programables. Peso ultra ligero de 65g para sesiones de gaming prolongadas.',
      price: 34990,
      compareAtPrice: 44990,
      sku: 'MOUSE-GAM-006',
      barcode: '789456123006',
      status: ProductStatus.ACTIVE,
      stock: 25,
      categoryId: categoryMap['gaming'],
      images: [
        { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop', altText: 'Mouse superior', position: 1 },
        { url: 'https://images.unsplash.com/photo-16156632427323-b1a60e81b8f5?w=800&h=800&fit=crop', altText: 'Mouse lateral', position: 2 },
      ],
      variants: [
        { name: 'Negro', price: 34990, sku: 'MOUSE-GAM-006-BLK', stock: 15, options: { color: 'Negro' } },
        { name: 'Blanco', price: 34990, sku: 'MOUSE-GAM-006-WHT', stock: 10, options: { color: 'Blanco' } },
      ],
    },
  ];

  // Create products with images and variants
  for (const productData of products) {
    const { images, variants, ...productFields } = productData;

    const product = await prisma.product.create({
      data: {
        ...productFields,
        images: {
          create: images,
        },
        variants: {
          create: variants,
        },
      },
    });

    console.log(`✅ Created product: ${product.name}`);
  }

  // Create a demo user
  const demoUser = await prisma.user.create({
    data: {
      id: 'user_demo_001',
      email: 'demo@ecommerce.cl',
      name: 'Usuario Demo',
      role: 'CUSTOMER',
    },
  });

  console.log(`✅ Created demo user: ${demoUser.email}`);

  // Create addresses for demo user
  await prisma.address.createMany({
    data: [
      {
        userId: demoUser.id,
        firstName: 'Juan',
        lastName: 'Pérez',
        address1: 'Av. Libertador Bernardo O\'Higgins 1234',
        address2: 'Dept 402',
        city: 'Santiago',
        province: 'Región Metropolitana',
        postalCode: '8320000',
        country: 'Chile',
        phone: '+56 9 1234 5678',
        isDefault: true,
      },
    ],
  });

  console.log('✅ Created addresses for demo user');

  console.log('🎉 Seed completed successfully!');
  console.log('📊 Summary:');
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Demo users: 1`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
