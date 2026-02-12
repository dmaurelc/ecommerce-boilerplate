'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart.store';
import { Product } from '@ecommerce/shared';
import { useState, useEffect } from 'react';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
}

interface ProductPageProps {
  product: Product | null;
  relatedProducts?: Product[];
}

export default function ProductPage({ product, relatedProducts = [] }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  const [mainImageId, setMainImageId] = useState<string>();
  const { addItem } = useCartStore();

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setMainImageId(product.images.find(img => img.position === 1)?.id || product.images[0].id);
    }
  }, [product?.images, product?.category?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <Link href="/products">
            <Button>Ver todos los productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mainImage = product.images?.find(img => img.id === mainImageId);
  const inStock = (product.stock || 0) > 0;
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock || 99, prev + delta)));
  };

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
            {product.category && (
              <>
                <Link href={`/products?category=${product.category.slug}`} className="hover:underline">
                  <span className="text-muted-foreground">{product.category.name}</span>
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="font-medium">{product.name}</span>
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
                    src={mainImage?.url || '/placeholder.jpg'}
                    alt={mainImage?.altText || product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.map((image) => (
                  <Card
                    key={image.id}
                    className={`overflow-hidden cursor-pointer border-2 transition-colors ${
                      image.id === mainImageId ? 'border-primary' : 'hover:border-primary'
                    }`}
                    onClick={() => setMainImageId(image.id)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square">
                        <img
                          src={image.url}
                          alt={`${product.name} vista`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <Badge variant="secondary" className="mb-2">
                  {product.category.name}
                </Badge>
              )}
              <h1 className="text-3xl font-bold lg:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.5</span>
                  <span className="text-muted-foreground">
                    (128 reseñas)
                  </span>
                </div>
                <Badge variant={product.stock && product.stock < 5 ? 'destructive' : 'outline'}>
                  {product.stock && product.stock < 5
                    ? `¡Solo ${product.stock} disponibles!`
                    : inStock
                    ? 'En stock'
                    : 'Agotado'}
                </Badge>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  {discount > 0 && (
                    <Badge variant="destructive">
                      -{discount}%
                    </Badge>
                  )}
                </>
              )}
            </div>

            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Variante</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`rounded-md border p-3 text-left transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input hover:bg-accent'
                      }`}
                      onClick={() => setSelectedVariant(variant.id)}
                    >
                      <span className="block text-sm font-medium">
                        {variant.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {formatPrice(variant.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Cantidad</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={!product.stock || quantity >= (product.stock || 99)}
                  >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  ({product.stock || 0} disponibles)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar al Carrito
              </Button>
              <Button size="lg" variant="outline" disabled={!inStock}>
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
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product.category && relatedProducts.length > 0 && (
        <section className="border-t py-12">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold">Productos Relacionados</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Más productos de {product.category.name}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`}>
                  <Card className="overflow-hidden transition-transform hover:scale-105">
                    <CardHeader className="p-0">
                      <div className="aspect-square bg-muted">
                        {relatedProduct.images && relatedProduct.images.length > 0 ? (
                          <img
                            src={relatedProduct.images[0].url}
                            alt={relatedProduct.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                      <p className="mt-2 font-bold text-primary">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
