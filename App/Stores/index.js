import {combineReducers} from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import {AsyncStorage} from 'react-native';
import {reducer as InvoiceReducer} from './Invoice/Reducers';
import {STARTUP} from './Invoice/Actions';

export default () => {
  const appReducer = combineReducers({
    invoice: InvoiceReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === STARTUP.LOG_OUT) {
      AsyncStorage.removeItem('persist:root');

      state = undefined;
    }

    return appReducer(state, action);
  };

  return configureStore(rootReducer, rootSaga);
};
