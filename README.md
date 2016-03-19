# Luminate
#### A lightweight and minimal Javascript UI component system.

A system for creating and managing interactive components for websites. While not exactly being an MV* framework, it takes inspiration from frameworks such as [Vue.js](http://vuejs.org/).

## Why does this exist?

For the most part, interactive components on websites are usually simple things modal windows or drop down menus, but they are not necessarily simple to implement. You generally have three choices when it comes to building sites with interactive micro-components:

1. **Use a web framework such as [Bootstrap](http://getbootstrap.com/).** These are great as they come packaged with everything you need. The downside is that usually their CSS and Javascript are tightly coupled, and it's not very easy to say, implement only the accordion component Javascript and use your own CSS rules and class names. This isn't a problem if you're using the whole framework, but when you're using pure CSS frameworks like [Starlight](https://github.com/benjamminf/starlight) or [Pure](http://purecss.io/), it'd be nice to be able to magically drop in Bootstrap's Javascript and have it just work.
2. **Use an MV\* framework such as [Vue.js](http://vuejs.org/).** These are also great as they give you a huge amount of flexibility. The downside is usually they're either overkill in terms of performance or file size for a simple website, or they don't play nicely with other frameworks or jQuery plugins.
3. **Implement the Javascript yourself.** This gets around the downsides of the above two options, but it's not a scalable or maintainable solution, so when you're in the business of building a couple of sites a week it's not a good idea.

This is where Luminate comes in. It's a component *system* that is intended to be used alongside any old existing Javascript or CSS framework or plugin, but feel like an MV* framework. This description may be a little abstract, so...

## Show me something.

### Toggle display of an element with fade in/out
```html
<button toggler-action:target="toggle">Toggle</button>
<div class="box" ref="target" toggler="is:open transition">Hello world</div>
```
```css
.box { transition: opacity 0.5s; }
.box.is-closing { opacity: 0; }
.box.is-closed { display: none; }
```

### Register a new module
```html
<div class="box" hello="phrase:hello">
  <button hello-action="say">Say hello</button>
</div>
```
```javascript
import Lum from 'lum'
import Base from 'modules/base'
import Action from 'modules/action'

const Hello = Base.extend({
  directive: 'hello',
  modules: {
    actions: Action
  },
  defaults: {
    phrase: 'hi'
  },
  methods: {
    say() {
      alert(this.$settings.phrase)
    }
  }
})

Lum.register(Hello)
```

## But why is this better than just using [React](https://facebook.github.io/react/)?

Well, it's not really _better_, but it does come with some benefits. Most MV* frameworks introduce some sort of complicated system for keeping the data and DOM in sync. React, for example, uses something called the virtual DOM, where they keep a copy of the entire DOM in memory and perform all changes on that, then use that to track changes and update the real DOM. This problem here is that if I wanted to load some jQuery plugin like [slick](http://kenwheeler.github.io/slick/) on top of a React application, weird behaviour would happen as there'd be no copy of it in the virtual DOM. To fix this, you'd have to create a React component that would act as a wrapper for slick, but you still couldn't be sure how slick will behave and whether it'd break something important and cause a nuclear meltdown.

Luminate doesn't include any rendering system of any sort, as there is no "two-way data binding". This means it's essentially fully compatible with any old jQuery plugin you throw on top.

Also, there's really not much to know about Luminate, so you'll be up and running quickly, and if you decide it's not for you, then you wouldn't have wasted much time.
