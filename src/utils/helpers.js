export function getPercentage(count, total) {
  return total === 0 ? 0 : parseInt(count / total * 100, 10)
}