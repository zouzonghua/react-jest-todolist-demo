import React from 'react';
import { shallow } from 'enzyme';
import Complete from '../../components/Complete';
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Complete 组件测试', () => {

  it('样式正常', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<Complete list={listData} />)
    expect(wrapper).toMatchSnapshot()
  });

  it('完成列表当数据为空数组 count 数目为0，列表无内容 ', () => {
    const wrapper = shallow(<Complete list={[]} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('0');
    expect(listItems.length).toEqual(0);
  });


  it('完成列表当数据为空数组 count 数目显示数据长度，列表不为空 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<Complete list={listData} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('2');
    expect(listItems.length).toEqual(2);
  });

  it('完成列表当数据有内容时，要存在删除按钮 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<Complete list={listData} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    expect(deleteItems.length).toEqual(2);
  });


  it('完成列表当数据有内容时，点击某个删除按钮，会调用 deleteCompleteItem 方法 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<Complete deleteCompleteItem={fn} list={listData} />);
    const deleteCompleteItems = findTestWrapper(wrapper, 'delete-item');
    deleteCompleteItems.at(index).simulate('click');
    expect(fn).toHaveBeenLastCalledWith(index);
  });


  it('完成列表当数据有内容时，要存在复选框按钮 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const wrapper = shallow(<Complete list={listData} />);
    const checkboxItems = findTestWrapper(wrapper, 'checkbox');
    expect(checkboxItems.length).toEqual(2);
  });


  it('完成列表当数据有内容时，点击某个复选框按钮，会调用 undoCompleteItem 方法 ', () => {
    const listData = [
      { status: 'div', value: '学习 jest' },
      { status: 'div', value: '学习 TDD' },
    ];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<Complete undoCompleteItem={fn} list={listData} />);
    const checkboxCompleteItems = findTestWrapper(wrapper, 'checkbox');
    checkboxCompleteItems.at(index).simulate('change', {target: {checked: true}, stopPropagation: jest.fn()});
    expect(fn).toHaveBeenLastCalledWith(index);
  });
})
