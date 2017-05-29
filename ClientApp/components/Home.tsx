import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState, ENTER_KEY, ESCAPE_KEY } from '../store';
import * as WordsState from '../store/Text';
import TextareaAutosize from 'react-autosize-textarea';

// At runtime, Redux will merge together...
type WordsProps =
    WordsState.WordsState        // ... state we've requested from the Redux store
    & typeof WordsState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters   

export interface WordsState {
    data: string;
}

class Home extends React.Component<WordsProps, WordsState> {

    constructor(props: WordsProps) {
        super(props);
        this.state = { data: '' };
    }

    public render() {
        return <div>
            <h1>Words storage</h1>
            { this.renderWriteSentence() }
        </div>;
    }

    private handleChange = (event) => {
        this.setState({ data: event.target.value });
    }

    private handleKeyDown = (event) => {
        if (event.which === ESCAPE_KEY) {
            this.setState({ data: '' });
        }
    }

    private renderWriteSentence() {
        return <div>
            <TextareaAutosize
                rows={3}
                className='col-lg-12 form-control'
                placeholder='Write the sentence'
                value={this.state.data}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
            <button onClick={() => { this.props.submitAsXml(this.state.data) }}>Submit as XML</button>
            <button onClick={() => { this.props.submitAsCsv(this.state.data) }}>Submit as CSV</button>
            <p>{ this.props.returnedData }</p>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.text, // Selects which state properties are merged into the component's props
    WordsState.actionCreators                 // Selects which action creators are merged into the component's props
)(Home) as typeof Home;
