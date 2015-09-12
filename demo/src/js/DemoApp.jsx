import React from 'react';
import Component from '../../../src/Component';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import pkg from '../../../package.json';

const styles = {
  wrapper: {
    height: '100vh',
    width: '80%',
    margin: '0 auto'
  },
  header: {
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '100px'
  }
};

export default class DemoApp extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <PageHeader style={styles.header}>{pkg.name || '[[Package Name]]'}</PageHeader>
        <h5>{pkg.description || '[[Package Description]]'}</h5>
        <div style={styles.content}>
          <Component />
        </div>
      </div>
    );
  }
}
