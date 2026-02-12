import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { SearchBar } from '@/components/search/search-bar';
import { ShoppingBag } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'Plataforma e-commerce profesional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center gap-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xl font-bold">E-commerce Store</span>
              </Link>
            </div>
            <div className="flex-1 max-w-md">
              <SearchBar />
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:underline">
                Inicio
              </Link>
              <Link href="/products" className="text-sm font-medium hover:underline">
                Productos
              </Link>
              <CartDrawer />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© 2024 E-commerce Store. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
