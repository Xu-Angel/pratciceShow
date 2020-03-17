# -

浏览器提供了一个HTMLUnknownElement，HTMLElement对象，所有自定义元素都是该对象的实例。

```js
var tabs=document.createElement("tabs");
console.log(tabs instanceof HTMLUnknownElement);   //true
console.log(tabs instanceof HTMLElement);     //true
```
**Custom Elements 标准: 自定义元素的名字必须包含一个破折号（-） 
一旦名字之中使用了破折号，自定义元素就不是HTMLUnknownElement的实例了。**

```js
var tabs=document.createElement("my-tabs");
console.log(tabs instanceof HTMLUnknownElement);   //false
console.log(tabs instanceof HTMLElement);     //true
```

## shadowDom

Web Component 允许内部代码隐藏起来，这叫做 Shadow DOM，即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。

Shadow DOM会在自定义标签解析时，加载到普通的DOM上。内部可以通过Element.attachShadow()来获取shadow root。它有一个mode属性，值可以是open或者closed,表示能否在外部获取Shadow DOM对象，一般而言应当为closed，内部实现不应该对外可见。

- shadowRoot  在attchShadow中mode 为open 则可以获取到，closed则返回null

## templates

### template
### slot

## selector

## 生命周期

在自定义的element的构造函数中，可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用：

- connectedCallback：当 custom element首次被插入文档DOM时，被调用。
- disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
- adoptedCallback：当 custom element被移动到新的文档时，被调用。
- attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。

```js
customElements.define('other-custom-element',
  class MyOtherCustomElement extends HTMLElement  {
    constructor() {
      super();
      //......
    }
    connectedCallback() {
      console.log('Custom square element added to page.');
    }
    disconnectedCallback() {
      console.log('Custom square element removed from page.');
    }
    adoptedCallback() {
      console.log('Custom square element moved to new page.');
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log('Custom square element attributes changed.');
    }
  }
)
```

## 事件监听

在类里面监听各种事件

```js
this.$button = shadow.querySelector('button');
this.$button.addEventListener('click', () => {
  // do something
});
```