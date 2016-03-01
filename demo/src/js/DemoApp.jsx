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
    height: '50%'
  },
  buttons: {
    display: 'flex',
    width: '40rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  muted: {
    color: '#CCCCCC'
  },
  button: {
    margin: '0.5rem'
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
          <div style={styles.buttons}>
            <Button onClick={this.props.increment} style={styles.button}>
              Increment
            </Button>
            <Button onClick={this.props.push} style={styles.button}>
              Push
            </Button>
            <Button onClick={this.props.pop} style={styles.button}>
              Pop
            </Button>
            <Button onClick={this.props.replace} style={styles.button}>
              Replace
            </Button>
            <Button onClick={this.props.nested} style={styles.button}>
              Change Nested
            </Button>
            <Button onClick={this.props.pushHugeArray} style={styles.button}>
              Push Huge Array
            </Button>
            <Button onClick={this.props.addHugeObect} style={styles.button}>
              Add Huge Object
            </Button>
            <Button onClick={this.props.addIterator} style={styles.button}>
              Add Iterator
            </Button>
            <Button onClick={this.props.addRecursive} style={styles.button}>
              Add Recursive
            </Button>
          </div>
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
    nested: () => ({ type: 'CHANGE_NESTED' }),
    pushHugeArray: () => ({ type: 'PUSH_HUGE_ARRAY' }),
    addIterator: () => ({ type: 'ADD_ITERATOR' }),
    addHugeObect: () => ({ type: 'ADD_HUGE_OBJECT' }),
    addRecursive: () => ({ type: 'ADD_RECURSIVE' })
  }
)(DemoApp);
