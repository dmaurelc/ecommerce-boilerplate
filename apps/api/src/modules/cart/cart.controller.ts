import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener carrito' })
  getCart(@Param('id') id?: string) {
    return this.cartService.getCart(id);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Agregar item al carrito' })
  addItem(
    @Param('id') cartId: string,
    @Body() data: { productId: string; variantId?: string; quantity?: number },
  ) {
    return this.cartService.addItem(cartId, data.productId, data.variantId, data.quantity);
  }

  @Delete(':id/items/:itemId')
  @ApiOperation({ summary: 'Eliminar item del carrito' })
  removeItem(@Param('id') cartId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(cartId, itemId);
  }

  @Patch(':id/items/:itemId')
  @ApiOperation({ summary: 'Actualizar cantidad de item' })
  updateQuantity(
    @Param('id') cartId: string,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(cartId, itemId, quantity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Vaciar carrito' })
  clearCart(@Param('id') cartId: string) {
    return this.cartService.clearCart(cartId);
  }
}
