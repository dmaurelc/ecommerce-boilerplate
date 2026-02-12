import { Controller, Post, Body, Headers, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post(':provider')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recibir webhook de proveedor' })
  async handleWebhook(
    @Param('provider') _provider: string,
    @Headers() _headers: Record<string, string>,
    @Body() data: any,
    ) {
    // Verificar firma del webhook (según proveedor)
    const signature = _headers['x-webhook-signature'] || _headers['x-shopify-hmac-sha256'];
    const signatureValid = await this.webhooksService.verifySignature(_provider, signature, JSON.stringify(data));

    if (signatureValid) {
      return await this.webhooksService.processWebhook('webhook.event', _provider, data);
    }

    return { received: true };
  }

  @Post('verify/:provider')
  @ApiOperation({ summary: 'Verificar configuración de webhook' })
  async verify(@Param('provider') _provider: string, @Body() _config: any) {
    return { valid: true };
  }
}
