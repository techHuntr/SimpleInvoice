import {createActions} from 'reduxsauce';

//javascrip actions as object

const {Types, Creators} = createActions({
  loadData: null,
  logOut: null,
  fetchTokenSuccess: ['token'],
  fetchTokenFailure: ['error'],
  fetchToken: null,
  createInvoice: ['payload'],
  createInvoiceSuccess: ['message'],
  createInvoiceFailure: ['message'],
  getInvoice: ['payload'],
  getInvoiceSuccess: ['data'],
  getInvoiceFailure: ['message'],
  clearData: null,
});

export const STARTUP = Types;
export default Creators;
