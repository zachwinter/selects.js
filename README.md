selects.js
==========

Cross-Browser `<select>` Styling

Replace default browser behavior for `<select>` elements with a modern, stylable animated dropdown interface.

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

```javascript
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

```html
<div data-form-element="select">
  <select>
    <option value="01">Option 01</option>
    <option value="02">Option 02</option>
    <option value="03">Option 03</option>
  </select>
</div>
```

Advanced Styling
----------------

You can add `<span>` tags around text for more intricate styling.

```html
<option data-span="Smith">Granny Smith Apples</option>

Above will result in:

<li><a href="#">Granny <span>Smith</span> Apples</a></li>
```

You can also add `<img>` tags to your `<option>` proxy elements.

```html
<option data-img="http://www.website.com/image.jpg">Granny Smith Apples</option>

Above will result in:

<li><a href="#"><img src="http://www.website.com/image.jpg" alt="" />Granny Smith Apples</a></li>
```

Changelog
---------

**v1.3**
* You no longer need to use a namespace for events (on/trigger change).
* You can now add `<span>` tags around text for more intricate styling.
* You can now add an `<img>` element to `<option>` proxy elements.
* Fixed issue with using custom proxy elements.

**v1.2**
* Support for disabled `<select>` elements.

**v1.1**
* Added data-attribute to `<select>` elements that contains the element's event namespacing. For convenience, the first character is always a period.

```javascript
var namespace = $('select').attr('data-namespace');

$('select').on('change' + namespace, function () {
	// Yay!
});
```






