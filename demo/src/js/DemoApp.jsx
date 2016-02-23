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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: '100px'
  },
  muted: {
    color: '#CCCCCC'
  },
  button: {
    marginRight: '1rem'
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
          <Button onClick={this.props.increment} style={styles.button}>Increment</Button>
          <Button onClick={this.props.push} style={styles.button}>Push</Button>
          <Button onClick={this.props.pop} style={styles.button}>Pop</Button>
          <Button onClick={this.props.replace} style={styles.button}>Replace</Button>
          <Button onClick={this.props.nested} style={styles.button}>Change Nested</Button>
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
