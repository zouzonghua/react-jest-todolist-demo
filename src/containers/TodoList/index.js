import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import "./style.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: [],
    };

    this.addUndoItem = this.addUndoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  addUndoItem(value) {
    this.setState({
      undoList: [...this.state.undoList, {
        status: 'div',
        value
      }],
    });
  }

  deleteItem(index) {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    this.setState({ undoList: newList });
  }

  changeStatus(index) {
    console.log(index)
  }

  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={undoList} deleteItem={this.deleteItem} changeStatus={this.changeStatus} />
      </div>
    );
  }
}

export default TodoList;
