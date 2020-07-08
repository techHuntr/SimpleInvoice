import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import createStore from './Stores/';
import {PersistGate} from 'redux-persist/lib/integration/react';
import RootScreen from './root';

const {store, persistor} = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }
}
