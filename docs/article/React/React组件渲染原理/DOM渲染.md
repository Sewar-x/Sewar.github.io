---
star: true

order: 3

category:

  - React

tag:

  - React组件渲染

---



# **DOM 渲染**

React DOM 的渲染采用 render 方法

## **虚拟 DOM 转成 真实 DOM 流程**

### 创建虚拟 DOM 

假设需要渲染如下真实 DOM：

```html
<ul id="list">
  <li class="item">Item1</li>
  <li class="item">Item2</li>
  <li class="item">Item3</li>
</ul>
```

例如上面的 DOM 结构就可以简单的表示：

```js
var el = require('./element');
var ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3']),
]);
```

将以上 DOM 结构使用 DOM 对象表示，只需要记录它的节点类型、属性，子节点：

```js
// element.js
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children);
};
```

### **渲染真实 DOM**

react 使用 `render` 方法将以上 `ul`  渲染成真正的 `<ul>` 标签：

```js
Element.prototype.render = function () {
  // 根据 tagName 构建
  var el = document.creatElement(this.tagName);
  var props = this.props;

  // 设置节点的 DOM 属性
  for (var propName in props) {
    var propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  var children = this.children || [];

  children.forEach(function (child) {
    // 如果子节点也是虚拟 DOM，则递归构建 DOM 节点
    var childEl = child instanceof Element ? child.render() : document.createTextNode(child); // 如果字符串,只构建文本节点
    el.appendChild(childEl);
  });

  return el;
};
```

`render()` 方法会根据 `tagName` 构建一个真正的 DOM 节点，然后设置这个节点的属性，递归地把自己的子节点也构建起来。

### **挂载 DOM**

最后，通过 `document.body.appendChild` 挂载 DOM 到指定 DOM：

```js
var ulRoot = ul.render();
document.body.appendChild(ulRoot);
```

`ulRoot` 是真正的 DOM 节点，把它塞入文档中，这样的 `<body>` 里面就有了真正的 `<ul>` 的 DOM 结构。

```html
<ul id="list">
  <li class="item">Item1</li>
  <li class="item">Item2</li>
  <li class="item">Item3</li>
</ul>
```



## `render`函数

React 的 `render` 方法是组件生命周期中的一个重要环节，它负责将组件的状态（state）和属性（props）转换成 HTML 元素或其它React元素，这些元素最终会被渲染到 DOM 上。

### **`render`函数形式**

`render`函数在`react`中有两种形式：

1. 在类组件中，指的是`render`方法：

```jsx
class Foo extends React.Component {
    render() {
        return <h1> Foo </h1>;
    }
}
```

2. 在函数组件中，指的是函数组件本身：

```js
function Foo() {
    return <h1> Foo </h1>;
}
```

### **render 过程**

`render`函数里面可以编写`JSX`，转化成`createElement`这种形式，用于生成虚拟`DOM`，最终转化成真实`DOM

在`render`中编写`jsx`:

```jsx
class Foo extends React.Component {
   return (
      <div className='cn'>
        <Header> hello </Header>
        <div> start </div>
        Right Reserve
      </div>
    )
}

