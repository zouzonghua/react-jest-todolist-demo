import React, { Component } from 'react';

class UndoList extends Component {
  render() {
    const { list, deleteItem, changeStatus, handleBlur,valueChange,completeItem } = this.props;
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
              <div>
                <input className='undo-list-item-checkbox' checked={false} onChange={(e) => {
                  e && e.stopPropagation();
                  e.target.checked && completeItem(index)
                }} type="checkbox" data-test="checkbox" />
                {item.status === 'div' ? (
                  <span>{item.value}</span>
                ) : (
                  <input
                    className='undo-list-item-input'
                    onBlur={() => handleBlur(index)}
                    onChange={(e) => valueChange(index, e.target.value)}
                    value={item.value}
                    data-test="input" />
                )}
              </div>
              <span
                className="undo-list-delete"
                onClick={(e) => {
                  e && e.stopPropagation();
                  deleteItem(index)
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

export default UndoList;
