import * as React from 'react';
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal'; // The modal emitter
import { RouteComponentProps } from 'react-router-dom';

import { ApplicationState } from '../store';
import ModalComponent from './ModalComponent';

type ComponentWithModalProps = RouteComponentProps<{}>;

export default class ComponentWithModal extends React.Component<ComponentWithModalProps, {}> {
  constructor(props) {
      super(props);
  }
 
  private addModal() {
    modal.add(ModalComponent, {
      title: 'This is my modal',
      size: 'medium', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideTitleBar: false, // (optional) Switch to true if do not want the default title bar and close button,
      hideCloseButton: false // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
    });
  }
  
  public render() {
    return <button onClick={ this.addModal.bind(this) }>Add modal</button>;
  }
}