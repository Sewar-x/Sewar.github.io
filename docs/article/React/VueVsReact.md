---
star: true
order: 4
category:
  - React
tag:
  - Vue Vs React
---
# Vue Vs React

## 总览



![](../images/Vue-vs-React.png)



|                                    | Vue                                                          | React                                                        |
| :--------------------------------: | :----------------------------------------------------------- | :----------------------------------------------------------- |
|              **组件**              | **单文件组件**：使用template、script和style来分别定义组件的结构、逻辑和样式。 | 在React中，组件可以通过**函数式组件或类组件**来定义。        |
|              **思想**              | **数据的响应式**：当数据发生变化时，Vue会自动更新相关的DOM   | React 的核心思想是每次对于变更 `props` 或 `state`，触发新旧 Virtual DOM 进行 diff（协调算法），对比出变化的地方，然后通过 `render` 重新渲染界面。 |
|      **状态或变量响应式渲染**      | Vue使用**响应式系统来实现状态或变量**的响应式渲染。<br />当数据发生变化时，Vue会自动更新DOM。<br />这是通过Vue的响应式原理实现的，即Vue在初始化时将数据转换为getter/setter形式的对象，当数据变化时，setter会触发组件的重新渲染。 | React通过**setState方法来更新组件的状态**，并触发组件的重新渲染。<br />React使用一种名为“调和”（Reconciliation）的过程来比较新旧虚拟DOM树，并计算出最小的DOM更新。<br />当组件的状态或属性发生变化时，React会重新渲染该组件及其子组件。 |
|             **数据流**             | 单向数据流                                                   | 单向数据流                                                   |
|    **组件通信**（父子组件通信）    | **通过*props*和*emit*进行**：父组件通过*props*向子组件传递数据或回调，子组件则通过emit触发事件来向父组件发送消息。 | **通过props和回调函数实现**：父组件通过props将数据或函数传递给子组件，子组件则可以通过这些props来接收数据和触发回调函数 |
| **Prop逐级透传问题**（跨组件通信） | Vue**通过`provide`和`inject`机制**解决Prop逐级透传问题。<br />父组件使用`provide`提供数据或方法，子组件通过`inject`接收。 | React没有内置的Prop逐级透传机制，通常通过高阶组件或**Context API来实现**。<br />高阶组件是一种函数，它接收一个组件并返回一个新组件，新组件可以访问传递的props。<br />Context API提供了一种在组件树中共享值的方式，无需显式地通过每一层组件。 |
|           **子组件渲染**           | **Vue插槽**是一种组件间内容分发机制，允许父组件将内容传递给子组件的指定位置。<br />通过`<slot>`标签定义插槽的位置，父组件使用`<template>`标签包裹内容，并通过具名插槽或作用域插槽将内容传递给子组件。 | **React通过 JSX children 属性**直接将组件标签内的内容作为prop传递给子组件。<br />组件标签内的内容会自动成为`children` prop，父组件可以将内容直接传递给子组件，并在子组件内部通过`props.children`或函数组件的props参数访问。 |
|            **模板引用**            | Vue2中：模板中的元素或组件上使用`ref`属性，在Vue实例的方法或生命周期钩子中通过`this.$refs`来访问。<br />Vue3中：模板中使用`ref`函数来创建引用，在 `setup` 函数中通过 `import { ref } from 'vue'; ` 创建 ref 模板同名 ref 变量引用模板。 | `useRef`钩子来创建引用，通用 JSX 使用 `ref = ref变量名 ` 进行引用 |
|             **传送门**             | [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)：引入了 `<Teleport>` 组件，将子组件渲染到 DOM 树中不同于其父组件位置的能力 | [Portals](https://react.docschina.org/reference/react-dom/createPortal#createportal)：通过`createPortal` 允许你将 JSX 作为 children 渲染至 DOM 的不同部分 |
|            **生命周期**            | Vue 2.x有`beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeDestroy`和`destroyed`等生命周期钩子。<br />Vue 3.x引入了Composition API，提供了`onMounted`、`onUpdated`、`onUnmounted`等函数式API来替代部分生命周期钩子。 | React有`constructor`、`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等生命周期方法。<br />在React 16.8及以后的版本中，引入了Hooks API（如`useEffect`、`useState`等），使得在没有类的情况下使用状态以及其他React特性成为可能。 |
|            **逻辑复用**            | Vue3中采用组合式 API 逻辑组织能力                            | React 中采用 React Hooks                                     |
|            **虚拟DOM**             | **带编译时信息的虚拟 DOM**                                   | **纯运行时虚拟 DOM**                                         |
|            **JSX 语法**            | 通过 `@vue/babel-plugin-jsx` 插件支持，语法与React JSX 不同，参考以下比较 | 默认支持                                                     |
|           **函数式组件**           |                                                              |                                                              |

## 语法差异

>  [Component Party](https://component-party.dev/#reactivity) 详细对比了不同前端框架语法差异

### 双向绑定

* Vue 中提供了 `v-model ` 语法糖支持 数据和视图的双向绑定;
* React 中不支持数据的双向绑定，需要手动实现：数据改变将数据传入 value 显示，手动改变触发 change 事件； 

**Vue2:**

```vue
<script>
export default {
  data() {
    return {
      text: "Hello World",
    };
  },
};
</script>

<template>
  <div>
    <p>{{ text }}</p>
    <input v-model="text">
  </div>
</template>

```

**Vue3:**

```vue
<script setup>
import { ref } from "vue";
const text = ref("Hello World");
</script>

<template>
  <p>{{ text }}</p>
  <input v-model="text">
</template>

```

**React:**

```react
import { useState } from "react";

export default function InputHello() {
  const [text, setText] = useState("Hello world");
  // 手动实现数据更改操作
  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <>
      <p>{text}</p>
      <input value={text} onChange={handleChange} />
    </>
  );
}

