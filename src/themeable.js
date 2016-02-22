const truthy = x => x;

export default theme => (...names) => {
  const styles = names
    .map(name => theme[name])
    .filter(truthy);

  const classStyles = styles.filter(s => typeof s === 'string');
  const objStyles = styles.filter(s => typeof s !== 'string');

  return {
    ...(classStyles.length ? { className: classStyles.join(' ') } : {}),
    ...(objStyles.length ? { style: Object.assign({}, ...objStyles) } : {})
  };
};
