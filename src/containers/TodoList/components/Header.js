import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleInputKeyUp(e) {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value);
      this.setState({value: ''})
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input
            placeholder="Add Todo"
            className="header-input"
            onKeyUp={this.handleInputKeyUp}
            onChange={this.handleInputChange}
            data-test="input"
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default Header;
