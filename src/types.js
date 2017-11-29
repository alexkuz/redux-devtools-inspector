// @noflow

export type Action = {
  timestamp: Date,
  error: ?string
};

export type TabName = 'Action' | 'Diff' | 'State';
export type Tab = {
  name: TabName,
  component: React$Component
};

export type ReduxState = {
  selectedActionId: null | number,
  startActionId: null | number,
  inspectedActionPath: string[],
  inspectedStatePath: string[],
  tabName: TabName
};

export type MonitorState = {
  initialScrollTop: number
};
