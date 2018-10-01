export function getPercentage(count, total) {
  return total === 0 ? 0 : parseInt(count / total * 100, 10)
}
export function isNullObj(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}