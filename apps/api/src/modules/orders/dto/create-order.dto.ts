import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Variant ID (optional)', required: false })
  @IsString()
  @IsOptional()
  variantId?: string;

  @ApiProperty({ description: 'Product name at time of order' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Quantity' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Price per unit' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Total price for this item' })
  @IsNumber()
  total: number;
}

export class AddressDto {
  @ApiProperty({ description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Address line 1' })
  @IsString()
  @IsNotEmpty()
  address1: string;

  @ApiProperty({ description: 'Address line 2 (optional)', required: false })
  @IsString()
  @IsOptional()
  address2?: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Province/State' })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({ description: 'Postal code' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ description: 'Country', default: 'Chile' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer ID', required: false })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({ description: 'Order items', type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ description: 'Shipping address', type: AddressDto })
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @ApiProperty({ description: 'Billing address (optional)', type: AddressDto, required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  billingAddress?: AddressDto;

  @ApiProperty({ description: 'Subtotal' })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ description: 'Tax amount' })
  @IsNumber()
  tax: number;

  @ApiProperty({ description: 'Total amount' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Payment method (webpay, mercadopago, etc)', required: false })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiProperty({ description: 'Customer notes', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
