export const capitalForTable = (
  value: string,
  fractionDigits: number = 1,
): string => {
  const num = Number(value)

  if (isNaN(num)) {
    return value
  }

  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(fractionDigits)}k`
  } else if (num >= 1000000 && num < 1000000000) {
    return `${(num / 1000000).toFixed(fractionDigits)}m`
  } else if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(fractionDigits)}b`
  }

  return value
}

export const formatThousands = (
  value: number | string,
  divider = ",",
): string =>
  value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, divider)
