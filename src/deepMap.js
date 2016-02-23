export default function deepMap(obj, f, ctx) {
  if (Array.isArray(obj)) {
    return obj.map(function(val, key) {
      val = f.call(ctx, val, key);
      return (typeof val === 'object') ? deepMap(val, f, ctx) : val;
    });
  } else if (typeof obj === 'object') {
    const res = {};
    for (const key in obj) {
      let val = obj[key];
      if (val && typeof val === 'object') {
        val = f.call(ctx, val, key);
        res[key] = deepMap(val, f, ctx);
      } else {
        res[key] = f.call(ctx, val, key);
      }
    }
    return res;
  } else {
    return obj;
  }
}
