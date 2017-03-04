// @flow
import React from 'react';
import RightSlider from './RightSlider';

import type { StylingFunction } from 'react-base16-styling';

type Props = {
  styling: StylingFunction,
  onSearch: (searchStr: string) => void,
  onCommit: () => void,
  onSweep: () => void,
  hasSkippedActions: boolean,
  hasStagedActions: boolean
};

const getActiveButtons = (hasSkippedActions): Array<'Sweep' | 'Commit'> => [
  hasSkippedActions ? 'Sweep' : null,
  'Commit'
].filter(Boolean);

const ActionListHeader =
  ({ styling, onSearch, hasSkippedActions, hasStagedActions, onCommit, onSweep }: Props) =>
  <div {...styling('actionListHeader')}>
    <input
      {...styling('actionListHeaderSearch')}
      onChange={e => onSearch(e.target.value)}
      placeholder='filter...'
    />
    <div {...styling('actionListHeaderWrapper')}>
      <RightSlider shown={hasStagedActions} styling={styling}>
        <div {...styling('actionListHeaderSelector')}>
          {getActiveButtons(hasSkippedActions).map(btn =>
            <div
              key={btn}
              onClick={() => ({
                Commit: onCommit,
                Sweep: onSweep
              })[btn]()}
              {...styling([
                'selectorButton',
                'selectorButtonSmall'], false, true)}
            >
             {btn}
            </div>
          )}
        </div>
      </RightSlider>
    </div>
  </div>;

export default ActionListHeader;
