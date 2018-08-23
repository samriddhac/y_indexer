import React from 'react';
import Base from './modules/components/base';
import { Provider } from 'react-redux';
import store from './modules/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Base />
      </Provider>
    );
  }
}
