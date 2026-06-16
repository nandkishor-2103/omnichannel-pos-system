export interface CreatePaymentOrderRequestDto {
  amount: number;
}

export interface CreatePaymentOrderResponseDto {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}
