
export function formatToCurrency(number: number, currencyCode = "INR") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(number);
  }
  