```





## 组合式 API 与 React Hooks

> 以下对比来自Vue3官方文档：[组合式 API 常见问答 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)

组合式 API 提供了和 React Hooks 相同级别的逻辑组织能力，但它们之间有着一些重要的区别。

React Hooks 在组件每次更新时都会重新调用。这就产生了一些即使是经验丰富的 React 开发者也会感到困惑的问题。这也带来了一些性能问题，并且相当影响开发体验。例如：

- **Hooks 有严格的调用顺序，并不可以写在条件分支中**。

  > 具体解释可以参考：[React | Sewen 博客 (sewar-x.github.io)](https://sewar-x.github.io/myblog/article/React/React基础.html#hooks)

- **React 组件中定义的变量会被一个钩子函数闭包捕获，若开发者传递了错误的依赖数组，它会变得“过期”**。这导致了 React 开发者非常依赖 ESLint 规则以确保传递了正确的依赖，然而，这些规则往往不够智能，保持正确的代价过高，在一些边缘情况时会遇到令人头疼的、不必要的报错信息。

  > 在Vue 3的组合式API和React Hooks中，闭包变量处理的差异主要体现在以下方面：
  >
  > **Vue 3 组合式API**
  >
  > 在Vue 3中，由于`setup()`或`<script setup>`只被调用一次，并且Vue的响应式系统运行时会自动收集依赖，因此开发者不需要担心闭包变量的问题。这意味着你可以在`setup()`函数中定义响应式状态和方法，然后在组件的其他部分（如模板或计算属性）中直接使用它们，而无需担心闭包或作用域的问题。
  >
  > **React Hooks**
  >
  > 在React中，由于Hooks在每次组件更新时都会重新调用，因此React组件中定义的变量会被钩子函数闭包捕获。这可能导致所谓的“过期闭包”问题，即闭包在创建时捕获的外部变量的值可能在后续组件更新时已经不再准确。为了解决这个问题，React开发者需要依赖ESLint规则来确保传递了正确的依赖数组。然而，这些规则往往不够智能，而且在一些边缘情况下可能会引发不必要的报错信息。
  >
  > **具体例子**
  >
  > 假设我们有一个计数器组件，它使用了一个状态变量`count`和一个更新该变量的函数`setCount`。
  >
  > **Vue 3 组合式API**
  >
  > ```javascript
  > <script setup>  
  > import { ref } from 'vue'  
  >   
  > const count = ref(0)  
  > const setCount = (newValue) => {  
  >   count.value = newValue  
  > }  
  > </script>  
  >   
  > <template>  
  >   <button @click="setCount(count + 1)">Count: {{ count }}</button>  
  > </template>
  > ```
  >
  > 在上面的Vue代码中，我们直接在`setup()`或`<script setup>`中定义了`count`和`setCount`，并在模板中直接使用了它们。由于`setup()`只被调用一次，并且Vue的响应式系统会自动处理依赖，因此这里不存在闭包变量的问题。
  >
  > **React Hooks**
  >
  > ```javascript
  > import React, { useState } from 'react';  
  >   
  > function Counter() {  
  >   const [count, setCount] = useState(0);  
  >   
  >   const handleClick = () => {  
  >     setCount(count + 1);  
  >   };  
  >   
  >   return (  
  >     <button onClick={handleClick}>Count: {count}</button>  
  >   );  
  > }
  > ```
  >
  > 在上面的React代码中，我们使用了`useState`Hook来定义`count`和`setCount`。然而，由于`handleClick`是一个闭包函数，它捕获了外部作用域中的`count`变量。如果我们在后续组件更新中修改了`count`的值，但`handleClick`中的闭包仍然保存着旧值，这就可能导致“过期闭包”问题，(React Hooks 在组件每次更新时都会重新调用)。为了避免这个问题，我们需要确保传递给`useState`的依赖数组是正确的。然而，这往往需要依赖ESLint规则，并且可能引发不必要的报错信息。

- **昂贵的计算需要使用 `useMemo`，这也需要传入正确的依赖数组**。

- **在默认情况下，传递给子组件的事件处理函数会导致子组件进行不必要的更新。**子组件默认更新，并需要显式的调用 `useCallback` 作优化。这个优化同样需要正确的依赖数组，并且几乎在任何时候都需要。忽视这一点会导致默认情况下对应用进行过度渲染，并可能在不知不觉中导致性能问题。

  > 在React中，当父组件重新渲染时，默认情况下，它传递给子组件的所有props（包括函数，如事件处理函数）都会创建一个新的引用。如果子组件的`props`发生变化（即使是引用变化而函数内容没有变化），并且该子组件的`shouldComponentUpdate`（类组件）或`React.memo`（函数组件）逻辑没有适当处理这种情况，那么子组件将会重新渲染，即使它的实际输出没有改变。
  >
  > `useCallback`是一个React Hook，它允许你“记住”一个函数，并在组件重新渲染时返回相同的引用，只要它的依赖项数组保持不变。这有助于减少不必要的渲染，特别是在与`React.memo`结合使用时，因为`React.memo`会进行浅比较来检查props是否发生变化。
  >
  > ### 示例
  >
  > 假设我们有一个`Counter`组件，它有一个`increment`函数，该函数被传递给一个`Button`子组件：
  >
  > ```jsx
  > import React, { useState, useCallback } from 'react';  
  >   
  > const Button = React.memo(({ onClick }) => {  
  >   console.log('Button rendered');  
  >   return <button onClick={onClick}>Increment</button>;  
  > });  
  >   
  > const Counter = () => {  
  >   const [count, setCount] = useState(0);  
  >   
  >   // 使用 useCallback 来“记住”increment函数  
  >   const increment = useCallback(() => {  
  >     setCount(count + 1);  
  >   }, [count]); // 注意：这里依赖项是错误的，因为increment函数不应该依赖于count  
  >   
  >   return (  
  >     <div>  
  >       <p>Count: {count}</p>  
  >       <Button onClick={increment} />  
  >     </div>  
  >   );  
  > };  
  >   
  > export default Counter;
  > ```
  >
  > 上面的示例中，`increment`函数被错误地标记为依赖于`count`，但实际上它不应该这样做。每次`count`状态改变时，都会创建一个新的`increment`函数引用，这会导致`Button`组件重新渲染，即使它的渲染输出没有变化。
  >
  > 正确的做法是确保`increment`函数不依赖于任何外部变量（除非它确实需要这些变量来执行其功能），所以依赖项数组应该是空的：
  >
  > ```jsx
  > const increment = useCallback(() => {  
  >   setCount(prevCount => prevCount + 1); // 使用函数式更新来避免依赖count  
  > }, []); // 依赖项数组为空，因为increment函数不依赖于任何外部变量
  > ```
  >
  > 这样，只有当父组件`Counter`重新渲染时，并且`increment`函数本身或其依赖项发生变化时，`Button`组件才会重新渲染。如果`increment`函数没有变化（即它的引用保持不变），那么`Button`组件将不会重新渲染，因为它接收到的props没有变化。这有助于提高性能并减少不必要的渲染。

- 要解决变量闭包导致的问题，再结合并发功能，使得很难推理出一段钩子代码是什么时候运行的，并且很不好处理需要在多次渲染间保持引用 (通过 `useRef`) 的可变状态。

相比起来，Vue 的组合式 API：

- 仅调用 `setup()` 或 `<script setup>` 的代码一次。这使得代码更符合日常 JavaScript 的直觉，不需要担心闭包变量的问题。组合式 API 也并不限制调用顺序，还可以有条件地进行调用。
- Vue 的响应性系统运行时会自动收集计算属性和侦听器的依赖，因此无需手动声明依赖。
- 无需手动缓存回调函数来避免不必要的组件更新。Vue 细粒度的响应性系统能够确保在绝大部分情况下组件仅执行必要的更新。对 Vue 开发者来说几乎不怎么需要对子组件更新进行手动优化。

**总结：**

| 特性/差异点  | Vue 3 组合式 API                               | React Hooks                                                  |
| :----------- | :--------------------------------------------- | ------------------------------------------------------------ |
| 调用频率     | `setup()` 或 `<script setup>` 只调用一次       | 每个组件更新时都会重新调用                                   |
| 调用顺序     | 不限制调用顺序，可以条件调用                   | 严格的调用顺序，不可在条件分支中调用                         |
| 依赖管理     | 运行时自动收集计算属性和侦听器的依赖           | 需要手动声明依赖数组                                         |
| 闭包变量     | 不需要担心闭包变量的问题                       | 变量会被钩子函数闭包捕获，可能“过期”                         |
| 回调函数缓存 | 无需手动缓存回调函数                           | 需要手动使用 `useCallback` 缓存回调以避免不必要的更新        |
| 昂贵的计算   | Vue 的响应性系统会自动处理                     | 需要手动使用 `useMemo` 缓存昂贵的计算                        |
| 依赖数组问题 | 不存在依赖数组问题                             | 依赖数组不正确可能导致性能问题和错误                         |
| ESLint 依赖  | 不需要依赖ESLint确保正确的依赖                 | 需要ESLint规则以确保传递了正确的依赖数组                     |
| 引用保持     | 可通过 `ref()` 保持引用                        | 也可通过 `useRef()` 保持引用，但React中引用主要用于DOM引用或可变状态 |
| 并发与推理   | 易于推理代码何时运行，`ref()` 用于保持可变状态 | 并发功能结合闭包变量使得代码运行时机难以推理                 |
| 更新优化     | Vue细粒度的响应性系统确保仅执行必要更新        | 开发者需要显式优化子组件更新                                 |
| 开发体验     | 符合日常JavaScript直觉，代码更易读和维护       | 可能因严格的调用顺序和依赖管理而影响开发体验                 |



## **模板引用**

Vue 2、Vue 3和React在模板引用方面都有各自的特点和用法。下面我将对这三个框架的模板引用进行比较，并给出相应的例子。

### Vue 2的模板引用

在Vue 2中，模板引用是通过在模板中的元素或组件上使用`ref`属性来实现的。然后，在Vue实例的方法或生命周期钩子中，你可以通过`this.$refs`来访问这些引用。

**例子**：

```vue
<template>  
  <div>  
    <input ref="myInput" />  
    <button @click="focusInput">Focus Input</button>  
  </div>  
