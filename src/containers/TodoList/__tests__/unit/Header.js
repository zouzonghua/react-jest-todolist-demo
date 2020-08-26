import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });

it('Header 组件包含一个 input 框', () => {
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find("[data-test='input']")
  expect(inputElem.length).toBe(1)
});

it('Header 组件 input 框内容，初始化应该为空', () => {
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find("[data-test='input']")
  expect(inputElem.prop('value')).toEqual('')
});

it('Header 组件 input 框内容，当用户输入时，会跟随变化', () => {
  const wrapper = shallow(<Header />)
  const inputElem = wrapper.find("[data-test='input']")
  const userInput = '今天要学习 jest'
  inputElem.simulate('change', { target: {value: userInput} })
  expect(wrapper.state('value')).toEqual(userInput)

  // 集成测试
  // const newInputElem = wrapper.find("[data-test='input']")
  // expect(newInputElem.prop('value')).toBe(userInput)
});

it('Header 组件 input 框输入回车时，如果input无内容，无操作', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const inputElem = wrapper.find("[data-test='input']")
  wrapper.setState({value: ''})
  inputElem.simulate('keyUp', {keyCode: 13})
  expect(fn).not.toHaveBeenCalled();
})

it('Header 组件 input 框输入回车时，如果input有内容，函数应该被调用', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const inputElem = wrapper.find("[data-test='input']")
  const userInput = '学习 react'
  wrapper.setState({value: userInput})
  inputElem.simulate('keyUp', {keyCode: 13})
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith(userInput);
})

it('Header 组件 input 框输入回车时，如果input有内容，最后应该清除掉', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const inputElem = wrapper.find("[data-test='input']")
  const userInput = '学习 react'
  wrapper.setState({value: userInput})
  inputElem.simulate('keyUp', {keyCode: 13})
  const newInputElem = wrapper.find("[data-test='input']")
  expect(newInputElem.prop('value')).toBe('');
})
