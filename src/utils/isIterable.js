// @flow
export default function isIterable(obj: any): boolean {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) &&
    typeof obj[window.Symbol.iterator] === 'function';
}
