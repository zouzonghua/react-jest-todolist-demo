import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Header 组件测试', () => {

  it('样式正常', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  });

  it('包含一个 input 框', () => {
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'input')
    expect(inputElem.length).toBe(1)
  });

  it('输入框内容，初始化应该为空', () => {
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'input')
    expect(inputElem.prop('value')).toEqual('')
  });


  it('输入框内容，当用户输入时，会跟随变化', () => {
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'input')
    const userInput = '今天要学习 jest'
    inputElem.simulate('change', { target: {value: userInput} })
    expect(wrapper.state('value')).toEqual(userInput)
    // 集成测试
    // const newInputElem = findTestWrapper(wrapper, 'input')
    // expect(newInputElem.prop('value')).toBe(userInput)
  });


  it('输入框输入回车时，如果input无内容，无操作', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = findTestWrapper(wrapper, 'input')
    wrapper.setState({value: ''})
    inputElem.simulate('keyUp', {keyCode: 13})
    expect(fn).not.toHaveBeenCalled();
  })


  it('输入框内容被触发时，外部传入当函数被调用，内容清空', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = findTestWrapper(wrapper, 'input')
    const userInput = '学习 react'
    wrapper.setState({value: userInput})
    inputElem.simulate('keyUp', {keyCode: 13})
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput);
    const newInputElem = findTestWrapper(wrapper, 'input')
    expect(newInputElem.prop('value')).toBe('');
  })

})

