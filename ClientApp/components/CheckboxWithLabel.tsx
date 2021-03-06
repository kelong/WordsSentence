import * as React from 'react'

interface CheckboxWithLabelProps extends React.Props<any> {
  labelOff: string;
  labelOn: string;
}

export default class CheckboxWithLabel extends React.Component<CheckboxWithLabelProps, any> {

  constructor(props: CheckboxWithLabelProps) {
      super(props);
      this.state = { isChecked: false };
  }
  
  onChange = () => {
    this.setState({isChecked: !this.state.isChecked});
  }

  public render() {
    return <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>;
  }
}