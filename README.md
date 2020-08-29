# cra-ts-emotion-tailwind-solution

Solutions for React + TypeScript + emotion + tailwindcss.

**(2020.8.29)  
This is old. If you are intending to implement *Emotion* + *TailwindCSS* in your React app,
consider using `twin.macro` which is way easier
than instructions illustrated in this repository.
Refer to *[another repository of mine](https://github.com/minagawah/map-supercluster-example)*
which contains detailed instructions.**

[1. About](#about)  
[2. What I Did](#what)  
&nbsp; [2-1. Common Setups](#what-common)  
&nbsp; [2-2. Using PostCSS](#what-postcss)  
&nbsp; [2-3. Using Babel Macros](#what-macro)  
[3. LICENSE](#license)  


<a id="about"></a>
## 1. About

I struggled for a while
for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work on my CRA app with TypeScript support,
and I do not want others to suffer as I did....
This is a sample app to illustrate my solutions.

Also, I finally figure out
how to test with Jest + Enzyme
in CRA TypeScript app (using `ts-jest`).
Hope it helps.  
Or, if you are NOT using TypeScript,
and struggling with `babel-jest`,
one of my project
**[food](https://github.com/minagawah/food)**
may help.  
Or, if you are NOT EVEN using CRA, see if
**[mini-react-201910](https://github.com/minagawah/mini-react-201910)**
helps.


<a id="what"></a>
## 2. What I Did

There are basically two approaches for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work:

1. Using PostCSS plugin
2. Using Babel Macros

**Both work fine,
except if you are running Jest (+ Enzyme) tests,
then you need the latter.**

I am assuming the readers have a CRA app,
and not wanting your app to eject the configurations,
and you must be using
[customize-cra](https://github.com/arackaf/customize-cra)
(which is the extension of
[react-app-rewired](https://github.com/timarney/react-app-rewired))
to rewire your configurations.


<a id="what-common"></a>
### 2-1. Common Setups

For both approaches, there are common setups required.  
In either case, you definitely need to create an app first:

```shell
cd cra-ts-emotion-tailwind-solution
yarn create react-app . --typescript
```

As we are using TypeScript, we need standard `@types`.  
Installations for standard types:

- typescript
- @types/node
- @types/react
- @types/react-dom

**(I will provide later the whole list of packages
you are installing, so no worries for now)**

Next, installations for ESLint.
You don't need them if you are not linting,
but if you are, there is just one part
you need to configure, especially
when you are using `tw` syntax
which is a macro syntax for applying
[tailwind](https://tailwindcss.com/)
styles within
[emotion](https://emotion.sh/docs/introduction)
notations, and the followings
just illustrate how to configure ESLint for that syntax.  
Btw, we are using ESLint because
[tslint is deprecated](https://medium.com/palantir/tslint-in-2019-1a144c2317a9).

Installations for ESLint:

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-config-react

Once installed, you need ESLint
to recognize `tw` as one of the globals,
and you need to set it in your `.eslintrc.js`
(or `.eslintrc` for some of you).

#### # `./eslintrc.js`

```js
module.exports = {
  "globals": {
    "tw": true
  }
}
```

Next up, our main dish!  
Install the followings:

- customize-cra
- react-app-rewired
- emotion
- @emotion/core
- @emotion/styled
- @emotion/babel-preset-css-prop
- tailwindcss@next

(In case you're wondering
why not installing `autoprefixer`, nor `normalized.css`,
[the former is included in CRA](https://create-react-app.dev/docs/post-processing-css),
and [the latter in tailwind](https://tailwindcss.com/docs/preflight/#app))

Now, TypeScript does not know what `tailwind.macro` means,
so you need to define it:

#### # `./src/types.d.ts`

```js
declare module 'tailwind.macro' {
  import tw from 'tailwind.macro';
  export default tw;
}
```

Since your are using
[customize-cra](https://github.com/arackaf/customize-cra)
(or
[react-app-rewired](https://github.com/timarney/react-app-rewired)),
you need to create `config-overrides.js`
(will discuss the contents later):

```shell
touch ./config-overrides.js
```

And, of course, you need to change your `package.json` accordingly:

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

While the next one is optional,
but if you want to customize themes for
[tailwindcss](https://tailwindcss.com/),
you need `tailwind.config.js`.  
But, make sure to place it within `src` directory
for CRA does not want any pre-bundled resources
placed directly under the root:

```shell
npx tailwind init ./src/tailwind.config.js
```

That's it for common setups.  
Go on choosing either
["2-2. Using PostCSS"](#what-postcss)
or
["2-3. Using Babel Macros"](#what-macro),
and
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
should work.

Just for a demonstration purpose,
I removed CSS files for `App.tsx`,
and replaced them with embedded styles
using
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/):

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

You also need to initialize `tailwind` modules in your external CSS file
so that other external CSS files can utilize `tailwind` resources:

#### # `./src/App.css`

```diff
+@tailwind base;
+@tailwind components;
+@tailwind utilities;
```

A list of packages to install so far:

```shell
yarn add --dev typescript @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-react customize-cra react-app-rewired emotion @emotion/core @emotion/styled @emotion/babel-preset-css-prop tailwindcss tailwind.macro@next
```

**UP TO THIS POINT ARE THE COMMON SETUPS FOR BOTH APPROACHES.  
FROM NOW ON, I WILL EXPLAIN EACH APPROACH.**


<a id="what-postcss"></a>
### 2-2. Using PostCSS

One way to have
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
working, is to use `PostCSS plugin`.  
**Although this is much easier,
if you are planning to run Jest testings,
it just does not work...**  
**For Jest to work, you need
["2-3 Using Babel macros"](#what-macro).**

Here's the first approach using PostCSS.  
All you need is `config-overrides.js`
to use "addPostcssPlugins":

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

That's all!  
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
should now work in your app!

*Now, just like I told you,
if you are planning to run tests,
you need another approach.*



<a id="what-macro"></a>
### 2-3. Using Babel Macros

Another way is to use
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros)
and this is the only way for Jest + Enzyme tests to work.

First, you are installing:

- babel-plugin-macros
- tailwind.macro@next

```shell
yarn add --dev babel-plugin-macros tailwind.macro@next
```

Where `tailwind.macro` is just an alias of `babel-plugin-tailwind-components`.

**Make sure to install `next`
since you installed `tailwindcss@next` earlier
otherwise it won't work.**

Then, create `babel-plugin-macros.config.js`:

#### # `./babel-plugin-macros.config.js`

```js
module.exports = {
  tailwind: {
    config: './src/tailwind.config.js',
    styled: '@emotion/styled',
  },
}
```

If you are using
[styled-components](https://github.com/styled-components/styled-components)
instead of
[emotion](https://emotion.sh/docs/introduction),
then you need `styled: 'styled-components/macro'` for the above.  
Also, the way you use it differs for
[styled-components](https://github.com/styled-components/styled-components),
and it should be `Button = styled('button')` rather than `Button = styled.button`.

Lastly, here's the contents for `config-overrides.js`:

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

OK. That's all for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work.  
However, if you are running Jest (+ Enzyme) tests,
a bit more work is required:

- ts-jest
- enzyme
- enzyme-adapter-react-16
- react-test-renderer
- enzyme-to-json
- jest-emotion
- @types/enzyme
- @types/enzyme-adapter-react-16

```shell
yarn add --dev ts-jest enzyme enzyme-adapter-react-16 react-test-renderer enzyme-to-json jest-emotion @types/enzyme @types/enzyme-adapter-react-16
```

Then, create `jest.config.js` under the root.  
Alternatively, you may have the same configurations
in your `config-overrides.js`,
but it could easily become messy,
so I am using `jest.config.js`.

**Notice `jest.config.js` only works
if you are testing with Enzyme's `shallow`.
If you want to test with actual React components,
then you need to override the configurations
in your `config-overrides.js`.**

#### # `./jest.config.js`

```js
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": [
    "**/__tests__/**/*.tsx?",
    "**/?(*.)+(test).tsx?"
  ],
  "moduleFileExtensions": [
    "ts", "tsx", "js", "jsx", "json", "node"
  ],
}
```

You also need `src/setupTests.ts`.
For CRA, it will automatically lookup the file.  
If your app is non-CRA,
then for the above configurations,
you need to add `"setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"]`.


#### # `./src/setupTests.js`

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer(emotion));
```

That's all!  
Have fun testing!

```shell
yarn test
```


<a id="license"></a>
## 3. License

Provided under [WTFPL](./LICENSE).  
However, some NPM dependencies have license restrictions.
