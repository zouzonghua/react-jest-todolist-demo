import React, { Component } from "react";

class UndoList extends Component {
  render() {
    const { list,deleteItem } = this.props;
    return (
      <div>
        <div data-test="count">{list.length}</div>
        {list.map((item, index) => (
          <li data-test="list-item" key={`${item}-${index}`}>
            {item}
            <span onClick={() => deleteItem(index)} data-test="delete-item">-</span>
          </li>
        ))}
      </div>
    );
  }
}

export default UndoList;
