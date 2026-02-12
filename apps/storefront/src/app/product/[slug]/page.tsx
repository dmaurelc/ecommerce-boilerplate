import { products } from '@/lib/data-access';
import { Product } from '@ecommerce/shared';
import ProductPageClient from './product-page-client';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// This is a server component that fetches product data
// The actual rendering is handled by the client component
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let product: Product | null = null;
  let relatedProducts: Product[] = [];

  try {
    product = await products.findBySlug(slug);

    // Fetch related products from the same category (exclude current product, limit to 4)
    if (product?.category?.id) {
      const allCategoryProducts = await products.findAll({ categoryId: product.category.id });
      relatedProducts = allCategoryProducts
        .filter((p) => p.id !== product!.id)
        .slice(0, 4);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