</template>  
  
<script>  
export default {  
  methods: {  
    focusInput() {  
      this.$refs.myInput.focus();  
    }  
  }  
}  
</script>
```

在上面的例子中，我们给`<input>`元素添加了一个`ref="myInput"`。然后，在`focusInput`方法中，我们通过`this.$refs.myInput`访问到了这个元素，并调用了它的`focus`方法。

### Vue 3的模板引用

Vue 3引入了Composition API，它提供了一种更灵活的方式来组织和管理组件的逻辑。在Vue 3中，你可以使用`ref`函数来创建引用，并通过`setup`函数返回它们。

**例子**：

```vue
<template>  
  <div>  
    <input ref="myInput" />  
    <button @click="focusInput">Focus Input</button>  
  </div>  
</template>  
  
<script>  
import { ref } from 'vue';  
  
export default {  
  setup() {  
    const myInput = ref(null);  
  
    const focusInput = () => {  
      myInput.value.focus();  
    }  
  
    return {  
      myInput,  
      focusInput  
    }  
  }  
}  
</script>
```

在Vue 3中，我们使用`ref`函数创建了一个引用`myInput`，并在`setup`函数中返回了它。然后，在模板中，我们可以像Vue 2一样使用`ref="myInput"`来引用这个元素。在`focusInput`函数中，我们通过`myInput.value`访问到了这个元素。

### React的模板引用

React使用JSX来编写模板，并且没有直接的“ref”属性来引用模板中的元素。相反，React提供了一个`useRef`钩子来创建引用。

**例子**：

```jsx
import React, { useRef } from 'react';  
  
