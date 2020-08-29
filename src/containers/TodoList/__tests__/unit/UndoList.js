import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils'

describe('UndoList 组件测试', () => {
  it('未完成列表当数据为空数组 count 数目为0，列表无内容 ', () => {
    const wrapper = shallow(<UndoList list={[]} />)
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(countElem.text()).toEqual('0')
    expect(listItems.length).toEqual(0)
  });

  it('未完成列表当数据有内容时 count 数目显示数据长度，列表不为空 ', () => {
    const listData = ['学习 jest', '学习 TDD']
    const wrapper = shallow(<UndoList list={listData} />)
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(countElem.text()).toEqual('2')
    expect(listItems.length).toEqual(2)
  });

  it('未完成列表当数据有内容时，要存在删除按钮', () => {
    const listData = ['学习 jest', '学习 TDD']
    const wrapper = shallow(<UndoList list={listData} />)
    const deleteItems = findTestWrapper(wrapper, 'delete-item')
    expect(deleteItems.length).toEqual(2)
  });

  it('未完成列表当数据有内容时，点击某个删除按钮，会调用删除方法 ', () => {
    const listData = ['学习 jest', '学习 TDD']
    const fn = jest.fn();
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData} />)
    const deleteItems = findTestWrapper(wrapper, 'delete-item')
    deleteItems.at(1).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(1)
  });

})
