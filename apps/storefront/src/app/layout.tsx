import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { SearchBar } from '@/components/search/search-bar';
import { ShoppingBag, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

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
          {/* Mobile Header */}
          <div className="container flex h-16 items-center md:hidden">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px]">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:underline"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/products"
                    className="text-lg font-medium hover:underline"
                  >
                    Productos
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-1 justify-center">
              <ShoppingBag className="h-6 w-6 shrink-0" />
              <span className="text-lg font-bold">E-commerce Store</span>
            </Link>

            {/* Cart Drawer */}
            <div className="shrink-0">
              <CartDrawer />
            </div>
          </div>

          {/* Mobile Search Row */}
          <div className="container pb-3 md:hidden">
            <SearchBar />
          </div>

          {/* Desktop Header */}
          <div className="container hidden md:flex h-16 items-center">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-6">
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xl font-bold">E-commerce Store</span>
            </Link>

            {/* Search Bar - Center/Expandable */}
            <div className="flex-1 max-w-xl mx-auto">
              <SearchBar />
            </div>

            {/* Right Section: Nav + Cart */}
            <div className="flex items-center gap-6 shrink-0 ml-6">
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium hover:underline">
                  Inicio
                </Link>
                <Link href="/products" className="text-sm font-medium hover:underline">
                  Productos
                </Link>
              </nav>
              <CartDrawer />
            </div>
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
