import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

describe('TodoList 组件测试', () => {
  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state('undoList')).toEqual([]);
  });

  it('应该给 Header 传递一个增加 undoList 内容的方法 ', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header');
    expect(Header.prop('addUndoItem')).toBeTruthy();
  });

  it('当 addUndoItem 被执行当时候， undoList 应该新增内容', () => {
    const wrapper = shallow(<TodoList />);
    const content = '学习 React';
    const { addUndoItem } = wrapper.instance();
    addUndoItem(content);
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: content,
    });
    addUndoItem(content);
    expect(wrapper.state('undoList').length).toBe(2);
  });

  it('UndoList 组件应该接受 list, deleteItem, changeStatus, handleBlur,valueChange,completeItem 参数', () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
    expect(UndoList.prop('changeStatus')).toBeTruthy();
    expect(UndoList.prop('handleBlur')).toBeTruthy();
    expect(UndoList.prop('valueChange')).toBeTruthy();
    expect(UndoList.prop('completeItem')).toBeTruthy();
  });

  it('当 deleteItem 方法被执行时， undoList 应该删除数据', () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    wrapper.setState({ undoList: data });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([data[0]]);
  });

  it('changeStatus 方法被执行时， undoList 数据项 status 被修改', () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    wrapper.setState({ undoList: data });
    wrapper.instance().changeStatus(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...data[1],
      status: 'input'
    });
  });

  it('handleBlur 方法被执行时， undoList 数据项 status 被修改', () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      { status: 'input', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    wrapper.setState({ undoList: data });
    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      status: 'div'
    });
  });

  it('valueChange 方法被执行时， undoList 数据项 value 被修改', () => {
    const wrapper = shallow(<TodoList />);
    const data = [{ status: 'input', value: '学习 jest' },];
    const value = 'zonghua'
    wrapper.setState({ undoList: data });
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      value
    });
  });


  it('当 completeItem 方法被执行时， undoList 应该把数据移动到 completeList 数组', () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    wrapper.setState({ undoList: data });
    wrapper.instance().completeItem(1);
    expect(wrapper.state('undoList')).toEqual([data[0]]);
    expect(wrapper.state('completeList')).toEqual([data[1]])
  });



  it('Complete 组件应该接受 list, deleteCompleteItem, undoCompleteItem 参数', () => {
    const wrapper = shallow(<TodoList />);
    const Complete = wrapper.find('Complete');
    expect(Complete.prop('list')).toBeTruthy();
    expect(Complete.prop('deleteCompleteItem')).toBeTruthy();
    expect(Complete.prop('undoCompleteItem')).toBeTruthy();
  });


  it('当 deleteCompleteItem 方法被执行时， completeList 应该删除数据', () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    wrapper.setState({ completeList: data });
    wrapper.instance().deleteCompleteItem(1);
    expect(wrapper.state('completeList')).toEqual([data[0]]);
  });


  it('当 undoCompleteItem 方法被执行时， completeList 应该把数据移动到 undoList 数组', () => {
    const wrapper = shallow(<TodoList />);
    const data = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    wrapper.setState({ completeList: data });
    wrapper.instance().undoCompleteItem(1);
    expect(wrapper.state('completeList')).toEqual([data[0]]);
    expect(wrapper.state('undoList')).toEqual([data[1]])
  });



});
