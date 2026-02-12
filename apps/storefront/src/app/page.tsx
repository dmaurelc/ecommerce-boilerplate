import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Truck } from 'lucide-react';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { products } from '@/lib/data-access';

async function getProducts() {
  try {
    return await products.findAll({ take: 6, status: 'ACTIVE' });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
}

export default async function HomePage() {
  const productsData = await getProducts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">E-commerce Store</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:underline">
              Inicio
            </a>
            <a href="/products" className="text-sm font-medium hover:underline">
              Productos
            </a>
            <CartDrawer />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Tecnología al mejor precio
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Descubre lo último en tecnología con envíos a todo Chile
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg">Ver Productos</Button>
              <Button size="lg" variant="outline">
                Ofertas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y py-8">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Envío a todo Chile</p>
                <p className="text-sm text-muted-foreground">En 3-5 días hábiles</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Garantía asegurada</p>
                <p className="text-sm text-muted-foreground">1 año en todos los productos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Pago seguro</p>
                <p className="text-sm text-muted-foreground">Transbank, MercadoPago, Flow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Productos Destacados</h2>
            <p className="mt-2 text-muted-foreground">
              Los mejores productos seleccionados para ti
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsData.map((product) => {
              const mainImage = product.images?.[0];
              return (
                <Card key={product.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={mainImage?.url || '/placeholder.jpg'}
                        alt={mainImage?.altText || product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {product.category && (
                      <div className="mb-2">
                        <Badge variant="secondary">{product.category.name}</Badge>
                      </div>
                    )}
                    <CardTitle className="line-clamp-1 text-lg">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {product.description}
                    </CardDescription>
                    <div className="mt-3 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.5</span>
                      <span className="text-sm text-muted-foreground">
                        ({Math.floor(Math.random() * 100) + 20} reviews)
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    {product.stock && product.stock < 5 && (
                      <Badge variant="destructive" className="mt-2">
                        ¡Solo {product.stock} disponibles!
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">
                      Agregar al Carrito
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 E-commerce Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