function MyComponent() {  
  const myInput = useRef(null);  
  
  const focusInput = () => {  
    myInput.current.focus();  
  }  
  
  return (  
    <div>  
      <input ref={myInput} />  
      <button onClick={focusInput}>Focus Input</button>  
    </div>  
  );  
}
```

在React中，我们使用`useRef`钩子创建了一个引用`myInput`，并将其作为`ref`属性传递给`<input>`元素。然后，在`focusInput`函数中，我们通过`myInput.current`访问到了这个元素。

**总结**

Vue 2和Vue 3的模板引用都使用`ref`属性，但Vue 3通过Composition API提供了更灵活的方式来管理引用。而React则使用`useRef`钩子来创建和管理引用。这三个框架的模板引用方式都允许你访问和操作模板中的元素，但具体语法和用法有所不同。选择哪个框架取决于项目的需求、团队的偏好以及个人的经验。



## **插槽/children 属性**

### **Vue 插槽**

### **React children 属性**

在 React 中，并没有与 Vue 插槽完全对应的概念。Vue 的插槽允许你定义组件的可替换部分，这样父组件可以在使用子组件时插入自己的内容。而在 React 中，组件的复用通常通过 props 和组合的方式来实现。

然而，React 社区中确实有一些模式和方法来模拟类似 Vue 插槽的功能。其中最常见的是使用 `children` prop 和渲染 props（render props）。

**使用 `children` prop**

在 React 中，每个组件都可以接收一个特殊的 prop 叫做 `children`。这个 prop 包含了组件标签之间的所有内容。你可以像操作其他 props 一样操作 `children`。

```jsx
const WrapperComponent = ({ children }) => (  
  <div style={{ display: 'inline-block', background: 'skyblue' }}>  
    {children}  
  </div>  
);  
  
