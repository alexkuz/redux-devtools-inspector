import { DiffPatcher } from 'jsondiffpatch/src/diffpatcher';

const isLoop = function(context) {
  // Based on https://github.com/benjamine/jsondiffpatch/issues/152
  let i=0;
  let parent = context.parent;
  while (parent !== undefined) {
    if (parent.left === context.left && parent.right === context.right) {
      return true;
    }
    parent = parent.parent;
    i++;
    if (i>10) return false; // We don't want to go that deep
  }
  return false;
};

const diffpatcher = new DiffPatcher({
  arrays: { detectMove: false },
  objectHash: (o, idx) =>
    typeof o === 'object' && o.hasOwnProperty('id') ? o.id : '$$index:' + idx,
  propertyFilter: (name, context) =>
    typeof context.left[name] !== 'function' &&
    typeof context.right[name] !== 'function' &&
    !isLoop(context)
});

export default diffpatcher;
