import { getVoucherData } from "services/payment";
import { SaleResponse } from "services/sale";



function getSubtotalAmount(sale: SaleResponse) {
  let total_amount = 0;

  sale.items.forEach((item) => {
    total_amount += item.card_info.price * item.quantity
  })

  return total_amount;
}

async function getDiscountValue({ transaction, subtotal_amount }: SaleResponse) {
  if (!transaction.voucherId) return null
  const voucher = await getVoucherData(transaction.voucherId);
  const discountValue = subtotal_amount * (voucher.discountPercentage / 100);
  return discountValue;
}


export const mapSale = async (sale: SaleResponse) => ({
  ...sale,
  subtotal_amount: getSubtotalAmount(sale),
  discount_value: await getDiscountValue({ ...sale, subtotal_amount: getSubtotalAmount(sale) })
});