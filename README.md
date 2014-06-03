selects.js
==========

Cross-Browser `<select>` Styling

Replace default browser behavior for `<select>` elements with a modern, stylable animated dropdown interface.

[Demo](http://zachwinter.com/selects.js/)

**Features:**

* Full keyboard controls
* Ability to replace default mobile &lt;select> behavior
* CSS3 animations (jQuery fallback)
* Customizable proxy markup
* Honeypot option for proper tab indexing

**Browser Support:**

* Internet Explorer 8 - 11
* Internet Explorer Mobile
* Chrome
* Firefox
* Safari
* Mobile Safari
* Windows Phone
* Android Browser

Setup
-----

Plugin accepts `<form>` elements, single or multiple. Plugin parameters (and defaults) are as follows:

```
overrideMobileBehavior : false, // "True" will replace mobile <select> behavior.
useCssTransitions      : true,  // "False" will use jQuery animation for dropdowns.
slideSpeed             : 300,   // Speed of dropdown animations.
dropdownHeight         : 150,   // Max-height of dropdowns (px).
proxy : {
 select   : $('[data-form-element="select"]'),
 dropdown : $('[data-form-element="select-dropdown"]'),
 button   : $('[data-form-element="select-button"]'),
 honeyPot : $('.hp')
}
```

`<select>` elements you wish to style must be wrapped in a proxy element. As demonstrated above, you can choose to use any proxy you'd like.  


```
<div data-form-element="select">
  <select>
    <option value="01">Option 01</option>
    <option value="02">Option 02</option>
    <option value="03">Option 03</option>
  </select>
</div>
```





