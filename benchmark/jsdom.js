const jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };

const exposedProperties = ['document', 'window', 'navigator'];
Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = window[property];
  }
});
