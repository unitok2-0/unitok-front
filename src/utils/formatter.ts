type FormatPrice = (
  amount: number,
  options?: { countryCode?: string; currency?: string }
) => string;

export const formatPrice: FormatPrice = (
  amount,
  { countryCode = "pt-BR", currency = "BRL" } = {}
) => {
  return new Intl.NumberFormat(countryCode, {
    style: "currency",
    currency,
  }).format(amount / 100);
};

export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}
