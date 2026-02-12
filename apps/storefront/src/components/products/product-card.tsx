'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@ecommerce/shared';
import { useCartStore } from '@/lib/stores/cart.store';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const mainImage = product.images?.[0];
  const inStock = (product.stock || 0) > 0;
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-square bg-muted">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {discount > 0 && (
                <Badge variant="destructive">-{discount}%</Badge>
              )}
              {!inStock && (
                <Badge variant="secondary">Agotado</Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {product.category && (
            <p className="text-xs text-muted-foreground">{product.category.name}</p>
          )}

          <h3 className="mt-1 font-medium line-clamp-2">{product.name}</h3>

          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">4.5</span>
            <span className="text-xs text-muted-foreground">(128)</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <Button
            className="mt-3 w-full"
            size="sm"
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
