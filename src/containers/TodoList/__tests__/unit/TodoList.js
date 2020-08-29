import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

describe('TodoList 组件测试', () => {

  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />)
    expect(wrapper.state('undoList')).toEqual([])
  });

  it('应该给 Header 传递一个增加 undoList 内容的方法 ', () => {
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')
    expect(Header.prop('addUndoItem')).toBeTruthy()
  });

  it('当 addUndoItem 被执行当时候， undoList 应该新增内容', () => {
    const wrapper = shallow(<TodoList />)
    const content = '学习 React'
    const { addUndoItem } = wrapper.instance()
    addUndoItem(content)
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: content
    })
    addUndoItem(content)
    expect(wrapper.state('undoList').length).toBe(2)
  });

  it('UndoList 组件应该接受 list, deleteItem, changeStatus 参数', () => {
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
    expect(UndoList.prop('changeStatus')).toBeTruthy()
  });

  it('当 deleteItem 方法被执行时， undoList 应该删除数据', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: ['学习 jest', 'zong', 'hua']
    })

    wrapper.instance().deleteItem(1)
    expect(wrapper.state('undoList')).toEqual(['学习 jest', 'hua'])
  });

})

