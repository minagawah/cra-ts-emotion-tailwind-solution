import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import logo from './logo.svg';
import './App.css';

const Button = styled.button`
  ${tw`mt-4 p-2 text-black bg-white`}
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>Click</Button>
      </header>
    </div>
  );
}

export default App;
