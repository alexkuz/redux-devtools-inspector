import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { connect } from 'react-redux';
import pkg from '../../../package.json';
import Button from 'react-bootstrap/lib/Button';

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
    paddingTop: '100px',
    height: '50%'
  },
  muted: {
    color: '#CCCCCC'
  }
};

class DemoApp extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <PageHeader style={styles.header}>
          {pkg.name || <span style={styles.muted}>Package Name</span>}
        </PageHeader>
        <h5>{pkg.description || <span style={styles.muted}>Package Description</span>}</h5>
        <div style={styles.content}>
          <Button onClick={this.props.increment}>Increment</Button>
          <Button onClick={this.props.push}>Push</Button>
          <Button onClick={this.props.pop}>Pop</Button>
          <Button onClick={this.props.replace}>Replace</Button>
          <Button onClick={this.props.nested}>Change Nested</Button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  {
    increment: () => ({ type: 'INCREMENT' }),
    push: () => ({ type: 'PUSH' }),
    pop: () => ({ type: 'POP' }),
    replace: () => ({ type: 'REPLACE' }),
    nested: () => ({ type: 'CHANGE_NESTED' })
  }
)(DemoApp);
