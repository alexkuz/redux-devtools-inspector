# redux-devtools-inspector

A state monitor for [Redux DevTools](https://github.com/gaearon/redux-devtools) that provides a convenient way to inspect "real world" app states that could be complicated and deeply nested.

![](demo.gif)

### Installation

```
npm install --save-dev redux-devtools-inspector
```

### Usage

You can use `Inspector` as the only monitor in your app:

##### `containers/DevTools.js`

```js
import React from 'react';
import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';

export default createDevTools(
  <Inspector />
);
```

Then you can render `<DevTools>` to any place inside app or even into a separate popup window.

Alternative, you can use it together with [`DockMonitor`](https://github.com/gaearon/redux-devtools-dock-monitor) to make it dockable.  
Consult the [`DockMonitor` README](https://github.com/gaearon/redux-devtools-dock-monitor) for details of this approach.

[Read how to start using Redux DevTools.](https://github.com/gaearon/redux-devtools)

### Features

The inspector displays a list of actions and a preview panel which shows the state after the selected action and a diff with the previous state. If no actions are selected, the last state is shown.

You may pin a certain part of the state to only track its changes.

### Props

Name                  | Description
-------------         | -------------
`theme`               | An object, containing classnames or style objects that are used to style `Inspector` (similar to [react-themeable](https://github.com/markdalgleish/react-themeable)).

### License

MIT
