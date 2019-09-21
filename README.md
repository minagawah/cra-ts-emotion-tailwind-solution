# cra-ts-emotion-tailwind-solution

2 solution for React + TypeScript + emotion + tailwindcss.

[1. About](#about)  
[2. What I Did](#what)  
&nbsp; [2-1. Common Setups](#what-common)  
&nbsp; [2-2. Using `babel`](#what-babel)  
&nbsp; [2-3. Using `PostCSS`](#what-postcss)  
[3. LICENSE](#license)  


<a id="about"></a>
## 1. About

There must be quite a number of people
who have CRA (with TypeScript support)  
struggling for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work in their apps.  
I did (for several freaking days).  
And, I don't want others to suffer as I did.  
This is a sample app to provide
some of my solutions for the issue.

<a id="what"></a>
## 2. What I Did

There are basically 2 ways for
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
to work:

1. Using babel plugins
2. Using PostCSS presets

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
(1) [to use babel plugins](#what-babel),
or (2)
[to use PostCSS presets](#what-postcss),
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
By the way, ESLint, because TSLint will soon be deprecated.
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

For `tailwind.macro`, we need to specifically
install `tailwind.macro@next` otherwise
you will see the following runtime error:

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
[using babel plugins](#what-babel)
or
[using PostCSS presets](#what-postcss),
now you should be able to write
[tailwindcss](https://tailwindcss.com/)
styles in
[emotion](https://emotion.sh/docs/introduction)
notations:

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


Also, make sure to import `tailwind` modules in your CSS file
so that you can use them:

#### # `./src/App.css`

```diff
diff --git a/src/App.css b/src/App.css
index afc3885..36277ba 100644
--- a/src/App.css
+++ b/src/App.css
@@ -1,3 +1,7 @@
+@tailwind base;
+@tailwind components;
+@tailwind utilities;
+
 .App {
   text-align: center;
 }
@@ -9,12 +13,9 @@
 .App-header {
   background-color: #282c34;
   min-height: 100vh;
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
   font-size: calc(10px + 2vmin);
   color: white;
+  @apply flex flex-col flex-no-wrap justify-center content-center items-center;
 }
```

As a whole, your installations would look like this:

```shell
yarn add --dev typescript @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-react customize-cra react-app-rewired emotion @emotion/core @emotion/styled @emotion/babel-preset-css-prop tailwindcss tailwind.macro@next
```

***Up to this point were the common setups required for both approaches.***  
From now on, I will explain steps for each.


<a id="what-babel"></a>
### 2-2. Using `babel`

One way to have
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
working, is to use `babel plugins`:  
(although, it is much easier with *["2-3 Using PostCSS"](#what-postcss)* approach)

- babel-plugin-tailwind-components
- babel-plugin-macros

Once you install them,
you create `babel-plugin-macros.config.js`
directly under the root:

#### # `./babel-plugin-macros.config.js`

```js
module.exports = {
  tailwind: {
    config: './src/tailwind.config.js',
    styled: 'styled-components/macro',
  },
}
```

Then, needs some work in your `config-overrides.js`.  
For `babel` to lookup `babel-plugin-macros.config.js` you created,
you use *addBabelPlugin*:

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

Great. You are all set to go!


<a id="what-postcss"></a>
### 2-3. Using `PostCSS`

Another way (which is much simpler than the last)
is to use `PostCSS presets`.  
You don't need to install extra packages.
Just, you need to configure `config-overrides.js`.  
This time, you use *addPostcssPlugins*:

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
Way simpler than the last one!  
That's why I choose this approach for this sample project.


<a href="license"></a>
## 3. License

Provided under [WTFPL](./LICENSE).  
However, some NPM dependencies have license restrictions.
