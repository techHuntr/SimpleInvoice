import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {STARTUP} from './Actions';

/**
 *
 * Reducers
 */

export const loadData = (state) => ({
  ...state,
  loading: true,
  error: false,
  errorMessage: null,
});

export const fetchTokenSuccess = (state, {token}) => ({
  ...state,
  loading: false,
  error: false,
  errorMessage: null,
  successMessage: null,
  token,
});

export const fetchTokenFailure = (state, {error}) => ({
  ...state,
  loading: false,
  error: true,
  errorMessage: error,
});

export const fetchToken = (state) => ({
  ...state,
  loading: true,
  error: false,
  errorMessage: null,
  successMessage: null,
});

export const createInvoice = (state, {payload}) => ({
  ...state,
  loading: true,
  error: false,
  errorMessage: null,
  successMessage: null,
});

export const createInvoiceSuccess = (state, {message}) => ({
  ...state,
  loading: false,
  error: false,
  errorMessage: null,
  successMessage: message,
});

export const createInvoiceFailure = (state, {message}) => ({
  ...state,
  loading: false,
  error: true,
  errorMessage: message,
  successMessage: null,
});

export const getInvoice = (state, {payload}) => ({
  ...state,
  loading: true,
  error: false,
  errorMessage: null,
  successMessage: null,
});

export const getInvoiceSuccess = (state, {data}) => ({
  ...state,
  loading: false,
  error: false,
  errorMessage: null,
  data: state.data.length > 0 ? state.data.concat(data.data) : data.data,
});

export const getInvoiceFailure = (state, {message}) => ({
  ...state,
  loading: false,
  error: true,
  errorMessage: message,
  successMessage: null,
});

export const clearData = (state, {message}) => ({
  ...state,
  loading: false,
  error: false,
  errorMessage: null,
  successMessage: null,
  data: [],
});

export const reducer = createReducer(INITIAL_STATE, {
  [STARTUP.LOAD_DATA]: loadData,
  [STARTUP.FETCH_TOKEN_SUCCESS]: fetchTokenSuccess,
  [STARTUP.FETCH_TOKEN_FAILURE]: fetchTokenFailure,
  [STARTUP.FETCH_TOKEN]: fetchToken,
  [STARTUP.CREATE_INVOICE]: createInvoice,
  [STARTUP.CREATE_INVOICE_SUCCESS]: createInvoiceSuccess,
  [STARTUP.CREATE_INVOICE_FAILURE]: createInvoiceFailure,
  [STARTUP.GET_INVOICE]: getInvoice,
  [STARTUP.GET_INVOICE_SUCCESS]: getInvoiceSuccess,
  [STARTUP.GET_INVOICE_FAILURE]: getInvoiceFailure,
  [STARTUP.CLEAR_DATA]: clearData,
});
