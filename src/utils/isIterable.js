export default function isIterable(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) &&
    typeof obj[Symbol.iterator] === 'function';
}
