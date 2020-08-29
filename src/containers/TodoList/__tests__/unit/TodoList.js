import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';


it('TodoList 初始化列表为空', () => {
  const wrapper = shallow(<TodoList />)
  expect(wrapper.state('undoList')).toEqual([])
});

it('TodoList 应该给 Header 传递一个增加 undoList 内容的方法 ', () => {
  const wrapper = shallow(<TodoList />)
  const Header = wrapper.find('Header')
  expect(Header.prop('addUndoItem')).toBeTruthy()
});

it('当 addUndoItem 被执行当时候， undoList 应该新增内容', () => {
  const wrapper = shallow(<TodoList />)
  wrapper.instance().addUndoItem('学习 React')
  expect(wrapper.state('undoList').length).toBe(1)
  expect(wrapper.state('undoList')[0]).toBe('学习 React')
  wrapper.instance().addUndoItem('学习 React')
  expect(wrapper.state('undoList').length).toBe(2)
});

it('TodoList 应该给未完成列表传递 list 数据，以及 deleteItem 方法 ', () => {
  const wrapper = shallow(<TodoList />)
  const UndoList = wrapper.find('UndoList')
  expect(UndoList.prop('list')).toBeTruthy()
  expect(UndoList.prop('deleteItem')).toBeTruthy()
});

it('当 deleteItem 方法被执行时， undoList 应该删除数据', () => {
  const wrapper = shallow(<TodoList />)
  wrapper.setState({
    undoList: ['学习 jest', 'zong', 'hua']
  })

  wrapper.instance().deleteItem(1)
  expect(wrapper.state('undoList')).toEqual(['学习 jest', 'hua'])
});
