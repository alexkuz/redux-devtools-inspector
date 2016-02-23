const truthy = x => x;

export default theme => (...names) => {
  const styles = names
    .reduce((arr, name) => [...arr, name, name + 'Color'], [])
    .map(name => theme[name])
    .filter(truthy);

  const classStyles = styles.filter(s => typeof s === 'string');
  const objStyles = styles.filter(s => typeof s !== 'string');

  return {
    ...(classStyles.length ? { className: classStyles.join(' ') } : {}),
    ...(objStyles.length ? { style: Object.assign({}, ...objStyles) } : {})
  };
};
