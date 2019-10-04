import React from 'react';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import logo from './logo.svg';
import './App.css';

const Button = styled.button`
  ${tw`mt-4 p-2 text-white bg-red-600`}
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const App: React.FC = () => {
  return (
    <div css={css`text-align: center;`}>
      <header css={css`
background-color: #282c34;
min-height: 100vh;
font-size: calc(10px + 2vmin);
color: white;
${tw`flex flex-col flex-no-wrap justify-center content-center items-center`}
      `}>
            <img
              css={css`
animation: ${spin} infinite 20s linear;
height: 40vmin;
pointer-events: none;
              `}
              src={logo}
              alt="logo"
            />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          css={css`color: #09d3ac;`}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <Button>Click</Button>
        </div>
      </header>
    </div>
  );
}
