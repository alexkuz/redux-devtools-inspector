import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import { connect } from 'react-redux';
import pkg from '../../../package.json';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';

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
  },
  links: {
    textAlign: 'center'
  },
  link: {
    margin: '0 0.5rem',
    cursor: 'pointer',
    display: 'block'
  },
  input: {
    display: 'inline-block',
    width: '30rem'
  }
};

function buildUrl(options) {
  return '?' + [
    options.useExtension ? 'ext' : '',
    options.supportImmutable ? 'imutable' : '',
    options.theme ? 'theme=' + options.theme : ''
  ].filter(s => s).join('&');
}

function setTheme(options, theme) {
  window.location = buildUrl({ ...options, theme });
}

class DemoApp extends React.Component {
  render() {
    const { options } = this.props;

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
            <Button onClick={this.props.changeNested} style={styles.button}>
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
            <Button onClick={this.props.addImmutableMap} style={styles.button}>
              Add Immutable Map
            </Button>
            <Button onClick={this.props.changeImmutableNested} style={styles.button}>
              Change Immutable Nested
            </Button>
            <Button onClick={this.props.hugePayload} style={styles.button}>
              Huge Payload
            </Button>
          </div>
        </div>
        <div style={styles.links}>
          <div style={styles.input}>
            <Input defaultValue={options.theme}
                   type='text'
                   ref='theme'
                   addonAfter={
                    <a onClick={() => setTheme(options, this.refs.theme.getValue())}
                       style={styles.link}>
                      Set Theme
                    </a>
                   } />
          </div>
          <a href={buildUrl({ ...options, useExtension: !options.useExtension })}
             style={styles.link}>
            {(options.useExtension ? 'Disable' : 'Enable') + ' Chrome Extension'}
          </a>
          <a href={buildUrl({ ...options, supportImmutable: !options.supportImmutable })}
             style={styles.link}>
            {(options.supportImmutable ? 'Disable' : 'Enable') + ' Full Immutable Support'}
          </a>
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
    changeNested: () => ({ type: 'CHANGE_NESTED' }),
    pushHugeArray: () => ({ type: 'PUSH_HUGE_ARRAY' }),
    addIterator: () => ({ type: 'ADD_ITERATOR' }),
    addHugeObect: () => ({ type: 'ADD_HUGE_OBJECT' }),
    addRecursive: () => ({ type: 'ADD_RECURSIVE' }),
    addImmutableMap: () => ({ type: 'ADD_IMMUTABLE_MAP' }),
    changeImmutableNested: () => ({ type: 'CHANGE_IMMUTABLE_NESTED' }),
    hugePayload: () => ({
      type: 'HUGE_PAYLOAD',
      payload: Array.from({ length: 10000 }).map((_, i) => i)
    })
  }
)(DemoApp);
