// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import * as emotion from 'emotion';
// import { createSerializer } from 'jest-emotion';
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const emotion = require('emotion');
const { createSerializer } = require('jest-emotion');

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer(emotion));
