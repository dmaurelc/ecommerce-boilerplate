import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="container max-w-2xl">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">
              ¡Pedido Completado!
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Gracias por tu compra. Te hemos enviado un correo con los detalles de tu pedido.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Número de pedido</h2>
              <p className="text-2xl font-mono font-bold text-primary">
                #{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Recibirás una notificación cuando tu pedido sea enviado.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">¿Qué pasa ahora?</p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Seguir Comprando
                  </Link>
                </Button>

                <Button className="flex-1" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Volver al Inicio
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Envío en 3-5 días hábiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Pago seguro garantizado</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
