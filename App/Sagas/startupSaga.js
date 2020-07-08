import {put, call, select, delay} from 'redux-saga/effects';
import STARTUPACTIONS from '../Stores/Invoice/Actions';

//Saga for business logic handling

export function* startup(api, action) {
  const response = yield call(makeAPiCall, api.createToken);

  try {
    if (response.ok) {
      const token = response.data.access_token;
      yield call(api.setAuthToken, token);
      yield put(STARTUPACTIONS.fetchTokenSuccess(token));
    } else {
      yield put(STARTUPACTIONS.fetchTokenFailure(response.error));
    }
  } catch (err) {
    yield put(STARTUPACTIONS.fetchTokenFailure(err.message));
  }
}

function* makeAPiCall(action, options = null) {
  const response = yield call(action, options);
  console.log('Response', response);
  if (response.status == 401) {
    yield put(STARTUPACTIONS.fetchToken());
    yield delay(2000);
    const rs = yield call(action, options);
    return rs;
  } else {
    return response;
  }
}

export function* createInvoice(api, action) {
  const {payload} = action;
  const response = yield call(makeAPiCall, api.createInvoice, payload);
  try {
    if (response.ok) {
      var status = response.data.status.message;
      yield put(STARTUPACTIONS.createInvoiceSuccess(status));
    } else {
      yield put(STARTUPACTIONS.createInvoiceFailure(response.data));
    }
  } catch (err) {
    yield put(STARTUPACTIONS.createInvoiceFailure(err.message));
  }
}

export function* getInvoices(api, action) {
  const {payload} = action;
  const response = yield call(makeAPiCall, api.getInvoice, payload);
  try {
    if (response.ok) {
      var data = response.data;
      yield put(STARTUPACTIONS.getInvoiceSuccess(data));
    } else {
      yield put(
        STARTUPACTIONS.getInvoiceFailure(response.data.errors[0].message),
      );
    }
  } catch (err) {
    yield put(STARTUPACTIONS.getInvoiceFailure(err.message));
  }
}


