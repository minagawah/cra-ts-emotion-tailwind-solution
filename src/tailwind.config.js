// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const colors = {
  // gray-400: '#cbd5e0'
  // gray-500: '#a0aec0'
  // gray-600: '#718096'
  gray: '#a0aec0', // 500

  // red-400: '#fc8181',
  // red-500: '#f56565',
  // red-600: '#e53e3e',
  red: '#e53e3e', // ---> 600

  // orange-400: '#f6ad55'
  // orange-500: '#ed8936'
  // orange-600: '#dd6b20'
  orange: '#ed8936',

  // yellow-400: '#f6e05e'
  // yellow-500: '#ecc94b'
  // yellow-600: '#d69e2e'
  yellow: '#ecc94b',

  // green-400: '#68d391'
  // green-500: '#48bb78'
  // green-600: '#38a169'
  green: '#48bb78',

  // teal-400: '#4fd1c5'
  // teal-500: '#38b2ac'
  // teal-600: '#319795'
  teal: '#38b2ac',

  // blue: {
  //   400: '#63b3ed',
  //   500: '#4299e1',
  //   600: '#3182ce',
  // },
  blue: '#4299e1',

  // indigo-400: '#7f9cf5'
  // indigo-500: '#667eea'
  // indigo-600: '#5a67d8'
  indigo: '#667eea',

  // purple-400: '#b794f4'
  // purple-500: '#9f7aea'
  // purple-600: '#805ad5'
  purple: '#9f7aea',

  // pink-400: '#f687b3'
  // pink-500: '#ed64a6'
  // pink-600: '#d53f8c'
  pink: '#ed64a6',
};

module.exports = {
  theme: {
    extend: {
      colors,
    },
  },
  variants: {},
  plugins: [],
}
