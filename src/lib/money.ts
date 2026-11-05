/**
 * Non-floating point monetary calculation helpers.
 * Computes calculations in integer cents/paise (base units) to prevent JavaScript IEEE 754 precision issues.
 */

export function toCents(amount: number): number {
  return Math.round(Number(amount || 0) * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}

export function addMoney(a: number, b: number): number {
  const centsA = toCents(a);
  const centsB = toCents(b);
  return fromCents(centsA + centsB);
}

export function subtractMoney(a: number, b: number): number {
  const centsA = toCents(a);
  const centsB = toCents(b);
  return fromCents(centsA - centsB);
}

export function sumMoney(amounts: number[]): number {
  const totalCents = amounts.reduce((sum, val) => sum + toCents(val), 0);
  return fromCents(totalCents);
}

export function multiplyMoney(amount: number, multiplier: number): number {
  const cents = toCents(amount);
  return fromCents(Math.round(cents * multiplier));
}

export function formatMoney(
  amount: number,
  currencyCode: string = "INR"
): string {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toLocaleString()}`;
  }
}
