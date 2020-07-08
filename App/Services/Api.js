// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import NetworkConstants from '../Config/NetworkConstants';
import qs from 'qs';

// our "constructor"
const create = (baseURL = 'https://api.101digital.io/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const createToken = () => {
    var urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('scope', 'PRODUCTION');
    return api.post(NetworkConstants.TOKEN, urlencoded, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic a1B6UWVFM0N0azk0QWpoc0Q5SUFtZk1jWk93YTpjMW0yRFNkcUg0dFZpZFhLNEFWYTRlWE15QVFh',
      },
    });
  };
  const getInvoice = (obj) =>
    api.get(
      NetworkConstants.INOICE_SERVICE +
        NetworkConstants.API_VERSION +
        NetworkConstants.INVOICE_ACTION,
      {
        merchantReference: obj.merchantReference,
        pageNum: obj.pageNum,
        pageSize: obj.pageSize,
        fromDate: obj.fromDate,
        toDate: obj.toDate,
      },
      {
        'Content-Type': 'application/json',
      },
    );
  const createInvoice = (body) =>
    api.post(
      NetworkConstants.INOICE_SERVICE +
        NetworkConstants.API_VERSION +
        NetworkConstants.INVOICE_ACTION,
      body,
    );
  const setAuthToken = (userAuth) =>
    api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getInvoice,
    createInvoice,
    createToken,
    setAuthToken,
    removeAuthToken,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
