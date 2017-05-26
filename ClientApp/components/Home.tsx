import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as WordsState from '../store/WeatherForecasts';
import TextareaAutosize from 'react-autosize-textarea';

// At runtime, Redux will merge together...
type WordsProps =
    WordsState.WordsState        // ... state we've requested from the Redux store
    & typeof WordsState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters   

class Home extends React.Component<WordsProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        //let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        //this.props.requestWeatherForecasts(startDateIndex);
    }

    componentWillReceiveProps(nextProps: WordsProps) {
        // This method runs when incoming props (e.g., route params) change
        //let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        //this.props.requestWeatherForecasts(startDateIndex);
    }
    
    public render() {
        return <div>
            <h1>Words storage</h1>
            { this.renderWriteSentence() }
        </div>;
    }

    private updateData(e) {
        this.props.dataChanged(e.target.value);
    }

    private renderWriteSentence() {
        return <div>
            <TextareaAutosize
                rows={3}
                className='col-lg-12 form-control'
                placeholder='Write the sentence'
                value={this.props.data}
                onBlur={this.updateData}
            />
            <button onClick={() => { this.props.submit(this.props.data) }}>Submit</button>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
    WordsState.actionCreators                 // Selects which action creators are merged into the component's props
)(Home) as typeof Home;