const App = () => (  
  <WrapperComponent>  
    <ChildComponent name="Hello world!" />  
  </WrapperComponent>  
);
```

在这个例子中，`WrapperComponent` 接收 `children` prop 并将其渲染出来。`App` 组件在 `WrapperComponent` 标签内放置了 `ChildComponent`，这就像是 Vue 中的默认插槽。

**使用 Render Props**

Render props 是一种在 React 中实现更高级组件组合的技术。Render props 是一个函数 prop，该函数返回要渲染的 React 元素。

```jsx
const WrapperComponent = ({ render }) => (  
  <div style={{ display: 'inline-block', background: 'skyblue' }}>  
    {render()}  
  </div>  
);  
  
const App = () => (  
  <WrapperComponent render={() => <ChildComponent name="Hello world!" />} />  
);
```

在这个例子中，`WrapperComponent` 接受一个名为 `render` 的函数 prop，并在其内部调用它。`App` 组件在调用 `WrapperComponent` 时传递了一个函数，该函数返回 `ChildComponent` 元素。这允许 `WrapperComponent` 定义布局和样式，而 `App` 组件定义要渲染的具体内容。

**类似于 Vue 命名插槽的 React 实现**

虽然 React 没有内置的命名插槽概念，但你可以使用对象或特定的 props 来模拟类似的功能。例如，你可以定义一个接收多个渲染函数的 prop，每个函数对应一个“插槽”。

```jsx
const WrapperComponent = ({ header, content }) => (  
  <div style={{ display: 'inline-block', background: 'skyblue' }}>  
    {header()}  
    {content()}  
  </div>  
);  
  
