export default function getInspectedState(state, path) {
  return path.length ?
    {
      [path[path.length - 1]]: path.reduce(
        (s, key) => s && s[key],
        state
      )
    } : state;
}
