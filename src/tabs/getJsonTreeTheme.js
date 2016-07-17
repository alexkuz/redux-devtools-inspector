export default function getJsonTreeTheme(base16Theme) {
  return {
    extend: base16Theme,
    nestedNodeItemString: ({ style }, keyPath, nodeType, expanded) => ({
      style: {
        ...style,
        display: expanded ? 'none' : 'inline'
      }
    })
  };
}