const App = () => (  
  <WrapperComponent  
    header={() => <h1>Header</h1>}  
    content={() => <ChildComponent name="Hello world!" />}  
  />  
);
```

在这个例子中，`WrapperComponent` 接受 `header` 和 `content` 两个函数 props，分别用于渲染头部和内容。`App` 组件为这两个 props 提供了具体的实现。



## **虚拟DOM**

> 虚拟DOM基础：
>
> * React VDOM：[Virtual DOM | Sewen 博客 (sewar-x.github.io)](https://sewar-x.github.io/myblog/article/React/React组件渲染原理/虚拟DOM和DomDiff.html)
> * Vue2 VDOM: [Vue2.x 原理源码分析 | Sewen 博客 (sewar-x.github.io)](https://sewar-x.github.io/myblog/article/vue2/Vue2原理和源码分析.html#virtual-dom)



### **Vue 和 React 虚拟DOM区别**

* React 为**纯运行时虚拟 DOM**；
* Vue 采用**带编译时信息的虚拟 DOM**

React主要侧重于运行时的性能优化，而Vue则通过结合编译时和运行时的信息来进一步提高性能。

### React 纯运行时虚拟 DOM

React的虚拟DOM系统主要**侧重于运行时性能**。

React使用 JSX（JavaScript XML）语法来描述用户界面，这些JSX代码在运行时被转换为React元素（即虚拟DOM节点）。这些元素是轻量级的JavaScript对象，它们描述了UI的状态和结构。



**React 运行时创建虚拟DOM：**

1. 当React 组件的状态或属性发生变化时，React 会重新渲染组件，并生成一个新的虚拟DOM 树。
2. 然后，React 使用一种称为 “diffing” 或 “reconciliation” 的过程来比较新旧两个虚拟 DOM 树，找出它们之间的差异。这些差异随后被用来更新真实的 DOM，从而最小化对 DOM 的直接操作，提高性能。

由于 React 的虚拟 DOM 构建和 diffing 过程主要在运行时进行，因此被称为“纯运行时虚拟 DOM ”。



#### **运行时虚拟 DOM 缺点** 

运行时虚拟 DOM 在更新过程通过**牺牲效率来换取声明式的写法**和最终的正确性：

1. 更新算法无法预知新的虚拟 DOM 树会是怎样，因此它总是需要遍历整棵树、比较每个 vnode 上 props 的区别来确保正确性。
2. 另外，即使一棵树的某个部分从未改变，还是会在每次重渲染时创建新的 vnode，带来了大量不必要的内存压力。



### Vue 带编译时信息的虚拟 DOM

**Vue3 在虚拟 DOM 的使用结合了编译时和运行时的信息来优化性能**。

在 Vue 中，模板（template）是在组件中定义用户界面的方式。这些模板在组件被创建时会被Vue的编译器转换为渲染函数（render function）。这个渲染函数是一个JavaScript函数，它返回一个虚拟DOM树（在Vue中通常被称为VNode树）。

Vue 的编译器在编译模板时会对模板进行优化，例如通过静态标记（patchFlags）来识别不会动态改变的节点，以便在后续渲染中直接复用这些节点，减少不必要的diff计算。这些优化是在编译时完成的，因此它们可以利用更多的信息来生成更高效的代码。

此外，Vue3 还引入了对 Proxy 的使用，以改进其响应式系统。这使得 Vue 可以更精确地跟踪数据的变化，并只在必要时更新虚拟 DOM 树。

由于 Vue 在编译模板时就进行了优化，并使用了编译时和运行时相结合的策略来构建和更新虚拟 DOM 树，因此可以说 Vue 使用了“带编译时信息的虚拟 DOM ”。

#### 带编译时信息的虚拟DOM 优点

> 详细解释参考官方文档：[渲染机制 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom)

* 静态提升
* 更新类型标记
* 树结构打平
* 对 SSR 激活的影响





### Vue和React在VDOM实现和使用差异

1. **模板渲染方式和过程**：
   * Vue通常使用基于HTML的模板语法来定义组件，这些模板随后被编译成渲染函数，生成VDOM。
   * React则使用JSX（JavaScript XML）或纯JavaScript函数来定义组件和生成VDOM。
   * 这种差异使得Vue的模板更加接近传统的HTML，易于理解和使用，而React则提供了更大的灵活性和编程能力。
2. **数据流和状态管理**：
   * Vue采用响应式数据系统，当数据变化时，视图会自动更新。这种双向数据绑定使得Vue的状态管理相对直观。
   * 而React则推崇单向数据流，通过props和state来管理组件的状态，这有助于保持组件的独立性和可预测性。
3. **diff算法**：虽然Vue和React都使用diff算法来比较新旧VDOM并最小化DOM操作，但它们的实现细节有所不同。
   * Vue的diff算法针对同一节点进行优化，可以复用已有的DOM元素，从而提高性能。
   * 而React的diff算法则基于组件的类型进行更细致的比较和优化。



### **Vue DOM Diff 算法**

> 详细过程可以参考我的博客：[Vue2.x 原理源码分析 | Sewen 博客 (sewar-x.github.io)](https://sewar-x.github.io/myblog/vue/Vue2原理和源码分析/#diff-算法)

### **React DOM Diff 算法**

> 详细过程可以参考：[DOM DIFF 算法 - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/infrastructure/old/diffing-algorithm)

**参考资料**

[Virtual DOM - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/infrastructure/old/virtual-dom)





## JSX 语法

> 详细解释参考Vue 官网：[渲染函数 & JSX | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/extras/render-function.html#basic-usage)

**Vue 3 JSX 与 React JSX 特点比较：**

| 特点/差异点      | Vue 3 JSX                                                | React JSX                                           |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------- |
| **语法支持**     | 需要通过 `@vue/babel-plugin-jsx` 插件支持                | 默认支持                                            |
| 全局命名空间     | 从 Vue 3.4 开始，不再隐式注册全局 JSX 命名空间           | 隐式注册全局 JSX 命名空间                           |
| **类与样式绑定** | 使用数组或对象的形式书写，类似于模板语法                 | 类似于模板语法，但需要使用 `className` 代替 `class` |
| 事件监听器       | 以 `onXxx` 的形式书写                                    | 以 `onXxx` 的形式书写                               |
| **子元素传递**   | 使用插槽（slots）机制                                    | 使用 `children` 属性                                |
| **动态组件**     | 直接使用导入的组件                                       | 需要使用 `<>...</>` 语法                            |
| 函数组件         | 使用普通的函数作为组件                                   | 使用普通函数或箭头函数                              |
| **插槽传递**     | 传递一个插槽函数或者是一个包含插槽函数的对象             | 传递一个数组或者一个子元素                          |
| **作用域插槽**   | 需要给子组件传递一个插槽，并且子组件中的数据将向上传递   | 使用函数组件和 `useContext` 钩子                    |
| 内置组件         | 如 `KeepAlive`、`Transition` 等需要导入使用              | 通常不需要导入，直接使用                            |
| `v-model`        | 需要自己提供 `modelValue` 和 `onUpdate:modelValue` props | 作为内置指令使用                                    |
| **自定义指令**   | 使用 `withDirectives` 函数                               | 使用 `useImperativeHandle` 或 `forwardRef`          |
| 模板引用         | 使用 `ref()` 作为属性传递给 vnode                        | 使用 `ref` 属性                                     |
| **类型注解**     | 需要在 `tsconfig.json` 中配置 `"jsx": "preserve"`        | 默认支持                                            |
| 函数组件类型注解 | 可以使用 `FunctionalComponent` 类型                      | 使用 `React.FC` 或 `React.FunctionalComponent`      |



## Vue Template 和 React Jsx

`Template`和`JSX`都是用于构建用户界面的方式，但它们有各自的特点和性能差异:

### **编译过程**

- **Template**：Vue的`Template`语法是基于HTML的扩展，通过Vue的编译器将其转换为虚拟DOM（Virtual DOM）渲染函数。这个过程在开发模式下是动态的，而在生产模式下会被缓存，从而提高性能。但是，由于这个过程涉及到编译和解析，因此可能会有一定的性能开销。
- **JSX**：JSX本质上是 JavaScript的语法扩展，它允许你在JavaScript代码中直接编写类似HTML的结构。
  - JSX在编译时会被Babel等转译器转换为React.createElement()的调用，这些调用最终会生成虚拟DOM。
  - 由于JSX直接转换为JavaScript代码，因此它避免了Vue模板编译器的性能开销。
- **编译时：JSX 编译比 Template 快**
  -  Template 解析时有 `静态节点提升` ，降低编译速度，而 JSX 没有；
- **运行时：Template 性能比 JSX 好**
  -  因为 Template 在编译时 `静态节点提升`，使 Template 运行时更新效率更高；

### **可读性和可维护性**

- **Template**：Vue的`Template`语法更接近HTML，对于前端开发者来说更易于阅读和编写。此外，Vue的模板语法还提供了许多指令（如v-if、v-for等）和过滤器，使得模板更加灵活和强大。
- **JSX**：JSX的语法更接近JavaScript，因此它对于熟悉JavaScript的开发者来说可能更易于理解和维护。但是，JSX需要编写更多的JavaScript代码，并且可能需要引入额外的库（如React）来处理事件和属性等。

### **性能优化**

- **Template**：Vue的`Template`语法提供了许多内置的性能优化机制，如计算属性（computed properties）、侦听器（watchers）和虚拟DOM的diff算法等。这些机制可以帮助开发者更有效地管理组件的状态和渲染过程，从而提高应用的性能。
- **JSX**：在React中，开发者可以使用shouldComponentUpdate、React.memo等API来手动控制组件的重新渲染，以实现性能优化。此外，React的Fiber架构还提供了更加细粒度的调度和更新机制，可以帮助开发者更好地管理应用的性能。然而，这些优化通常需要开发者具备更深入的知识和经验。
- **性能优化策略**：
  - Vue提供了多种性能优化策略，如使用计算属性（computed properties）来缓存复杂的计算结果，避免不必要的重复计算；使用v-show代替v-if来减少DOM操作；将条件逻辑移入子组件等。
  - React也提供了一些性能优化策略，如使用React.memo进行组件的记忆化，使组件仅在props发生变化时进行渲染；使用React.lazy和Suspense进行代码分割，实现按需加载；避免在render方法中直接使用内联函数等。

### **生态系统**

- **Template**：Vue的生态系统主要围绕其模板语法和组件系统展开，提供了丰富的工具和库来支持开发和调试过程。此外，Vue还提供了Vuex等状态管理库以及Vue Router等路由库来帮助开发者构建更复杂的应用。
- **JSX**：JSX主要用于React生态系统，React本身提供了丰富的API和工具来支持组件的开发和组合。React的生态系统还包括了许多第三方库和框架，如Redux、MobX等状态管理库以及React Router等路由库。这些工具和库可以帮助开发者更加高效地构建React应用。

综上所述，Vue的`Template`和JSX在性能方面各有优劣。Vue的`Template`语法提供了更加直观和易于理解的HTML结构，并且内置了许多性能优化机制；而JSX则更加接近JavaScript的语法，对于熟悉JavaScript的开发者来说可能更易于理解和维护。在选择使用哪种方式时，需要根据项目的具体需求和开发者的技能水平进行权衡。







## 函数式组件

**Vue 3 函数式组件与 React 函数式组件特点比较:**

| 特点/差异点    | Vue 3 函数式组件                                   | React 函数式组件                                   |
| -------------- | -------------------------------------------------- | -------------------------------------------------- |
| 定义方式       | 使用普通函数定义                                   | 使用普通函数或箭头函数定义                         |
| 组件实例       | 没有 `this` 上下文                                 | 没有 `this` 上下文                                 |
| 状态与逻辑     | 通过 `props` 和 `context` 参数传递                 | 通过 `props` 参数传递                              |
| 生命周期       | 不支持生命周期钩子                                 | 不支持生命周期钩子                                 |
| **插槽**       | 使用 `slots` 函数                                  | 不使用插槽，使用 `children` 属性                   |
| **动态组件**   | 可以直接使用组件                                   | 需要使用 `<>...</>` 语法                           |
| 内置组件       | 如 `KeepAlive` 等需要导入使用                      | 内置组件如 `Fragment` 可以直接使用                 |
| `v-model`      | 不适用，使用 `modelValue` 和 `onUpdate:modelValue` | 使用 `value` 和 `onChange`                         |
| 自定义指令     | 不适用，使用 `directives`                          | 使用 `useImperativeHandle` 或 `forwardRef`         |
| 模板引用       | 使用 `ref` 函数                                    | 使用 `useRef` 或 `useImperativeHandle`             |
| 类型注解       | 使用 `FunctionalComponent` 类型注解                | 使用 `React.FC` 或 `React.FunctionalComponent`     |
| Props 类型注解 | 可以为 `props` 参数指定类型                        | 可以为 `props` 参数指定类型                        |
| Emits 类型注解 | 使用 `emits` 属性声明                              | 使用 `React.ComponentProps` 的 `onChange` 进行声明 |
| 性能           | 轻量级，没有额外的生命周期开销                     | 轻量级，没有额外的生命周期开销                     |
| 插槽传递       | 传递一个插槽函数或者是一个包含插槽函数的对象       | 传递一个数组或者一个子元素                         |
| 函数组件类型   | 具名函数式组件和匿名函数式组件                     | 具名函数组件和匿名函数组件                         |
| 作用域插槽     | 支持，使用 `slots` 传递                            | 支持，使用 `useContext` 或者组件的上下文 API       |

**注意事项:**

- Vue 3 和 React 都支持函数式组件，但它们在一些细节上有所不同，如插槽、动态组件的使用方式。
- Vue 3 的函数式组件不支持生命周期钩子，而 React 的函数式组件也不支持生命周期方法。
- Vue 3 的函数式组件可以使用 `slots` 和 `emits` 进行声明，而 React 使用不同的 API 来达到类似的效果。
- 在 TypeScript 支持方面，Vue 3 和 React 都提供了类型注解，但具体的实现方式和类型有所不同。



## 生态系统

|       维度       |                             Vue                              |                            React                             |
| :--------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   **基本原理**   | - 渐进式JavaScript框架<br>- 响应式原理：通过Object.defineProperty或Proxy实现数据的双向绑定<br>- MVVM设计模式，数据驱动视图 | - JavaScript库，用于构建用户界面<br>- 组件化视图渲染<br>- 虚拟DOM技术优化性能 |
|     **架构**     | - 声明式渲染<br>- 组件系统<br>- 响应式数据绑定<br>- 双向数据绑定 |    - 组件化架构<br>- 虚拟DOM<br>- 状态管理和事件处理机制     |
|     **路由**     | - 使用Vue Router<br>- 支持HTML5 History模式和Hash模式<br>- 动态路由、嵌套路由、命名路由等<br>- 导航守卫 | - 使用react-router-dom<br>- BrowserRouter和HashRouter<br>- 路由懒加载<br>- 编程式导航 |
|   **状态管理**   | - Vuex作为官方状态管理库<br>- 集中存储管理应用的所有组件的状态<br>- 组件之间通信变得简单 | - Redux或Context API<br>- Redux是官方推荐的状态管理库<br>- 适用于大型应用，状态管理复杂度高 |
|  **服务端渲染**  | - Nuxt.js等框架支持服务端渲染<br>- 可以在服务器端渲染Vue组件为HTML字符串，直接发送给客户端 | - Next.js等框架支持服务端渲染<br>- 类似Nuxt.js，React组件在服务端渲染后发送到客户端 |
| **跨端开发框架** | - NativeScript-Vue<br>- Quasar Framework<br>- Weex、Uni-app（间接支持） |  - React Native<br>- NativeScript（通过社区插件）<br>- Expo  |
|   **生态系统**   | - 官方插件和库较少但质量高<br>- 丰富的第三方库和插件，如Vue Router、Vuex、Element UI等<br>- 社区活跃，文档和工具完善 | - 庞大的开发者社区<br>- 丰富的第三方库和插件，如React Router、Redux、Material UI等<br>- 生态系统灵活，支持多种开发方式 |
|   **学习曲线**   | - 易于上手，特别是对于前端新手<br>- 基于模板的语法，类似HTML和CSS |    - 学习曲线较Vue稍高<br>- 需要掌握JSX和React组件的概念     |
|   **性能优化**   | - 虚拟DOM算法优化<br>- 异步组件和路由懒加载<br>- 性能优化插件和工具 | - 虚拟DOM算法优化<br>- 异步组件和路由懒加载<br>- Redux中间件等性能优化方案 |







## **参考资料**

[React Guidebook - 📚 React 知识图谱 关于概念、技巧、生态、前沿、源码核心 - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/)

[React技术揭秘 (iamkasong.com)](https://react.iamkasong.com/#导学视频)

[React 官方中文文档 (docschina.org)](

**参考资料**

[谈谈Vue和React的区别？](https://blog.csdn.net/xgangzai/article/details/115301290)

