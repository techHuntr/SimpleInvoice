import {takeLatest, all} from 'redux-saga/effects';
import {STARTUP} from '../Stores/Invoice/Actions';
import {startup, getInvoices, createInvoice} from './startupSaga';
import API from '../Services/Api';

const api = API.create();

export default function* root() {
  yield all([takeLatest(STARTUP.FETCH_TOKEN, startup, api)]);
  yield all([takeLatest(STARTUP.GET_INVOICE, getInvoices, api)]);
  yield all([takeLatest(STARTUP.CREATE_INVOICE, createInvoice, api)]);
}
