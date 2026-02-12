import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';

// Mock product - will be fetched from API
const mockProduct = {
  id: '1',
  name: 'Auriculares Bluetooth Pro',
  slug: 'auriculares-bluetooth-pro',
  description: 'Experimenta el sonido premium con estos auriculares Bluetooth de última generación. Cuenta con cancelación de ruido activa para que puedas disfrutar tu música sin interrupciones, además de 30 horas de batería para uso prolongado.',
  price: 49990,
  comparePrice: 69990,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  category: 'Audio',
  stock: 15,
  rating: 4.5,
  reviews: 128,
  features: [
    'Cancelación de ruido activa',
    '30 horas de batería',
    'Conexión multipunto Bluetooth 5.0',
    'Micrófono integrado con cancelación de viento',
    'Carga rápida: 10 min = 5 horas de uso',
    'Resistente al agua IPX4',
  ],
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="hover:underline">
              Productos
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{mockProduct.category}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{mockProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square">
                  <img
                    src={mockProduct.image}
                    alt={mockProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden cursor-pointer border-2 transition-colors hover:border-primary">
                  <CardContent className="p-0">
                    <div className="aspect-square">
                      <img
                        src={mockProduct.image}
                        alt={`${mockProduct.name} vista ${i}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {mockProduct.category}
              </Badge>
              <h1 className="text-3xl font-bold lg:text-4xl">
                {mockProduct.name}
              </h1>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{mockProduct.rating}</span>
                  <span className="text-muted-foreground">
                    ({mockProduct.reviews} reseñas)
                  </span>
                </div>
                <Badge variant={mockProduct.stock < 5 ? 'destructive' : 'outline'}>
                  {mockProduct.stock < 5
                    ? `¡Solo ${mockProduct.stock} disponibles!`
                    : 'En stock'}
                </Badge>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(mockProduct.price)}
              </span>
              {mockProduct.comparePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(mockProduct.comparePrice)}
                  </span>
                  <Badge variant="destructive">
                    -{Math.round(((mockProduct.comparePrice - mockProduct.price) / mockProduct.comparePrice * 100)}%
                  </Badge>
                </>
              )}
            </div>

            <p className="text-lg text-muted-foreground">
              {mockProduct.description}
            </p>

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Cantidad</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-semibold">1</span>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  ({mockProduct.stock} disponibles)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar al Carrito
              </Button>
              <Button size="lg" variant="outline">
                Comprar Ahora
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Envío gratis sobre $50.000</p>
                  <p className="text-sm text-muted-foreground">
                    Entrega en 3-5 días hábiles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Garantía de 1 año</p>
                  <p className="text-sm text-muted-foreground">
                    Protección garantizada
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Devolución gratis</p>
                  <p className="text-sm text-muted-foreground">
                    30 días para devolver
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-3 font-semibold">Características:</h3>
              <ul className="space-y-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="border-t py-12">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold">Productos Relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted">
                    <img
                      src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=${300 + i * 50}&h=${300 + i * 50}&fit=crop`}
                      alt="Producto relacionado"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="font-medium">Producto Relacionado {i}</p>
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(39990 + i * 10000)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
