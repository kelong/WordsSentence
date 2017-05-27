import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WordsState {
    isLoading: boolean;
    data: string;
    returnedData: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ChangeSentenceAction {
    type: 'CHANGE_SENTENCE',
    data: string
}

interface PostSentenceAsXmlAction {
    type: 'POST_SENTENCE_AS_XML',
    data: string;
}

interface PostSentenceAsCsvAction {
    type: 'POST_SENTENCE_AS_CSV',
    data: string;
}

interface ReceiveSentenceAction {
    type: 'RECEIVE_SENTENCE',
    returnedData: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = PostSentenceAsXmlAction | PostSentenceAsCsvAction | ReceiveSentenceAction | ChangeSentenceAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    dataChanged: (data: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CHANGE_SENTENCE', data: data });
    },
  
    submitAsXml: (data: string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        var headers = new Headers();
        headers.set("content-type", "application/json");

        let fetchTask = fetch('/api/Sentence/GenerateXmlFromText', {
            method: 'post',
            body: JSON.stringify({
                Data: data
            }),
            headers: headers
        }).then(response => response.json() as Promise<any>)
            .then(data => {
                console.log(data);
                dispatch({ type: 'RECEIVE_SENTENCE', returnedData: data.data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'POST_SENTENCE_AS_XML', data: data });
    },

    submitAsCsv: (data: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var headers = new Headers();
        headers.set("content-type", "application/json");

        let fetchTask = fetch('api/Sentence/GenerateCsvFromText', {
            method: 'post',
            body: JSON.stringify({
                Data: data
            }),
            headers: headers
        }).then(response => response.json() as Promise<any>)
            .then(data => {
                console.log(data);
                dispatch({ type: 'RECEIVE_SENTENCE', returnedData: data.data });
            });

            addTask(fetchTask);
            dispatch({ type: 'POST_SENTENCE_AS_CSV', data: data });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WordsState = { returnedData: "", data: "", isLoading: false };

export const reducer: Reducer<WordsState> = (state: WordsState, action: KnownAction) => {
    switch (action.type) {
        case 'POST_SENTENCE_AS_XML':
            return {
                returnedData: "",
                data: state.data,
                isLoading: true
            };
        case 'POST_SENTENCE_AS_CSV':
            return {
                returnedData: "",
                data: state.data,
                isLoading: true
            };
        case 'RECEIVE_SENTENCE':
            return {
                returnedData: action.returnedData,
                data: state.data,
                isLoading: false
            };
        case 'CHANGE_SENTENCE':
            return {
                returnedData: "",
                data: action.data,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};