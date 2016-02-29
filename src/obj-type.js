import { Iterable } from 'immutable';

export default function(obj) {
    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj) &&
        typeof obj[Symbol.iterator] === 'function'
    ) {
        return Iterable.isIterable(obj) ? 'Immutable_Iterable' : 'Iterable';
    }
    return Object.prototype.toString.call(obj).slice(8, -1);
}