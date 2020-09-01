import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils';

describe('UndoList 组件测试', () => {
  it('样式正常', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<UndoList list={listData} />)
    expect(wrapper).toMatchSnapshot()
  });

  it('未完成列表当数据为空数组 count 数目为0，列表无内容 ', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('0');
    expect(listItems.length).toEqual(0);
  });

  it('未完成列表当数据有内容时 count 数目显示数据长度，列表不为空 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<UndoList list={listData} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('2');
    expect(listItems.length).toEqual(2);
  });

  it('未完成列表当数据有内容时，要存在删除按钮', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<UndoList list={listData} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    expect(deleteItems.length).toEqual(2);
  });

  it('未完成列表当数据有内容时，点击某个删除按钮，会调用删除方法 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    deleteItems.at(1).simulate('click');
    expect(fn).toHaveBeenLastCalledWith(1);
  });

  it('当某一项被点击时，触发执行 changeStatus 函数 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList changeStatus={fn} list={listData} />);
    const listItems = findTestWrapper(wrapper, 'list-item');
    listItems.at(1).simulate('click');
    expect(fn).toHaveBeenLastCalledWith(index);
  });

  it('当某一项 status 是 input 时，展示输入框', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'input', value: '学习 TDD' },
    ];
    const wrapper = shallow(<UndoList list={listData} />);
    const inputItems = findTestWrapper(wrapper, 'input');
    expect(inputItems.length).toBe(1);
  });

  it('当某一个输入框失去焦点时，触发执行 handleBlur 方法 ', () => {
    const listData = [
      { status: 'div', value: '学习 TDD' },
      { status: 'input', value: '学习 jest' },
    ];
    const fn = jest.fn();
    const wrapper = shallow(<UndoList handleBlur={fn} list={listData} />);
    const inputItems = findTestWrapper(wrapper, 'input');
    inputItems.simulate('blur');
    expect(fn).toHaveBeenLastCalledWith(1);
  });

  it('当某一个输入框变更时，触发执行 valueChange 方法 ', () => {
    const listData = [
      { status: 'div', value: '学习 TDD' },
      { status: 'input', value: '学习 jest' },
    ];
    const fn = jest.fn();
    const value = '学习 React';
    const wrapper = shallow(<UndoList valueChange={fn} list={listData} />);
    const inputItems = findTestWrapper(wrapper, 'input');
    inputItems.simulate('change', {
      target: { value },
    });
    expect(fn).toHaveBeenLastCalledWith(1, value);
  });
});
