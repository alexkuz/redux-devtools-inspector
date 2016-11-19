export default function getJsonTreeTheme(base16Theme) {
  return {
    extend: base16Theme,
    nestedNode: ({ style }, keyPath, nodeType, expanded) => ({
      style: {
        ...style,
        'white-space': expanded ? 'inherit' : 'nowrap'
      }
    }),
    nestedNodeItemString: ({ style }, keyPath, nodeType, expanded) => ({
      style: {
        ...style,
        display: expanded ? 'none' : 'inline'
      }
    })
  };
}
