# cra-ts-emotion-tailwind-solution

Solution for React + TypeScript + emotion + tailwindcss.

[1. About](#about)  
[2. What I Did](#what)  
&nbsp; [2-1. Common Setups](#what-common)  
&nbsp; [2-2. Using `babel`](#what-babel)  
&nbsp; [2-3. Using `PostCSS`](#what-postcss)  
[3. LICENSE](#license)  


<a id="about"></a>
## 1. About

There must be quite a number of people
struggling to get
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work in CRA + TypeScript projects.  
This is a sample project to illustrate
my solution to the issue.

<a id="what"></a>
## 2. What I Did

There are basically 2 ways for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work in your CRA project.

1. Using babel plugins
2. Using PostCSS presets

In terms of the project structures,
they don't differ much,
and I will explain them
as I describe how I actually setup this project.

For both scenario, you need
[customize-cra](https://github.com/arackaf/customize-cra),
since I assume that you do not wish to eject your project,
but rewire your CRA project.

<a id="what-common"></a>
### 2-1. Common Setups

Whether you are using
[babel plugins](#what-babel)
or
[PostCSS presets](#what-postcss),
there are certain things need to be done beforehand.

In any case, you need to create your React app:

```shell
cd cra-ts-emotion-tailwind-solution
yarn create react-app . --typescript
```

And, you need regular `@types` for your app:

- typescript
- @types/node
- @types/react
- @types/react-dom

When using `tw` which is a macro syntax for writing
tailwind styles via emotion,
ESLint has no idea what it means.  
**I am installing ESLint related packages just to show you the workaround for this.**  
(ESLint because TSLint will be soon deprecated)

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-config-react

As for the workaround (for ESLint dosn't know `tw`),
what you need is the "globals" attribute
in your `.eslintrc.js` (or `.eslintrc`) file.

#### # `./eslintrc.js`

```js
module.exports = {
  "globals": {
    "tw": true
  }
}
```

And, now, here are the packages for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/):

- customize-cra
- react-app-rewired
- emotion
- @emotion/core
- @emotion/styled
- @emotion/babel-preset-css-prop
- tailwindcss
- tailwind.macro@next

For `tailwind.macro`, we are installing `next`,
otherwise you get a runtime error as you import:

```
Uncaught TypeError: Cannot read property 'default' of undefined
```

Just like ESlint does not understand what `tw` means,
so TypeScript does not understand `tailwind.macro` module.  
So, we are defining it.

#### # `./src/types.d.ts`

```js
declare module 'tailwind.macro' {
  import tw from 'tailwind.macro';
  export default tw;
}
```


If you want to customize your theme for
[tailwindcss](https://tailwindcss.com/),
you should create your config file within `src` directory.  
Otherwise, CRA does not like any pre-bundle sources
directly under the root directory, and warns you.

```shell
npx tailwind init ./src/tailwind.config.js
```

Also, since we are using
[customize-cra](https://github.com/arackaf/customize-cra)
(which depends on
[react-app-rewired](https://github.com/timarney/react-app-rewired)),
we need `config-overrides.js`:

```shell
touch ./config-overrides.js
```

Whether you're using `babel` or `PostCSS`,
once you have right configurations,
you can use write anything for
[tailwindcss](https://tailwindcss.com/)
via
[emotion](https://emotion.sh/docs/introduction):

```js
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const Button = styled.button`
  ${tw`mt-4 p-2 text-black bg-white`}
`;

export const App: React.FC = () => {
  return (
    <div className="App">
      <Button>Click</Button>
    </div>
  );
}
```

NPM packages to be installed, as a whole, would look like this:

```shell
yarn add --dev typescript @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-react customize-cra react-app-rewired emotion @emotion/core @emotion/styled @emotion/babel-preset-css-prop tailwindcss tailwind.macro@next
```

**Up to this point were the basic setups needed for both babel and PostCSS approaches.  
Now, I will discuss for further implementations.**


<a id="what-babel"></a>
### 2-2. Using `babel`

One way to have
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
working, is to use ***babel plugins.***  
Here are the plugins:

- babel-plugin-tailwind-components
- babel-plugin-macros

Once you install the plugins,
you need to create `babel-plugin-macros.config.js`
directly under the root directory

#### # `./babel-plugin-macros.config.js`

```js
module.exports = {
  tailwind: {
    config: './src/tailwind.config.js',
    styled: 'styled-components/macro',
  },
}
```

#### # `./config-overrides.js`

Then, in your `config-overrides.js`,
you need "addBabelPlugin" for the `macros` you just defined above.

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

Then, you are all set to go.


<a id="what-postcss"></a>
### 2-3. Using `PostCSS`

Another way is to use ***PostCSS presets.***  
This is much simpler approach,
and you don't need to install any babel plugins.  
Just, you need to rewrite `config-overrides.js`
so that you are using PostCSS presets.  
This time, we are using "addPostcssPlugins".  
(specify your `tailwind.config.js` if you have your custom themes)

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
Much easier!  
(that's why this sample project chooses this way)


<a href="license"></a>
## 3. License

Provided under [WTFPL](./LICENSE).  
However, some NPM dependencies have license restrictions.
