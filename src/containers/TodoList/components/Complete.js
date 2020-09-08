import React, { Component } from 'react';

class Complete extends Component {
  render() {
    const { list, deleteCompleteItem,undoCompleteItem } = this.props;
    return (
      <div className="complete-list">
        <div className="complete-list-title">
          已完成
          <div className="complete-list-count" data-test="count">
            {list && list.length}
          </div>
        </div>
        <ul className="complete-list-content">
          {list &&
            list.map((item, index) => (
              <li className="complete-list-item" data-test="list-item" key={index}>
                <div>
                  <input
                    className="complete-list-item-checkbox"
                    checked={false}
                    onChange={(e) => {
                      e && e.stopPropagation();
                      e.target.checked && undoCompleteItem(index)
                    }}
                    type="checkbox"
                    data-test="checkbox"
                  />
                  <span>{item.value}</span>
                </div>
                <span
                  className="complete-list-delete"
                  onClick={(e) => {
                    e && e.stopPropagation();
                    deleteCompleteItem(index);
                  }}
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

export default Complete;
