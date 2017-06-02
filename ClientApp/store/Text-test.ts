import configureMockStore from 'redux-mock-store'; // mock store 
import thunk from 'redux-thunk';
 
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
 
import { actionCreators } from './Text';
 
describe('Access token action creators', () => {
 
  it('dispatches the correct actions on successful fetch request', () => {
 
    fetch.mockResponse(JSON.stringify({access_token: '12345' }))
 
    const expectedActions = [
      { type: 'SET_ACCESS_TOKEN', token: {access_token: '12345'}}
    ]
    const store = mockStore({ config: {token: "" } })
 
    return store.dispatch(actionCreators.submitAsXml())
      //getAccessToken contains the fetch call 
      .then(() => { // return of async actions 
        expect(store.getActions()).toEqual(expectedActions)
      })
 
  });
 
});