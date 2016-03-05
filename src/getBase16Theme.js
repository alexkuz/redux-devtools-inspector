import * as themes from 'redux-devtools-themes';

export default function getBase16Theme(theme) {
  if (typeof theme === 'string') {
    return themes[theme];
  }

  return theme.hasOwnProperty('base00') ? theme : undefined;
}
