'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, MapPin, CreditCard, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart.store';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [step, setStep] = useState(1);

  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'webpay' | 'mercadopago' | null>(null);

  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Redirect if cart is empty
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">
            Agrega productos antes de continuar con el checkout
          </p>
          <Button className="mt-6" asChild>
            <Link href="/products">Ver Productos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleCompleteOrder = () => {
    // Simulate order completion
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-4">
          <Link href="/products" className="text-sm text-muted-foreground hover:underline">
            ← Volver a productos
          </Link>
        </div>
      </div>

      <div className="container py-8">
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {step >= 1 ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="font-medium">Envío</span>
            </div>
            <div className="h-px w-12 bg-muted" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {step >= 2 ? <Check className="h-4 w-4" /> : '2'}
              </div>
              <span className="font-medium">Pago</span>
            </div>
            <div className="h-px w-12 bg-muted" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {step >= 3 ? <Check className="h-4 w-4" /> : '3'}
              </div>
              <span className="font-medium">Confirmación</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">Nombre *</Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellidos *</Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address1">Dirección *</Label>
                      <Input
                        id="address1"
                        required
                        placeholder="Calle, número, departamento"
                        value={shippingForm.address1}
                        onChange={(e) => setShippingForm({ ...shippingForm, address1: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address2">Departamento/Casa (opcional)</Label>
                      <Input
                        id="address2"
                        placeholder="Oficina, piso, referencias"
                        value={shippingForm.address2}
                        onChange={(e) => setShippingForm({ ...shippingForm, address2: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="city">Ciudad/Comuna *</Label>
                        <Input
                          id="city"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="province">Región *</Label>
                        <Input
                          id="province"
                          required
                          value={shippingForm.province}
                          onChange={(e) => setShippingForm({ ...shippingForm, province: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input
                          id="postalCode"
                          value={shippingForm.postalCode}
                          onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+56 9 1234 5678"
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Continuar al Pago
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('webpay')}
                        className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                          paymentMethod === 'webpay'
                            ? 'border-primary bg-primary/5'
                            : 'border-input hover:bg-accent'
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded bg-red-600 text-white">
                          <span className="text-xs font-bold">Webpay</span>
                        </div>
                        <div>
                          <p className="font-medium">Webpay Plus</p>
                          <p className="text-sm text-muted-foreground">Paga con tarjetas de crédito o débito</p>
                        </div>
                        {paymentMethod === 'webpay' && (
                          <Check className="ml-auto h-5 w-5 text-primary" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mercadopago')}
                        className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                          paymentMethod === 'mercadopago'
                            ? 'border-primary bg-primary/5'
                            : 'border-input hover:bg-accent'
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-500 text-white">
                          <span className="text-xs font-bold">MP</span>
                        </div>
                        <div>
                          <p className="font-medium">MercadoPago</p>
                          <p className="text-sm text-muted-foreground">Tarjetas, dinero en efectivo</p>
                        </div>
                        {paymentMethod === 'mercadopago' && (
                          <Check className="ml-auto h-5 w-5 text-primary" />
                        )}
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(1)}
                      >
                        Volver
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={!paymentMethod}
                      >
                        Revisar Pedido
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Confirmar Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Summary */}
                  <div>
                    <h3 className="mb-2 font-semibold">Dirección de Envío</h3>
                    <p className="text-sm text-muted-foreground">
                      {shippingForm.firstName} {shippingForm.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shippingForm.address1}
                      {shippingForm.address2 && `, ${shippingForm.address2}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shippingForm.city}, {shippingForm.province}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shippingForm.phone}
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div>
                    <h3 className="mb-2 font-semibold">Método de Pago</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {paymentMethod === 'webpay' ? 'Webpay Plus' : 'MercadoPago'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep(2)}
                    >
                      Volver
                    </Button>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCompleteOrder}
                    >
                      Completar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {totalItems} producto{totalItems !== 1 ? 's' : ''}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-medium hover:underline line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.variantName && (
                        <p className="text-xs text-muted-foreground">{item.variantName}</p>
                      )}
                      <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatPrice(item.total)}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (19%)</span>
                    <span>{formatPrice(cart.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Envío gratis sobre $50.000</p>
                  <p className="text-xs text-muted-foreground">
                    Entrega en 3-5 días hábiles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Pago seguro</p>
                  <p className="text-xs text-muted-foreground">
                    Transacciones encriptadas
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Devolución gratis</p>
                  <p className="text-xs text-muted-foreground">
                    30 días para devolver
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
