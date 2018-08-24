import React from 'react';
import { AppRegistry } from 'react-native';
import Base from './modules/components/base';
import { Provider } from 'react-redux';
import store from './modules/store';

export default class YindexerUi extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Base />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('yIndexerUi', () => YindexerUi);