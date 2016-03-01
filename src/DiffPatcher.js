import { DiffPatcher } from 'jsondiffpatch/src/diffpatcher';

const diffpatcher = new DiffPatcher({
  arrays: { detectMove: false },
  objectHash: (o, idx) => o.hasOwnProperty('id') ? o.id : '$$index:' + idx,
  propertyFilter: (name, context) =>
    typeof context.left[name] !== 'function' &&
    typeof context.right[name] !== 'function'
});

export default diffpatcher;
