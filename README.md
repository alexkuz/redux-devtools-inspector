# redux-devtools-inspector

[![npm version](https://badge.fury.io/js/redux-devtools-inspector.svg)](https://badge.fury.io/js/redux-devtools-inspector)

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

Name               | Type             | Description
------------------ | ---------------- | -------------
`theme`            | Object or string | Contains either [base16](https://github.com/chriskempson/base16) theme name or object, that can be `base16` colors map or object containing classnames or styles.
`supportImmutable` | Boolean          | Better `Immutable` rendering in `Diff` (can affect performance if state has huge objects/arrays). `false` by default.

### License

MIT
