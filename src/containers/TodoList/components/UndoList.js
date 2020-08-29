import React, { Component } from "react";

class UndoList extends Component {
  render() {
    const { list, deleteItem, changeStatus } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div className="undo-list-count" data-test="count">
            {list.length}
          </div>
        </div>
        <ul className="undo-list-content">
          {list.map((item, index) => (
            <li
              onClick={() => changeStatus(index)}
              className="undo-list-item"
              data-test="list-item"
              key={index}
            >
              {item.value}
              <span
                className="undo-list-delete"
                onClick={() => deleteItem(index)}
                data-test="delete-item"
              >
                -
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UndoList;
