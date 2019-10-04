# cra-ts-emotion-tailwind-solution

Solutions for React + TypeScript + emotion + tailwindcss.

[1. About](#about)  
[2. What I Did](#what)  
&nbsp; [2-1. Common Setups](#what-common)  
&nbsp; [2-2. Using `PostCSS`](#what-postcss)  
&nbsp; [2-3. Using `babel-plugin-macros`](#what-macro)  
[3. LICENSE](#license)  

**Update (10/4/2019):  
Previously, wasn't able to run tests.  
Now it's fixed.**


<a id="about"></a>
## 1. About

There must be quite a number of people
who have CRA (with TypeScript support)  
struggling for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work in their apps.  
I did.  
For several days.  
And I didn't want others to suffer as I did.  
This is a sample app to provide
some of my solutions for the issue.


<a id="what"></a>
## 2. What I Did

There are basically 2 ways for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work:

1. Using PostCSS plugin
2. Using babel-plugin-macros

They don't differ much,
and I will explain how you setup for both.
Assuming that you do not wish to eject your app, you need
[customize-cra](https://github.com/arackaf/customize-cra)
(which is the extension of
[react-app-rewired](https://github.com/timarney/react-app-rewired))
to rewire your configurations.

<a id="what-common"></a>
### 2-1. Common Setups

Whether you choose
(1) [to use PostCSS plugin](#what-postcss),
or (2) [to use babel macro](#what-macro),
there are common setups required,
and I will illustrate steps to prepare the common settings.  
In any case, you definitely need to create your app first:

```shell
cd cra-ts-emotion-tailwind-solution
yarn create react-app . --typescript
```

As we are using TypeScript, we need standard `@types`.  
You are installing:

- typescript
- @types/node
- @types/react
- @types/react-dom

Next follows what you need for ESLint.
By the way, we're using ESLint because
[TSLint will soon be deprecated](https://medium.com/palantir/tslint-in-2019-1a144c2317a9).
I am installing them
***only because there is a part you need to configure if you use ESLint***,
and intending to use `tailwind.macro` in your app.
More specifically, you need it when you were to use `tw`,
which is a macro syntax for applying
[tailwind](https://tailwindcss.com/)
styles within
[emotion](https://emotion.sh/docs/introduction)
notations.  
Here are the ones to install (not required, just for the workaround on ESLint):

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-config-react

Like I said, there's this one part you need to configure,
and you do that to `.eslintrc.js` (or `.eslintrc` for some of you).
Basically, in order for ESLint to understand what `tw` means,
you need to add "globals" attribute.  
Here's how:

#### # `./eslintrc.js`

```js
module.exports = {
  "globals": {
    "tw": true
  }
}
```

Now, here's our main dish!  
In order for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work,
you need the followings:

- customize-cra
- react-app-rewired
- emotion
- @emotion/core
- @emotion/styled
- @emotion/babel-preset-css-prop
- tailwindcss
- tailwind.macro@next

*In case you're wondering,
you don't need `autoprefixer`, nor `normalized.css`,
for [the former is included in CRA](https://create-react-app.dev/docs/post-processing-css),
and [the latter in tailwind](https://tailwindcss.com/docs/preflight/#app).*

For `tailwind.macro`, we need to specifically install
[tailwind.macro@next](https://github.com/bradlc/babel-plugin-tailwind-components/releases/tag/v1.0.0-alpha.2)
otherwise you encounter the following runtime error:

```
Uncaught TypeError: Cannot read property 'default' of undefined
```

Just like ESlint does not understand what `tw` means,
so TypeScript does not understand what `tailwind.macro` is.  
So, we need to define it:

#### # `./src/types.d.ts`

```js
declare module 'tailwind.macro' {
  import tw from 'tailwind.macro';
  export default tw;
}
```

Also, needs `config-overrides.js` for we are to rewire the configurations:  
(I will explain of the contents later because it differs for each approach)

```shell
touch ./config-overrides.js
```

Of course, you need to modify "scripts" in your `package.json`:

#### # `./package.json`

```diff
diff --git a/package.json b/package.json
index c926937..b7a0de3 100644
--- a/package.json
+++ b/package.json
@@ -1,13 +1,14 @@
   "scripts": {
-    "start": "react-scripts start",
-    "build": "react-scripts build",
-    "test": "react-scripts test",
-    "eject": "react-scripts eject"
+    "lint:fix": "eslint './src/**/*.{ts,tsx}'",
+    "start": "BROWSER=none react-app-rewired start",
+    "build": "react-app-rewired build",
+    "test": "react-app-rewired test",
+    "eject": "react-app-rewired eject"
   },
```

Altough this is optional,
but if you want customizations on your themes for
[tailwindcss](https://tailwindcss.com/),
you need `tailwind.config.js`,
but it has to be placed within `src` directory
because CRA does not like pre-bundled resources
to be placed directly under the root:

```shell
npx tailwind init ./src/tailwind.config.js
```

OK. That's all for the common settings!
Whether you are
[using babel macro](#what-macro)
or
[using PostCSS plugin](#what-postcss),
now you should be able to write
[tailwindcss](https://tailwindcss.com/)
styles in
[emotion](https://emotion.sh/docs/introduction)
notations.  
For the demonstration purpose,
I moved all the styles from `src/App.css` to `src/App.tsx`:

```diff
diff --git a/src/App.tsx b/src/App.tsx
index 226ee63..a322dbd 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,23 +1,57 @@
 import React from 'react';
+import { css, keyframes } from '@emotion/core';
+import styled from '@emotion/styled';
+import tw from 'tailwind.macro';
+
 import logo from './logo.svg';
 import './App.css';
 
+const Button = styled.button`
+  ${tw`mt-4 p-2 text-white bg-red-600`}
+`;
+
+const spin = keyframes`
+  from {
+    transform: rotate(0deg);
+  }
+  to {
+    transform: rotate(360deg);
+  }
+`;
+
 const App: React.FC = () => {
   return (
-    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
+    <div css={css`text-align: center;`}>
+      <header css={css`
+background-color: #282c34;
+min-height: 100vh;
+font-size: calc(10px + 2vmin);
+color: white;
+${tw`flex flex-col flex-no-wrap justify-center content-center items-center`}
+      `}>
+            <img
+              css={css`
+animation: ${spin} infinite 20s linear;
+height: 40vmin;
+pointer-events: none;
+              `}
+              src={logo}
+              alt="logo"
+            />
         <p>
           Edit <code>src/App.tsx</code> and save to reload.
         </p>
         <a
-          className="App-link"
+          css={css`color: #09d3ac;`}
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn React
         </a>
+        <div>
+          <Button>Click</Button>
+        </div>
       </header>
     </div>
   );
```

Also, make sure to import `tailwind` modules in your CSS file
so that you can use them:

#### # `./src/App.css`

```diff
+@tailwind base;
+@tailwind components;
+@tailwind utilities;
```

As a whole, your installations would look like this:

```shell
yarn add --dev typescript @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-react customize-cra react-app-rewired emotion @emotion/core @emotion/styled @emotion/babel-preset-css-prop tailwindcss tailwind.macro@next
```

***Up to this point were the common setups required for both approaches.***  
From now on, I will explain steps for each.


<a id="what-postcss"></a>
### 2-2. Using `PostCSS`

One way to have
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
working, is to use `PostCSS plugin`.  
This is much easier.  
You don't need to install extra packages.  
Although, there's a downside to this:
***that you may NOT perform Jest (+ Enzyme) testing.***  
If you are planning to use Jest (+ Enzyme), then you must choose
[2-3 Using 'babel-plugin-macros'](#what-macro).

All you need is to configure `config-overrides.js`.  
You are using *addPostcssPlugins*:

#### # `./config-overrides.js`

```js
const {
  override,
  addBabelPreset,
  addPostcssPlugins,
} = require('customize-cra');

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addPostcssPlugins([
    require('tailwindcss')('./src/tailwind.config.js')
  ])
)
```

That's it!  


<a id="what-macro"></a>
### 2-3. Using `babel-plugin-macros`

Another ways is to use
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros).  
All you need are the followings:

- babel-plugin-macros
- babel-plugin-tailwind-components

Basically, the above two are sufficient if you are not Jest testing.  
If you are using Jest (+ enzyme), then install:

- ts-jest
- @babel/preset-env
- babel-plugin-transform-export-extensions
- jest-emotion
- enzyme
- enzyme-adapter-react-16
- react-test-renderer
- enzyme-to-json


```shell
yarn add --dev ts-jest babel-plugin-macros babel-plugin-tailwind-components @babel/preset-env babel-plugin-transform-export-extensions jest-emotion enzyme enzyme-adapter-react-16 react-test-renderer enzyme-to-json
```


Then, you create `babel-plugin-macros.config.js`
directly under the root:

#### # `./babel-plugin-macros.config.js`

```js
module.exports = {
  tailwind: {
    config: './src/tailwind.config.js',
    styled: '@emotion/styled',
  },
}
```

*Note: If you are NOT using
[emotion](https://emotion.sh/docs/introduction)
and instead using
[styled-components](https://github.com/styled-components/styled-components),
then write
`styled: 'styled-components/macro'` for the above.*

Secondly, you need some work in your `config-overrides.js`.  
For `babel` to lookup `babel-plugin-macros.config.js` you created,
you need *addBabelPlugin*:

#### # `./config-overrides.js`

```js
const {
  override,
  addBabelPreset,
  addBabelPlugin,
} = require('customize-cra');

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addBabelPlugin('macros')
)
```

Although this is good enough for 
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work in the app,
it is not enough for Jest (+ enzyme) to run:
*you need Jest configurations as well.*

```js
const {
  override,
  addBabelPreset,
  addBabelPlugin,
} = require('customize-cra');

module.exports = {
  jest: override((config) => ({
    transform: {
      "^.+\\.(js|ts)": "<rootDir>/node_modules/babel-jest"
    },
    transformIgnorePatterns: [
      "<rootDir>/node_modules/(?!anime)"
    ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts"
    },
    snapshotSerializers: [
      "enzyme-to-json/serializer",
      "jest-emotion"
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/index.tsx",
      "!src/setupTests.ts",
      "!src/components/**/index.{js,jsx,ts,tsx}",
      "!src/containers/**/index.{js,jsx,ts,tsx}"
    ],
    coverageThreshold: {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    },
  })),
  webpack: override(
    addBabelPreset('@emotion/babel-preset-css-prop'),
    addBabelPlugin('macros')
  ),
};
```

Moreover, for the part where you configured
to use `babel-plugin-macros` above,
you need the same thing for `babel.config.js`.  
So, create `babel.config.js`, and configure:

#### # `./babel.config.js`

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { modules: 'commonjs' }
    ],
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop'
  ],
  plugins: [
    'macros',
  ],
};
```

Alghouth this seems redundant, however,
unless you set the configurations precisely to `babel.config.js` (no `.babelrc`),
`jest-emotion` currently
***does NOT allow you to have [emotion](https://emotion.sh/docs/introduction) macros in your codes.***

Also, create `src/setupTests.ts`:

#### # `./src/setupTests.ts`

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer(emotion));
```

And, if you are importing external SVG assets to your JSX/TSX,
then you need to `__mocks__`:

#### # `./__mocks__/fileMocks.ts`

```js
module.exports = 'test-file-stub';
```

#### # `./__mocks__/sytleMocks.ts`

```js
module.exports = {};
```

That's it!  
Here's your test.  
(notice it is using "shadow" from `enzyme`)


#### # `./src/__tests__/App.ts`

```js
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../';

beforeEach(() => {
});

afterEach(() => {
});

it('renders without crashing', () => {
  shallow(<App />);
});
```

```shell
yarn test
```




<a href="license"></a>
## 3. License

Provided under [WTFPL](./LICENSE).  
However, some NPM dependencies have license restrictions.
