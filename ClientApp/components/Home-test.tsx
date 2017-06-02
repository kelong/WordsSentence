import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import TextareaAutosize from 'react-autosize-textarea';

import * as Home from './Home';

it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const textArea = TestUtils.renderIntoDocument(
      <TextareaAutosize
                rows={3}
                className='col-lg-12 form-control'
                placeholder='Write the sentence'
                value={this.state.data}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown} />
  );

  const textAreaNode = ReactDOM.findDOMNode(textArea);

  // Verify that it's empty by default
  expect(textArea.textContent).toEqual('');

  // Simulate a click and verify that it is now On
  TestUtils.Simulate.change(
    TestUtils.findRenderedDOMComponentWithTag(textArea, 'some text')
  );
  expect(textAreaNode.textContent).toEqual('some text');
});