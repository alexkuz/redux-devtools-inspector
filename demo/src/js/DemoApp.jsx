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
          <Button onClick={this.props.increment1}>Increment 1</Button>
          <Button onClick={this.props.increment2}>Increment 2</Button>
          <Button onClick={this.props.increment3}>Change Nested</Button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  {
    increment1: () => ({ type: 'INCREMENT_STATE1' }),
    increment2: () => ({ type: 'INCREMENT_STATE2' }),
    increment3: () => ({ type: 'CHANGE_NESTED' })
  }
)(DemoApp);
