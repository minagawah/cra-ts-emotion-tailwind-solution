import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { App } from '../App';

beforeEach(() => {
});

afterEach(() => {
});

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
