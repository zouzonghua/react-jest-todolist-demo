import React, { Component } from 'react';
import Header from './components/Header';
import UndoList from './components/UndoList';
import Complete from './components/Complete';
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: [],
      completeList: [],
    };

    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.completeItem = this.completeItem.bind(this);

    this.deleteCompleteItem = this.deleteCompleteItem.bind(this);
    this.undoCompleteItem = this.undoCompleteItem.bind(this);
  }

  addUndoItem(value) {
    this.setState({
      undoList: [
        ...this.state.undoList,
        {
          status: 'div',
          value,
        },
      ],
    });
  }

  deleteItem(index) {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    this.setState({ undoList: newList });
  }

  changeStatus(index) {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'input',
        };
      }
      return {
        ...item,
        status: 'div',
      };
    });
    this.setState({ undoList: newList });
  }

  handleBlur(index) {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'div',
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  }

  valueChange(index, value) {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          value,
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  }

  completeItem(index) {
    const newUndoList = [...this.state.undoList];
    const newCompleteList = [...this.state.completeList, ...newUndoList.splice(index, 1)];
    this.setState({ undoList: newUndoList, completeList: newCompleteList });
  }

  deleteCompleteItem(index) {
    const newList = [...this.state.completeList];
    newList.splice(index, 1);
    this.setState({ completeList: newList });
  }

  undoCompleteItem(index) {
    const newCompleteList = [...this.state.completeList]
    const newUndoList = [...this.state.undoList, ...newCompleteList.splice(index, 1)]
    this.setState({ completeList: newCompleteList,undoList: newUndoList });
  }

  render() {
    const { undoList, completeList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          list={undoList}
          valueChange={this.valueChange}
          handleBlur={this.handleBlur}
          deleteItem={this.deleteItem}
          changeStatus={this.changeStatus}
          completeItem={this.completeItem}
        />
        <Complete
          undoCompleteItem={this.undoCompleteItem}
          deleteCompleteItem={this.deleteCompleteItem}
          list={completeList}
        />
      </div>
    );
  }
}

export default TodoList;
