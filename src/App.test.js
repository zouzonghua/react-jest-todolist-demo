import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

test('测试页面 App 组件', () => {
  // 单元测试使用 shallow
  // 集成测试使用 mount
  const wrapper = shallow(<App />)
  expect(wrapper).toMatchSnapshot()
  // const container = wrapper.find('[data-test="container"]')
  // console.log(wrapper.debug())
  // expect(container).toExist()
  // expect(container).toHaveProp('title', 'zonghua')
});
