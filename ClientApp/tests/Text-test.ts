import {} from "jest";
import * as fetch from "jest-fetch-mock";
import configureStore from 'redux-mock-store'; // mock store 
import thunk from 'redux-thunk';
 
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
 
import { baseUrl } from 'domain-task/fetch';
baseUrl('http://localhost:5000'); // Relative URLs will be resolved against this

import { actionCreators } from '../store/Text';
 
describe('Submit sentence action creators', () => {
  
  it('dispatches the correct actions on successful fetch SubmitAsXml request', () => {
  
    var data = "12345";

    fetch.mockResponseOnce(data);

    const expectedActions = [
      {
        "data": "12345",
        "type": "POST_SENTENCE_AS_XML"
      },
      {
        "returnedData": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<text>\n<sentence>\n<word>12345</word>\n</sentence>\n</text>\n",
        "type": "RECEIVE_SENTENCE"
      }
    ];

    const store = mockStore({Data: "" });
 
    return store.dispatch(actionCreators.submitAsXml(data))
      //submitAsXml contains the fetch call 
      .then(() => { // return of async actions 
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
 
  it('dispatches the correct actions on successful fetch SubmitAsCsv request', () => {
  
    var data = "12345";

    fetch.mockResponseOnce(data);

    const expectedActions = [
      {
        "data": "12345",
        "type": "POST_SENTENCE_AS_CSV"
      },
      {
        "returnedData": ", Word 1\nSentence 1, 12345",
        "type": "RECEIVE_SENTENCE"
      }
    ];

    const store = mockStore({Data: "" });
 
    return store.dispatch(actionCreators.submitAsCsv(data))
      //submitAsXml contains the fetch call 
      .then(() => { // return of async actions 
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it ('dispatches the correct actions on successful onChange request', () => {

    var data = "12345";

    const expectedActions = [
      {
        "data": "12345",
        "type": "CHANGE_SENTENCE"
      }
    ];

    const store = mockStore({Data: "" });

    store.dispatch(actionCreators.dataChanged(data));

    return expect(store.getActions()).toEqual(expectedActions);
  });

});