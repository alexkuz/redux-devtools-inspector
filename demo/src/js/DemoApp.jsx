import React from 'react';
import Component from '../../../src/Component';
import PageHeader from 'react-bootstrap/lib/PageHeader';

import pkg from '../../../package.json';

const styles = {
  wrapper: {
    height: '100vh',
    width: '80%',
    margin: '0 auto',
    paddingTop: '1px'
  },
  header: {
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '100px'
  },
  muted: {
    color: '#CCCCCC'
  }
};

export default class DemoApp extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <PageHeader style={styles.header}>
          {pkg.name || <span style={styles.muted}>Package Name</span>}
        </PageHeader>
        <h5>{pkg.description || <span style={styles.muted}>Package Description</span>}</h5>
        <div style={styles.content}>
          <Component />
        </div>
      </div>
    );
  }
}
