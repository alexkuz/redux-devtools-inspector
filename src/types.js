/* @noflow */
export type Action = {
  timestamp: Date,
  error: ?string
};

/* @noflow */
export type TabName = 'Action' | 'Diff' | 'State';
/* @noflow */
export type Tab = {
  name: TabName,
  component: React$Component
};

/* @noflow */
export type ReduxState = {
  selectedActionId: null | number,
  startActionId: null | number,
  inspectedActionPath: string[],
  inspectedStatePath: string[],
  tabName: TabName
};

/* @noflow */
export type MonitorState = {
  initialScrollTop: number
};
