import { products } from '@/lib/data-access';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/products/product-filters';

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const { category, search, sort } = params;

  // Build query parameters for API
  const query: Record<string, string> = {};
  if (category) query.categoryId = category;
  if (search) query.search = search;
  if (sort) query.sort = sort;

  const allProducts = await products.findAll(query);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-6">
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            {allProducts.length} producto{allProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside>
            <ProductFilters selectedCategory={category} search={search} />
          </aside>

          {/* Products Grid */}
          <div>
            {allProducts.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium">No se encontraron productos</p>
                  <p className="mt-2 text-muted-foreground">
                    Intenta con otros filtros o términos de búsqueda
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