```

`jsx`通过`babel`编译后就会转化成我们熟悉的`javascript`，如下：

```js
return (
  React.createElement(
    'div',
    {
      className : 'cn'
    },
    React.createElement(
      Header,
      null,
      'hello'
    ),
    React.createElement(
      'div',
      null,
      'start'
    ),
    'Right Reserve'
  )
)
```

> `createElement`方法用来元素，在`react`中，这个元素就是虚拟`DOM`树的节点，接收三个参数：
>
> - type：标签名
> - attributes：标签属性，若无则为 null
> - children：标签的子节点

获得以上 `React.createElement`  的函数后，则将 虚拟DOM 作为参数传入 `ReactDOM.render()` 方法，该方法执行以下流程，将虚拟 DOM 渲染成真实 DOM： 

1. **接收 React 元素**：
   - `ReactDOM.render()` 方法接收两个参数：一个 React 元素和一个 DOM 节点的选择器字符串或一个 DOM 元素的引用。
   - 这个 React 元素可以是一个组件实例、HTML 标签或其他 JSX 表达式。
2. **创建虚拟 DOM 树**：
   - React 首先调用传入的 React 元素的 `render` 方法（如果是类组件）或直接使用 JSX 表达式（如果是函数组件），生成一个虚拟 DOM 树。
   - 这个过程会递归进行，直到所有的子元素都被转换成虚拟 DOM 节点。
3. **生成真实 DOM 树的映射**：
   - React 使用 Diff 算法将虚拟 DOM 树与已经存在于真实 DOM 中的树进行比较（如果是更新操作的话）。
   - 如果是首次渲染，React 会创建一个新的真实 DOM 树。
4. **Diff 算法**：
   - Diff 算法会逐层比较虚拟 DOM 树中的节点和真实 DOM 树中的节点，找出两者之间的差异。
   - React 会尽量复用 DOM 节点，而不是销毁和重新创建节点，这大大提高了性能。
5. **更新 DOM**：
   - 根据 Diff 算法计算出的差异，React 会生成一个更新后的 DOM 树。
   - React 会调用 DOM API 来更新或操作真实 DOM，这可能包括添加、删除或修改 DOM 节点。
6. **挂载组件**：
   - 如果传入的 React 元素是一个组件，React 会创建该组件的实例，并将其挂载到指定的 DOM 节点上。
   - 组件的生命周期方法（如 `componentDidMount`）会在挂载完成后被调用。
7. **处理事件**：
   - React 会将 JSX 中的事件处理函数转换为合成事件，并将其绑定到对应的真实 DOM 节点上。
   - 当用户与界面交互时（如点击按钮），React 会触发相应的事件处理函数。
8. **异步更新**：
   - React 可能会将更新操作异步化，以提高性能。这意味着 `render()` 方法可能不会立即导致 DOM 更新。
   - React 使用一个任务队列（Scheduler）来管理更新任务，确保在合适的时机执行。
9. **完成渲染**：
   - 一旦所有的更新操作都完成，React 会将新的虚拟 DOM 树与真实 DOM 树同步。
   - 用户现在看到的是更新后的界面，反映了最新的状态和属性。

## `ReactDOM.render` 

### 调用栈

`ReactDOM.render`方法调用时，经历三个阶段：

1. **初始化阶段**：
   - 在这个阶段，整个初始化过程都是为接下来的渲染阶段做准备。
   - 这个阶段可能涉及设置必要的变量、数据结构以及进行必要的初始配置。
2. **渲染（Render）阶段**：（render 阶段既可以同步也可是异步过程）
   - 当 `ReactDOM.render` 被调用时，它首先会触发 `performSyncWorkOnRoot`，这标志着渲染阶段的开始。
   - 在渲染阶段，React 会开始构建或更新虚拟DOM树。这涉及到比较新旧虚拟DOM之间的差异，并确定需要进行的更改。
   - 在这个过程中，会穿插调用 `beginWork` 和 `completeWork`。这两个方法串联起来模拟了一个递归的过程，用于处理虚拟DOM树的每个节点。
     - `beginWork` 将创建新的 Fiber节点， `completeWork` 则负责将 Fiber 节点映射为 DOM 节点。
   - 当所有必要的工作完成后，`finishSyncRoot` 会被调用，标志着渲染阶段的结束。
3. **提交（Commit）阶段**：（commit 阶段为同步过程）
   - 在提交阶段，React 将之前计算好的虚拟DOM更改应用到实际的DOM上。
   - 这个过程是由 `commitRoot` 方法触发的，它负责将虚拟DOM的更改同步到实际的浏览器DOM中。
   - 提交阶段完成后，用户就可以在浏览器上看到更新后的UI了。

