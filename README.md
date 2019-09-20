# cra-ts-emotion-tailwind-solution

Solution for React + TypeScript + emotion + tailwindcss.

[1. About](#about)  
[2. What I Did](#what)  
&nbsp; [2-1. Basic Setups](#what-basics)  
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

<a id="what-basics"></a>
## 2-1. Basic Setups

In any case, you first need to create a React app (with TypeScript support):

```shell
cd cra-ts-emotion-tailwind-solution
yarn create react-app . --typescript
```


<a id="what-babel"></a>
## 2-2. Using `babel`

One way to have
[emotion](https://emotion.sh/docs/introduction)
and
[tailwindcss](https://tailwindcss.com/)
working, is to use `babel` plugins.  


<a id="what-postcss"></a>
## 2-3. Using `PostCSS`

Another way is to use PostCSS presets.  
This is much simpler approach,
and you don't need to install any babel plugins.  
Just, you need to rewrite `config-overrides.js`
so that you are using PostCSS presets.


<a href="license"></a>
## 3. License

Provided under [WTFPL](./LICENSE).  
However, some NPM dependencies have license restrictions.
