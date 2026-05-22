export function mapOrderToResponse(order: any) {
  return {
    id: order._id,

    totalAmount: order.totalAmount,
    paymentType: order.paymentType,
    status: order.status,

    customer: order.customer
      ? {
          id: order.customer._id,
          fullName: order.customer.fullName,
          phone: order.customer.phone,
        }
      : null,

    cashier: order.cashier
      ? {
          id: order.cashier._id,
          fullName: order.cashier.fullName,
        }
      : null,

    branch: order.branch
      ? {
          id: order.branch._id,
          name: order.branch.name,
        }
      : null,

    items:
      order.items?.map((item: any) => ({
        product: item.product
          ? {
              id: item.product._id,
              name: item.product.name,
              sellingPrice: item.product.sellingPrice,
            }
          : null,

        quantity: item.quantity,
        price: item.price,
      })) || [],

    createdAt: order.createdAt,
  };
}

export function mapOrdersToResponse(orders: any[]) {
  return orders.map(mapOrderToResponse);
}
