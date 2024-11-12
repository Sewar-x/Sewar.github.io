---
star: false
order: 1
category:
  - React
tag:
  - React
---
# React

> 官方文档：[React 官方中文文档 (docschina.org)](https://react.docschina.org/)

## **大纲**

![React](../images/React.png)

| 内容                                     | 库/框架                                                      |                                                              |
| :--------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [**基础**](https://react.docschina.org/) |                                                              |                                                              |
| **核心API： 22种 Hooks**                 |                                                              |                                                              |
| **数据状态管理**                         | **Redux**                                                    |                                                              |
| **路由**                                 | React-Router                                                 |                                                              |
| **UI框架**                               | Ant Design                                                   |                                                              |
| **企业级前端应用框架**                   | [**Umijs**](https://umijs.org/)                              | 采用约定式路由，并配备了一套完善的插件体系                   |
|                                          | [Hooks-Admin](https://baimingxuan.github.io/react-router6-doc/start/overview) | 基于 React18、React-Router v6、React-Hooks、Redux && Redux-Toolkit、TypeScript、Vite2、Ant-Design 开源的一套后台管理框架 |

---



## **基础概念**



|         概念          | 说明                                                         |
| :-------------------: | :----------------------------------------------------------- |
| **组件（Component）** | React的基本构建块，用于表示UI的某一部分。可以是**函数或类**，接受输入（props）并返回React元素树。 |
|        **JSX**        | JavaScript的语法扩展，用于描述UI的外观。看起来像HTML，但在编译时转换为React元素。 |
|       **Props**       | Properties的缩写，用于**父组件向子组件传递数据**。子组件通过`this.props`（类组件）或函数参数（函数组件）接收props。 |
|       **State**       | **组件的私有数据，只能由该组件自己修改**。通过`this.state`（类组件）或`useState` Hook（函数组件）管理。 |
|     **事件处理**      | React组件可以像DOM元素一样处理事件，如点击、输入等。事件处理函数通常作为props传递给组件。 |
|   **生命周期方法**    | 类组件中的特殊方法，用于**在组件的不同阶段执行代码**。如`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`。函数组件使用Hooks处理类似逻辑。 |
|       **Hooks**       | React 16.8引入的新特性，**允许在不编写class的情况下使用state以及其他的React特性**。如`useState`、`useEffect`和`useContext`等。 |
|      **Context**      | **允许无需显式地通过每一层组件传递props，就能将值深入组件树**。通过`React.createContext`创建，并通过`<Context.Provider>`和`useContext` Hook使用。 |
|       **Refs**        | 提供了一种方式，**用于访问DOM节点或在render方法中创建的React元素**。常用于管理焦点、文本选择或媒体播放。 |
|      **虚拟DOM**      | React的一个核心概念，**React使用虚拟DOM来比较和更新实际的DOM**。这提高了性能，因为React只更新需要变化的部分。 |
| **渲染（Rendering）** | React将组件转换为DOM标记的过程，这个过程包括创建虚拟DOM树并比较它与之前的版本，然后更新实际的DOM。 |
|  **Reconciliation**   | React的“reconciliation”算法是React用于确定哪些组件需要更新，哪些可以保持不变的过程。这是React性能优化的关键部分。 |

---



## 特点

**1.声明式设计** −React采用声明范式：采用一种描述性的方式来定义组件的状态和外观，而不是直接操作DOM来更新界面。

> 在声明式设计中，开发者主要关注组件的当前状态，以及状态变化时应该呈现的界面。React会自动处理这些状态变化，并高效地更新DOM，以反映新的界面状态。这种方式使得代码更加直观、易于理解和维护。
>
> 与命令式编程（如使用jQuery或DOM事件直接操作DOM）相比，声明式设计更加关注结果而不是过程。在命令式编程中，开发者需要明确地告诉浏览器每一步应该做什么，而在声明式设计中，开发者只需要描述出最终的状态，React会自动完成中间的转换过程。

**2.高效** −React通过对VDOM，最大限度地减少与DOM的交互。

**4.JSX** − JSX 是 JavaScript 语法的扩展。

**5.组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。

**6.单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

> 在 React 中，数据主要沿一个方向流动，从父组件流向子组件。
>
> 当父组件的状态（state）发生变化时，它会将新的状态传递给子组件。
>
> 子组件接收到新的属性（props）后，会根据这些属性来渲染界面。在这个过程中，子组件不能直接修改父组件的状态，而是需要通过某种方式（如回调函数）通知父组件进行状态更新。

---



## **组件**

### **组件定义**

React 组件定义有两种类型：类组件和函数组件。

React定义组件主要有三种方式：

1. **无状态函数式组件**：这种组件是为了创建纯展示组件，只负责根据传入的props来展示，不涉及到state状态的操作。它没有实例，整体渲染性能得到提升，因此不能访问this对象，也不能使用生命周期的方法。语法上，它就是一个简单的JavaScript函数，接受props作为参数，并返回React元素。
2. **React.createClass定义的组件**：这是ES5的方式定义组件。它会自动绑定成员函数中的this，但可能会导致不必要的性能开销，并增加代码过时的可能性。现在这种方式已经较少使用。
3. **React.Component定义的组件**：这是ES6形式的组件定义方式，通过继承React.Component类来创建组件。它允许你使用更多的React特性，如state和生命周期方法。需要注意的是，与React.createClass不同，React.Component创建的组件需要手动绑定成员函数中的this，否则this不能获取当前组件实例对象。

#### 类组件（Class Components）

类组件是面向对象编程思想的一种表征。

类组件特性：

- **封装**: 将一类属性和方法，“聚拢”到一个 Class 里
- **继承**: 新的 Class 可以通过继承现有 Class实现对某一类属性和方法的复用

类组件是使用ES6的类语法定义的React组件。

它们**具有更完整的生命周期方法**，包括组件挂载、更新和卸载等各个阶段的方法。

类组件也支持状态（state）和事件处理。

**特征：**

1. **状态管理**：类组件有自己的状态（state），可以**通过`this.state`访问和修改**。状态的变化会触发组件的重新渲染。
2. **生命周期方法**：类组件包含一系列生命周期方法，如`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`等，用于在组件的不同阶段执行特定的操作。
3. **事件处理**：类组件可以定义事件处理函数，通过绑定到DOM元素的事件来响应用户交互。
4. **引用（Refs）**：类组件可以使用`createRef`或`React.forwardRef`来创建和使用refs，从而直接访问DOM元素或子组件。

```jsx
class MyClassComponent extends React.Component {   
  constructor(props) {  //初始化组件的状态和绑定事件处理函数
    super(props);  //通过`super`关键字获取来自父组件的`props`
    this.state = {  
      // 使用props来初始化状态（如果需要的话）  
      value: props.initialValue,  
    };  
    this.handleClick = this.handleClick.bind(this); //在`this`上挂载方法
  }  
  
  render() {  
    return <div>{this.state.value}</div>;  
  }  
}
```

>  在这个例子中，`MyClassComponent`是一个类组件。它有一个构造函数，用于初始化组件的状态。状态是一个对象，可以包含组件需要的数据。`render`方法返回组件的JSX，即要渲染的UI。此外，类组件还有生命周期方法，如`componentDidMount`、`componentDidUpdate`等，这些方法在组件的不同生命周期阶段被自动调用。



#### 函数组件（Function Components）

函数组件是使用普通JavaScript函数定义的React组件。

函数组件更加轻量，没有内置的状态和生命周期方法，但可以通过Hooks来添加这些功能。

**特征：**

1. **无状态**：函数组件本身没有状态，但可以通过Hooks（如`useState`）来添加状态。
2. **Hooks**：函数组件可以使用Hooks来访问React的特性，如状态、生命周期、上下文等，而无需编写类。
3. **简单性**：函数组件的语法更加简洁，易于理解和维护。
4. **性能**：由于函数组件没有类的开销，它们在性能上可能略优于类组件。

```jsx
import React, { useState, useEffect } from 'react';  
  
function MyFunctionComponent() {  
  const [message, setMessage] = useState('Hello from Function Component');  
  
  useEffect(() => {  
    console.log('Component mounted');  
  }, []);  
  
  return <div>{message}</div>;  
}
```

>  在这个例子中，`MyFunctionComponent`是一个函数组件。它使用`useState` Hook来添加一个状态变量`message`，并通过`setMessage`函数来更新这个状态。当状态发生变化时，组件会重新渲染。此外，它还使用`useEffect` Hook来模拟类组件的生命周期方法，这里用于在组件挂载时打印一条消息。



#### 类组件与函数组件的对比

|                  | 类组件                                            | 函数组件                                 |
| :--------------: | :------------------------------------------------ | :--------------------------------------- |
|   **定义方式**   | 使用ES6的类语法                                   | 使用普通JavaScript函数                   |
|   **状态管理**   | 内置状态管理，通过`this.state`访问和修改          | 通过`useState` Hook添加状态              |
| **生命周期方法** | 完整的生命周期方法，如`componentDidMount`等       | 通过Hooks（如`useEffect`）模拟生命周期   |
|   **事件处理**   | 定义事件处理函数，通过`this`绑定到组件实例        | 定义事件处理函数，作为组件函数的参数传递 |
| **引用（Refs）** | 使用`createRef`或`React.forwardRef`创建和使用refs | 通过`useRef` Hook创建和使用refs          |
|    **复杂性**    | 相对复杂，需要处理类的继承、this绑定等问题        | 简单直观，易于理解和维护                 |
|     **性能**     | 可能略逊于函数组件，因为有类的开销                | 性能较好，没有类的开销                   |

* 类组件提供了更完整的生命周期方法和状态管理，适用于复杂的组件逻辑；

* 而函数组件则更加轻量、简单，并且随着Hooks的引入，其功能得到了极大的增强。

* 类组件需要继承 class，函数组件不需要；

* 类组件可以访问生命周期方法，函数组件不能；

* 类组件中可以获取到实例化后的 this，并基于这个 this 做各种各样的事情，而函数组件不可以；

* 类组件中可以定义并维护 state(状态)，而函数组件不可以；

* 函数组件会捕获 render内部的状态，这是两类组件最大的不同；函数组件真正地把数据和渲染绑定到了一起；




### **注意事项**

> **不能把组件函数的定义嵌套起来**

React 组件为函数，每次渲染组件时，就是重新调用一次函数，如果将组件函数的定义嵌套起来，将导致定义被嵌套组件的状态无法控制（每次外层组件渲染时，被嵌套组件函数重新被执行渲染，状态重置）

示例参考官网：[对 state 进行保留和重置 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)

> **组件名字总是以大写字母开头**

> **组件返回 JSX 标签**

> **一个组件必须是纯粹的**

- **只负责自己的任务。** 它不会更改在该函数调用前就已存在的对象或变量。
- **输入相同，则输出相同。** 给定相同的输入，组件应该总是返回相同的 JSX。

>  组件不应依赖于彼此的渲染顺序,渲染随时可能发生。

> **不应该改变任何用于组件渲染的输入**。这包括 props、state 和 context。通过 [“设置” state](https://react.docschina.org/learn/state-a-components-memory) 来更新界面，而不要改变预先存在的对象。

> **列表渲染时为每个组件设置一个 `key` 值**：它使 React 能追踪这些组件，即便后者的位置或数据发生了变化

---

## **受控组件和非受控组件**

在React中，表单元素的行为主要分为两种类型：受控组件（Controlled Components）和非受控组件（Uncontrolled Components）。

### **受控组件**

受控组件是指其值（如输入框的值）由React的状态（state）来控制并更新的组件：

* 在受控组件中，组件的值与状态之间保持同步：当用户输入或选择某个值时，会触发相应的事件处理函数来更新组件的状态，从而重新渲染组件。
* 受控组件必须提供一个事件处理函数来管理值的变化。
* 受控组件的优点是可以精确控制表单元素的值和行为，并且能够对值进行验证和处理。

**示例**

在受控组件中，我们将使用React的state来管理表单元素的值。

在函数组件中，我们可以使用React的`useState` Hook来创建和管理状态。

```jsx
import React, { useState } from 'react';  
  
function ControlledComponent() {  
  const [inputValue, setInputValue] = useState('');  
  
  const handleChange = (event) => {  
    setInputValue(event.target.value);  
  };  
  
  return (  
    <div>  
      <input type="text" value={inputValue} onChange={handleChange} />  
      <p>你输入的内容是: {inputValue}</p>  
    </div>  
  );  
}  
  
export default ControlledComponent;
```

>  在这个例子中，`input`元素的值通过`useState` Hook创建的状态`inputValue`来控制。
>
> 当用户在输入框中输入文本时，`handleChange`函数会被调用，并通过`setInputValue`更新状态。这会导致组件重新渲染，输入框的值也会更新为新的状态值。

### **非受控组件**

非受控组件则是指其值不受React状态控制的组件：

* 在非受控组件中，表单元素的值通常由DOM自身维护，并通过对DOM进行引用来获取表单元素的值。通常是通过ref属性获取DOM元素的引用。
* 非受控组件的优点是简单易用，在处理简单的表单场景时可以减少代码量。它适用于一些简单的场景，不需要对表单数据进行额外处理的情况。

**示例**

非受控组件在函数组件中通常使用`useRef` Hook来获取对DOM元素的引用，而不是使用状态来管理值。

```jsx
import React, { useRef } from 'react';  
  
function UncontrolledComponent() {  
  const inputRef = useRef(null);  
  
  const handleSubmit = (event) => {  
    event.preventDefault();  
    alert('你输入的内容是: ' + inputRef.current.value);  
  };  
  
  return (  
    <form onSubmit={handleSubmit}>  
      <input type="text" ref={inputRef} />  
      <button type="submit">提交</button>  
    </form>  
  );  
}  
  
export default UncontrolledComponent;
```

> 在这个例子中，我们使用`useRef`创建了一个`ref`对象，并将其附加到`input`元素上。通过`inputRef.current`，我们可以访问到实际的DOM节点，并读取其值。当用户点击提交按钮时，我们直接通过`inputRef.current.value`获取输入框的值，而不需要通过状态来管理它。

非受控组件在React函数组件中相对较少使用，因为它们的值不由React状态控制，这可能导致数据流不清晰。然而，在某些情况下，如与第三方库集成或需要直接操作DOM时，非受控组件可能是必要的。

### **区别**

受控组件和非受控组件的主要区别在于表单元素的值是由React状态控制还是由DOM自身维护。

|     对比项     | 受控组件 (Controlled Components)                             | 非受控组件 (Uncontrolled Components)                  |
| :------------: | :----------------------------------------------------------- | :---------------------------------------------------- |
|   **值管理**   | 值由React状态控制                                            | 值由DOM自身维护                                       |
|  **状态管理**  | 使用React状态（如`useState`）来管理值                        | 不使用React状态来管理值                               |
|   **数据流**   | 清晰、明确的数据流                                           | 数据流可能不清晰，直接操作DOM                         |
|  **事件处理**  | 需要编写事件处理函数来更新状态                               | 无需编写事件处理函数来更新状态                        |
| **验证和处理** | 可以方便地对值进行验证和处理                                 | 值验证和处理可能较复杂，通常需要在表单提交时处理      |
|    **性能**    | 可能需要更多的计算和渲染，因为每次值改变都会触发状态更新和组件重渲染 | 性能可能稍好，因为不涉及到React状态的更新和组件重渲染 |
|  **适用场景**  | 复杂表单、需要验证和处理表单数据                             | 简单表单、无需额外处理表单数据、与第三方库集成        |
|  **推荐程度**  | 推荐用于复杂表单和需要精确控制表单元素值的情况               | 在简单表单或特定场景下使用，通常不是首选              |

## 高阶组件

### 概念

高阶函数（Higher-order function），至少满足下列一个条件的函数：

- 接受一个或多个函数作为输入
- 输出一个函数

在`React`中，高阶组件即接受一个或多个组件作为参数并且返回一个组件，本质也就是一个函数，并不是一个组件

```jsx
const EnhancedComponent = highOrderComponent(WrappedComponent);
```

上述代码中，该函数接受一个组件`WrappedComponent`作为参数，返回加工过的新组件`EnhancedComponent`

高阶组件的这种实现方式，本质上是一个装饰者设计模式。

### 编写高阶组件

最基本的高阶组件的编写模板如下：

```jsx
import React from 'react';  
  
// 高阶组件  
const withExample = (WrappedComponent) => {  
  return class extends React.Component {  
    render() {  
      // 在这里可以添加一些额外的逻辑，比如 props 的处理、状态的管理等  
      // 然后将处理后的 props 传递给被包装的组件  
      return <WrappedComponent {...this.props} />;  
    }  
  };  
};  
  
// 使用高阶组件  
const MyComponent = (props) => {  
  return <div>{props.text}</div>;  
};  
  
const MyComponentWithExample = withExample(MyComponent);  
  
// 在父组件中使用  
function App() {  
  return (  
    <div className="App">  
      <MyComponentWithExample text="Hello, World!" />  
    </div>  
  );  
}  
  
export default App;
```

在这个例子中，`withExample` 是一个高阶组件。它接收一个组件 `WrappedComponent` 作为参数，并返回一个新的组件。这个新的组件在渲染时会将 `WrappedComponent` 作为其子组件，并可以将一些额外的逻辑或属性传递给 `WrappedComponent`。

### 思想

把通用的逻辑放在高阶组件中，对组件实现一致的处理，从而实现代码的复用；

所以，高阶组件的主要功能是**封装并分离组件的通用逻辑**，让通用逻辑在组件间更好地被复用。

### 编写高阶组件约定

- **纯函数**：高阶组件应该是一个纯函数，即对于相同的输入，它应该总是返回相同的输出，并且不直接修改其参数。这有助于避免在组件树中引入不可预测的状态和行为。
- **传递 props**：高阶组件应该透明地传递其接收到的 props 到被包装的组件。这通常通过扩展（spread）`this.props` 或使用其他适当的属性传递机制来实现。
- **不要修改组件**：高阶组件不应该修改传入的组件；它们应该返回一个新的组件，该组件在渲染时使用或包装传入的组件。
- **命名约定**：高阶组件通常以 `with` 开头来命名，例如 `withRouter`、`withStyles` 等。这种命名约定有助于识别哪些组件是高阶组件。
- **组合多个 HOC**：高阶组件可以组合使用，即一个高阶组件可以包装另一个高阶组件。这有助于构建具有多个功能的强大组件。但是，要注意不要创建过深的组件树，这可能会导致性能问题和调试困难。
- **静态方法**：高阶组件应该保留被包装组件的静态方法。这可以通过使用 `hoist-non-react-statics` 这样的库来自动实现，或者手动复制静态方法。
- **Ref 转发**：如果需要访问被包装组件的 ref，则应该使用 React 16.3+ 引入的 `React.forwardRef` API 来转发 ref。这允许父组件通过 ref 访问被包装组件的实例。
- **避免无限循环**：确保高阶组件不会导致渲染循环。例如，如果一个高阶组件在渲染时又包装了自身，这会导致无限循环。



### 高阶组件的ref

高阶组件可以传递所有的`props`，但是不能传递`ref`;

如果向一个高阶组件添加`refe`引用，那么`ref` 指向的是最外层容器组件实例的，而不是被包裹的组件;

如果需要传递`refs`的话，则使用`React.forwardRef`，将高阶组件的 ref 转发到被包裹的组件中，如下：

```jsx
// 高阶组件
function withLogging(WrappedComponent) {
    // 被包裹的组件
    class Enhance extends WrappedComponent {
        // 在挂载时，给组件添加打印日志
        componentWillReceiveProps() {
            console.log('Current props', this.props);
            console.log('Next props', nextProps);
        }
        render() {
            // 获取组件的属性
            const {forwardedRef, ...rest} = this.props;
            // 把 forwardedRef 赋值给被包裹组件的 ref，达到对高级组件的引用实际为被包裹组件的引
            return <WrappedComponent {...rest} ref={forwardedRef} />;
        }
    };

    // React.forwardRef 方法会传入 props 和 ref 两个参数给其回调函数
    // 所以这边的 ref 是由 React.forwardRef 提供的
    function forwardRef(props, ref) {
        // 传入高阶组件的属性和引用
        return <Enhance {...props} forwardRef={ref} />
    }

    return React.forwardRef(forwardRef);
}
const EnhancedComponent = withLogging(SomeComponent);
```

### 应用

高阶组件能够提高代码的复用性和灵活性，在实际应用中，常常用于与核心业务无关但又在多个模块使用的功能，如权限控制、日志记录、数据校验、异常处理、统计上报等。

#### 获取异步数据

存在一个组件，需要从缓存中获取数据，然后渲染。一般情况，我们会如下编写：

```jsx
import React, { Component } from 'react'

class MyComponent extends Component {

  componentWillMount() {
      let data = localStorage.getItem('data');
      this.setState({data});
  }
  
  render() {
    return <div>{this.state.data}</div>
  }
}
```

上述代码当然可以实现该功能，但是如果还有其他组件也有类似功能的时候，每个组件都需要重复写`componentWillMount`中的代码，这明显是冗杂的

下面就可以通过高价组件来进行改写，如下：

```jsx
import React, { Component } from 'react'
// 高阶组件接收需要接收数据的组件，并在挂载时获取数据
function withPersistentData(WrappedComponent) {
  return class extends Component {
    // 高阶组件在挂载时获取数据
    componentWillMount() {
      let data = localStorage.getItem('data');
        this.setState({data});
    }
    
    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

// 被包裹的组件
class MyComponent2 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
}
// 通过高阶组件包裹后，MyComponentWithPersistentData 将在组件挂载时获取异步数据，然后渲染
const MyComponentWithPersistentData = withPersistentData(MyComponent2)
```



#### 组件渲染性能监控

```jsx
// 被包裹测试的渲染组件
class Home extends React.Component {
    render() {
        return (<h1>Hello World.</h1>);
    }
}

// 高阶组件-获取组件渲染时间
function withTiming(WrappedComponent) {
    return class extends WrappedComponent {
        constructor(props) {
            super(props);
            this.start = 0; // 开始渲染时间
            this.end = 0; // 渲染完成时间
        }
        // 组件挂载时渲染时，获取开始渲染时间
        componentWillMount() {
            super.componentWillMount && super.componentWillMount();
            this.start = Date.now();
        }
        // 组件挂载完成计算渲染时间
        componentDidMount() {
            super.componentDidMount && super.componentDidMount();
            this.end = Date.now();
            console.log(`${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`);
        }
        render() {
            return super.render();
        }
    };
}
// 计算 Home 组件的渲染时间
export default withTiming(Home)
```



---





## **JSX**

```react
ReactDOM.render(
    <div>
	<h1>JSX教程</h1>
	<h2>欢迎学习 React</h2>
        <p data-myattribute = "somevalue">react jsx</p>
    </div>,
    document.getElementById('example')
);
```

### React JSX 本质是什么,它和 JS 之间是什么关系

React JSX（JavaScript XML）是一种 JavaScript 的语法扩展，它允许你在 JavaScript 代码中写类似 HTML 的代码。

JSX 本质上是一种结构化的语法，用于描述 UI 组件的树形结构。

它不是真正的 HTML，而是一种标记语言，可以被转换成相应的 JavaScript 代码。

### JSX 和 JS 的关系

1. **语法糖**：
   - JSX 可以被看作是 JavaScript 的一种语法糖，它提供了一种更加直观和声明式的方式来表达 UI。
   - 尽管 JSX 看起来像是在 JavaScript 代码中混合了 HTML，但它最终会被转换成纯 JavaScript 代码，因此可以在任何支持 JavaScript 的环境中运行。
2. **转换过程**：
   - 在构建过程中，React 会使用 JSX 转换器（通常是一个 Babel 插件）将 JSX 代码转换成相应的 JavaScript 函数调用。
   - 这些函数调用会创建 JavaScript 对象，这些对象代表了 UI 的结构，即虚拟 DOM。
3. **组件描述**：
   - 使用 JSX，开发者可以定义组件的界面结构，包括元素类型、属性和子元素。
   - JSX 表达式可以包含 JavaScript 表达式，例如变量、函数调用和条件语句，这使得 UI 的动态创建成为可能。
4. **虚拟 DOM**：
   - JSX 描述的 UI 结构会被用来构建虚拟 DOM，这是 React 性能优化策略的核心。
   - 虚拟 DOM 是一种轻量级的 JavaScript 对象，它代表了真实 DOM 的状态。React 使用虚拟 DOM 来计算最小的更新操作，然后高效地更新到真实 DOM。
5. **声明式编程**：
   - JSX 使得开发者能够以声明式的方式编写 UI 代码，即描述“UI 应该是什么样”，而不是“如何让 UI 变成这样”。
   - 这种编程范式简化了 UI 的管理和更新，因为状态变化时，React 会自动处理 UI 的更新。
6. **集成性**：
   - JSX 可以与 JavaScript 代码无缝集成，使得逻辑和 UI 可以紧密地结合在一起。
   - 这种集成性是 React 组件模型的一部分，它允许开发者将 UI 和与之相关的逻辑封装在单个组件中。

###  JSX 和 React 运行机制之间的联系

1. **虚拟 DOM 的创建**：
   - JSX 使得开发者能够以一种直观的方式描述 UI。
   - 当 React 应用运行时，JSX 会被转换成对应的 JavaScript 对象，这些对象构成了虚拟 DOM 的基础。
   - 虚拟 DOM 是一个轻量级的 DOM 树表示，它允许 React 高效地更新 UI。
2. **组件化结构**：
   - JSX 支持组件化的开发方式，允许开发者将 UI 划分为独立的、可复用的组件。
   - React 的运行机制利用这些组件来构建虚拟 DOM，并且在状态或属性变化时，只更新变化的部分，而不是重新渲染整个应用。
3. **声明式编程**：
   - JSX 采用声明式语法，开发者只需描述 UI 的最终状态，而不是如何达到这个状态。
   - React 的运行机制通过 Diff 算法计算出新旧虚拟 DOM 之间的差异，并应用最小的更新操作到真实 DOM，从而实现高效的 UI 更新。
4. **响应式更新**：
   - JSX 中的 JavaScript 表达式可以动态地插入数据和逻辑，使得 UI 能够响应数据的变化。
   - React 的运行机制通过监听状态和属性的变化，触发组件的重新渲染，确保 UI 总是反映当前的状态。
5. **性能优化**：
   - JSX 允许开发者编写高性能的 UI 代码，因为它支持元素的复用和条件渲染。
   - React 的运行机制通过虚拟 DOM 和组件的生命周期方法来优化性能，例如，使用 `shouldComponentUpdate` 来避免不必要的渲染。
6. **跨平台渲染**：
   - JSX 语法不依赖于特定的平台，使得 React 能够在不同的环境下运行，如 Web、iOS、Android 等。
   - React 的运行机制支持跨平台渲染，通过特定的平台适配器（如 `react-dom`、`react-native`）来将虚拟 DOM 映射到不同平台上的真实 DOM。

总结来说，JSX 是 React 运行机制的一部分，它提供了一种直观的方式来描述 UI，而 React 的运行机制则负责将这些描述转换为实际的 UI 并进行高效的更新。

JSX 和 React 运行机制共同构成了 React 框架的核心，使得开发者能够以一种简单、高效且可预测的方式来构建复杂的用户界面。



### **JSX 规则**

* 只能返回一个根元素 

* 标签必须闭合

* 驼峰式命名属性
* 组件的名称大写，以区分它们与普通的 HTML 标签
* 在 JSX 中，用单括号`{}` 解析表达式值，属性（attributes）使用双引号，而不是单引号
* 浏览器不能直接理解 JSX，需要使用 Babel 将 JSX 转换为纯 JavaScript。通过配置构建工具（如 Webpack）实现。

详细解释参考文档：[使用 JSX 书写标签语言 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/writing-markup-with-jsx)

### **渲染子组件 (类似 Slot)**

**将 JSX 作为子组件传递**：

当您将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 prop 中接收到子组件内容。

```react
import React from 'react';  
  
function ParentComponent({ children }) {  
  return (  
    <div>  
      <h1>我是父组件</h1>  
      {children} {/* 直接渲染props中的子组件 */}  
    </div>  
  );  
}  
  
// 使用时  
function App() {  
  return (  
    <ParentComponent>  
      <p>我是子组件1</p>  
      <p>我是子组件2</p>  
    </ParentComponent>  
  );  
}
```

**参考资料**

[React JSX_w3cschool](https://www.w3cschool.cn/react/react-jsx.html)

[使用 JSX 书写标签语言 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/writing-markup-with-jsx)

---



## **Prop**

**单向数据流**

当前组件的 state 以 props 的形式流动时，只能流向组件树中比自己层级更低的组件

**摘要：**

- 要传递 props，请将它们添加到 JSX，就像使用 HTML 属性一样。
- 要读取 props，请使用 `function Avatar({ person, size })` 解构语法。
- 你可以指定一个默认值，如 `size = 100`，用于缺少值或值为 `undefined` 的 props 。
- 你可以使用 `<Avatar {...props} />` JSX 展开语法转发所有 props，但不要过度使用它！
- 像 `<Card><Avatar /></Card>` 这样的嵌套 JSX，将被视为 `Card` 组件的 `children` prop。
- Props 是只读的时间快照：每次渲染都会收到新版本的 props。
- 你不能改变 props。当你需要交互性时，你可以设置 state。

> 详细解释参考官网： [将 Props 传递给组件 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/passing-props-to-a-component#)

### **组件通信**

在React中，组件间的通信主要通过props和回调函数实现：父组件通过props将数据或函数传递给子组件，子组件则可以通过这些props来接收数据和触发回调函数，从而实现与父组件的通信。

对于跨层级的组件通信，React提供了Context API。Context提供了一种在组件树中共享值的方式，无需显式地通过每一层组件传递props。

---



## **state**

在 React 中，`state` 是**组件内部用于存储可变数据的一种对象**。

这个对象可以在组件的生命周期内被修改，并且**每次修改都会触发组件的重新渲染**。

`state` 是 React 组件响应式特性的基础，它使得组件能够根据内部状态的变化来更新其 UI。

### **特点**

1. **局部性**：`state` 是组件私有的，只能在该组件内部访问和修改。如果你在两个地方渲染它，则每个副本都有独属于自己的 state。
2. **不可变性**：`state` 的更新应该总是创建一个新的状态对象，而不是直接修改当前状态，通过`setState` 方法重新创建。
3. **触发渲染**：**当 `state` 发生变化时，React 会自动重新渲染该组件及其子组件**。
4. **异步更新**：在React中，**`setState`的调用是异步的，它不会立即更新组件的状态**。React 把一系列 state 更新加入队列 ，并在在事件循环的下一个迭代应用。
5. **状态独立**：React 将 state 存储在组件之外，状态是独立于组件的，但可以通过组件来访问和修改。
   * 实际上每次组件在渲染时候，都会调用组件函数，并返回 JSX 模板。**组件内 state 每次渲染时不会重置**，因为 state 保存在 React 的队列中，每次渲染时会从队列中获取下次渲染的 state 值。注意**组件内定义的变量每次渲染时会重新定义**。

### **类组件中使用 `state`**

在类组件中，`state` 是通过类的构造函数来初始化的，并使用 `this.setState` 方法来更新：

* 在构造函数中定义 `state`;
* 通过 `this.setState` 更新状态；

```jsx
class MyComponent extends React.Component {  
  constructor(props) {  
    super(props);  
    this.state = {  //在构造函数中定义 `state`
      count: 0  
    };  
  }  
  
  handleClick = () => {  
    // 通过 `this.setState` 更新状态；
    this.setState(prevState => ({  
      count: prevState.count + 1  
    }));  
  }  
  
  render() {  
    return (  
      <div>  
        <p>You clicked {this.state.count} times</p>  
        <button onClick={this.handleClick}>Click me</button>  
      </div>  
    );  
  }  
}
```

在上面的例子中，我们定义了一个名为 `MyComponent` 的类组件，并在构造函数中初始化了 `state` 对象。然后，在 `handleClick` 方法中，我们使用 `this.setState` 来更新 `count` 的值。

### **函数组件中使用 `state`**

使用 React 的 `useState` Hook 来在函数组件中添加状态,`useState` Hook 返回一对值，当前 state 和更新它的函数:

```js
 const [count, setCount] = useState(0);
```

使用示例：

```jsx
import React, { useState } from 'react';  
  
function MyFunctionComponent() {  
  const [count, setCount] = useState(0);  
  
  const handleClick = () => {  
    setCount(count + 1);  
  };  
  
  return (  
    <div>  
      <p>You clicked {count} times</p>  
      <button onClick={handleClick}>Click me</button>  
    </div>  
  );  
}
```

在这个函数组件的例子中，我们使用 `useState` Hook 来初始化一个名为 `count` 的状态变量和一个用于更新该状态的函数 `setCount`。然后，在 `handleClick` 函数中，我们使用 `setCount` 来更新 `count` 的值。

需要注意的是，`useState` 是 React Hooks 的一部分，只能在函数组件的顶层调用，并且不能在类组件中使用。Hooks 的引入使得函数组件能够拥有类似类组件的状态管理功能，同时保持了函数组件的简洁和可重用性。

### **更新 state 中对象**

在 React 中，如果你想要更新 state 中的对象，你需要**创建一个新的对象，并将需要更新的属性添加到这个新对象中，然后使用 `setState` 方法来更新整个对象**。

**直接修改 state 中的对象不会触发 React 的重新渲染机制**。



**摘要**

- 将 React 中所有的 state 都视为不可直接修改的。
- 当你在 state 中存放对象时，直接修改对象并不会触发重渲染，并会改变前一次渲染“快照”中 state 的值。
- 不要直接修改一个对象，而要为它创建一个 **新** 版本，并通过把 state 设置成这个新版本来触发重新渲染。
- 你可以使用这样的 `{...obj, something: 'newValue'}` 对象展开语法来创建对象的拷贝。
- 对象的展开语法是浅层的：它的复制深度只有一层。
- 想要更新嵌套对象，你需要从你更新的位置开始自底向上为每一层都创建新的拷贝。
- 想要减少重复的拷贝代码，可以使用 Immer。

> 参考 官方文档：[更新 state 中的对象 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/updating-objects-in-state)



类组件更新state中对象：

```react
import React, { Component } from 'react';  
  
class MyComponent extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      person: {  
        name: 'Alice',  
        age: 30,  
        address: {  
          street: '123 Main St',  
          city: 'Anytown',  
          state: 'CA'  
        }  
      }  
    };  
  
    this.updateName = this.updateName.bind(this);  
    this.updateAge = this.updateAge.bind(this);  
  }  
  
  updateName(newName) {  
    // 创建一个新的 person 对象，并更新 name 属性  
    this.setState(prevState => ({  
      person: {  
        ...prevState.person, // 复制旧的对象  
        name: newName // 更新 name 属性  
      }  
    }));  
  }  
  
  updateAge(newAge) {  
    this.setState(prevState => ({  
      person: {  
        ...prevState.person,  
        age: newAge  
      }  
    }));  
  }  
  
  render() {  
    const { name, age } = this.state.person;  
    return (  
      <div>  
        <p>Name: {name}</p>  
        <p>Age: {age}</p>  
        <button onClick={() => this.updateName('Bob')}>Update Name to Bob</button>  
        <button onClick={() => this.updateAge(31)}>Update Age to 31</button>  
      </div>  
    );  
  }  
}  
  
export default MyComponent;
```



**函数组件更新state中对象：**

```react
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```



#### 使用 Immer 编写简洁的更新逻辑

如果你的 state 有多层的嵌套，你或许应该考虑 [将其扁平化](https://react.docschina.org/learn/choosing-the-state-structure#avoid-deeply-nested-state)。但是，如果你不想改变 state 的数据结构，你可能更喜欢用一种更便捷的方式来实现嵌套展开的效果。[Immer](https://github.com/immerjs/use-immer) 是一个非常流行的库，它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程。通过使用 Immer，你写出的代码看起来就像是你“打破了规则”而直接修改了对象：

```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

但是不同于一般的 mutation，它并不会覆盖之前的 state！



### **更新 state 中数组**

在 React 中，更新 state 中的数组通常涉及几个步骤。

你需要确定要执行的具体操作（比如添加、删除或修改数组中的元素），然后创建一个新的数组来替换当前的 state 数组。

由于 React 的 state 是不可变的，你**不能直接修改 state 中的数组，而必须用一个新的数组来更新 state**。

**摘要**

- 你可以把数组放入 state 中，但你不应该直接修改它。
- 不要直接修改数组，而是创建它的一份 **新的** 拷贝，然后使用新的数组来更新它的状态。
- 你可以使用 `[...arr, newItem]` 这样的数组展开语法来向数组中添加元素。
- 你可以使用 `filter()` 和 `map()` 来创建一个经过过滤或者变换的数组。
- 你可以使用 Immer 来保持代码简洁。

> 详细参考官方文档：[更新 state 中的数组 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/updating-arrays-in-state)



### **组件间共享 state**

**摘要**

- 当你想要整合两个组件时，将它们的 state 移动到共同的父组件中。
- 然后在父组件中通过 `props` 把信息传递下去。
- 最后，向下传递事件处理程序，以便子组件可以改变父组件的 state 。
- 考虑该将组件视为“受控”（由 prop 驱动）或是“不受控”（由 state 驱动）是十分有益的。

> 详细参考官方文档：[在组件间共享状态 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/sharing-state-between-components)



### **对 state 进行保留和重置**

- 只要在相同位置渲染的是相同组件， React 就会保留状态。
- state 不会被保存在 JSX 标签里。它与你在树中放置该 JSX 的位置相关联。
- 你可以通过为一个子树**指定一个不同的 key 来重置它的 state**。
- 不要嵌套组件的定义，否则你会意外地导致 state 被重置。

> 详细参考官方文档：[对 state 进行保留和重置 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/preserving-and-resetting-state#)

### **state 更新批处理**

**批量更新**：在React中，`setState` 的调用是**异步**的，它不会立即更新组件的状态。React 把一系列 state 更新加入队列 ，并在在事件循环的下一个迭代应用。这样做的一个主要好处是React可以批量处理多个状态更新，以提高性能。

**函数组件状态更新批处理：**

```react
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(score + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}

```

> 这段代码中的`Counter`组件确实存在一个问题：当点击“+3”按钮时，分数只会增加一次，而不是三次。这个问题是由于React的状态更新是异步的导致的。
>
> 当点击“+3”按钮时，`increment`函数会被连续调用三次。每次调用`increment`都会创建一个新的状态更新（即`score + 1`），但由于状态更新是异步的，这三个更新实际上都会被合并成一个。因此，当React应用这些更新时，只会看到最后一个`score + 1`，这导致`score`只增加了一次。

**类组件状态更新批处理：**

在类组件中，你使用 `this.setState` 方法来更新 state。同样地，`this.setState` 也是异步的，并且不会立即更新 `this.state`。

```jsx
class ExampleComponent extends React.Component {  
  constructor(props) {  
    super(props);  
    this.state = { count: 0 };  
  }  
  
  handleIncrement = () => {  
    this.setState({ count: this.state.count + 1 });  
    // 注意：this.setState 是异步的，所以下面的 console.log 可能会输出旧的值  
    console.log(this.state.count); // 可能输出旧的值  
  };  
  
  render() {  
    return (  
      <div>  
        <p>Count: {this.state.count}</p>  
        <button onClick={this.handleIncrement}>Increment</button>  
      </div>  
    );  
  }  
}
```

为了解决这个问题，你可以使用**函数式的状态更新**，它允许你基于先前的状态来计算新的状态

### **多次更新同一个 state**

通过在设置状态时传递一个 更新器函数 使 react 在下次渲染前多次更新同一个 state

#### **更新器函数**

在 `useState` 或 `this.setState` 中，你可以给状态更新函数传入一个函数而不是一个值来更新 state：

```js
setState(prevState => prevState + 1)
```

这个函数会接收当前的 state 值作为参数，并返回一个新的 state 值。这确保了你的更新是基于最新的 state 值。

**使用 `useState` 的函数式更新**

```jsx
import React, { useState, useEffect } from 'react';  
  
function ExampleComponent() {  
  const [count, setCount] = useState(0);  
  
  useEffect(() => {  
    // 模拟在渲染前多次更新同一个 state  
    setCount(prevCount => prevCount + 1); // 第一次更新  
    setCount(prevCount => prevCount + 1); // 第二次更新  
    // ... 可以继续更多次更新  
  }, []); // 空数组作为依赖项，确保只在组件挂载时运行  
  
  return (  
    <div>  
      <p>Count: {count}</p>  
    </div>  
  );  
}
```

**使用 `this.setState` 的函数式更新**

```jsx
class ExampleComponent extends React.Component {  
  constructor(props) {  
    super(props);  
    this.state = { count: 0 };  
  }  
  
  componentDidMount() {  
    // 模拟在渲染前多次更新同一个 state  
    this.setState(prevState => ({ count: prevState.count + 1 })); // 第一次更新  
    this.setState(prevState => ({ count: prevState.count + 1 })); // 第二次更新  
    // ... 可以继续更多次更新  
  }  
  
  render() {  
    return (  
      <div>  
        <p>Count: {this.state.count}</p>  
      </div>  
    );  
  }  
}
```

### setState 与生命周期

setState 后触发的 React 生命周期流程：

<img src="../images/image-20240420102822920.png" alt="image-20240420102822920" style="zoom:50%;" />

### **useState 如何工作**

**为什么需要 useState?**

早期的函数组件相比于类组件其一大劣势是缺乏定义和维护 state 的能力，useState 正是这样一个能够为函数组件引入状态的 API

**useState 是什么？**

`useState` 是React原生的Hook，其本质是为函数组件提供状态管理的能力。

具体来说，useState接受一个初始状态值作为参数，并返回一个数组，该数组包含两个元素：当前的状态值和一个用于更新该状态值的函数。

```js
const [index, setIndex] = useState(“初始值”);
```

#### **原理**

> 参考：[React 如何知道返回哪个 state](https://react.docschina.org/learn/state-a-components-memory#how-does-react-know-which-state-to-return) 

`useState` 的原理是基于 React 的内部状态管理和函数组件的渲染机制。它允许你在没有类实例的情况下为函数组件添加局部状态，并通过闭包和顺序依赖确保状态的一致性和可预测性:

**整体工作流**：

<img src="../images/image-20240420103244800.png" alt="image-20240420103244800" style="zoom:50%;" />



React 的 `setState` 更新流程可以详细描述如下：

1. **触发 `setState`**：
   - 当组件需要更新状态时，会调用 `setState` 方法。这通常是响应用户交互或其他事件的结果。

2. **`enqueueSetState`**：
   - `setState` 调用后，React 会将状态更新的请求放入一个**队列**（queue）中。这个过程称为 `enqueueSetState`。
   - 队列中的每个更新请求都包含了需要更新的状态和相关的组件信息。

3. **`enqueueUpdate`**：（更新队列）
   - 一旦状态更新请求被加入队列，React 会为相关的组件调度一个更新过程。这个过程称为 `enqueueUpdate`。
   - 这个步骤**确保了即使多次调用 `setState`，组件也只会被安排一次更新**。

4. **检查 `isBatchingUpdates`**：(批量更新)
   - React 会检查是否正在批量更新（`isBatchingUpdates`）。批量更新是一种优化策略，它允许 React **将多个更新合并为一个更新周期**。
   - 如果当前正在进行批量更新，React 会将状态更新推迟到批量更新结束后。

5. **循环更新**：
   - 如果没有正在进行的批量更新，React 会开始一个更新循环。在这个循环中，React 会遍历所有标记为需要更新的组件（`dirtyComponents`）。
   - 对于每个组件，React 会执行 `componentWillUpdate`（如果存在）和 `render` 方法来生成新的虚拟 DOM。

6. **`componentDidUpdate`**：
   - 更新虚拟 DOM 后，React 会调用 `componentDidUpdate` 生命周期方法（如果存在），以便组件可以执行更新后的逻辑，如订阅或数据获取。

7. **更新真实 DOM**：
   - React 会使用新生成的虚拟 DOM 来更新真实 DOM。
   - 这个过程通过 `ReactDOM` 模块完成，它会调用 DOM API 执行必要的更新。
   
8. **完成更新**：
   - 一旦所有需要更新的组件都被处理，React 会将它们从 `dirtyComponents` 队列中移除，并标记为已更新。
   - 更新循环结束后，应用的状态会反映在用户界面上。

9. **返回入口**：
   - 更新完成后，React 会返回到入口点，等待下一次状态更新的触发。

这个过程是 React 优化性能的关键，它通过批量处理和异步更新来减少不必要的渲染和 DOM 操作，确保了应用的响应性和效率。通过使用 `setState` 和相关的生命周期方法，React 能够在组件状态变化时高效地更新 UI。





#### 模拟实现 useState

这个例子**没有使用 React**，但它让你了解 `useState` 在内部是如何工作的：([来自官网](https://react.docschina.org/learn/state-a-components-memory))

```js
let componentHooks = [];
let currentHookIndex = 0;

// useState 在 React 中是如何工作的（简化版）
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // 这不是第一次渲染
    // 所以 state pair 已经存在
    // 将其返回并为下一次 hook 的调用做准备
    currentHookIndex++;
    return pair;
  }

  // 这是我们第一次进行渲染
  // 所以新建一个 state pair 然后存储它
  pair = [initialState, setState];

  function setState(nextState) {
    // 当用户发起 state 的变更，
    // 把新的值放入 pair 中
    pair[0] = nextState;
    updateDOM();
  }

  // 存储这个 pair 用于将来的渲染
  // 并且为下一次 hook 的调用做准备
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // 每次调用 useState() 都会得到新的 pair
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  // 这个例子没有使用 React，所以
  // 返回一个对象而不是 JSX
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: `${sculpture.name} by ${sculpture.artist}`,
    counter: `${index + 1} of ${sculptureList.length}`,
    more: `${showMore ? 'Hide' : 'Show'} details`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // 在渲染组件之前
  // 重置当前 Hook 的下标
  currentHookIndex = 0;
  let output = Gallery();

  // 更新 DOM 以匹配输出结果
  // 这部分工作由 React 为你完成
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}];

// 使 UI 匹配当前 state
updateDOM();

```

从以上示例可以看到，**在React组件中多次调用同一个 state 的 setState 方法更新状态时，实际上状态只会更新最后一次**。

因为在 setState 内部实现逻辑为：

```js
  function setState(nextState) {
    // 当用户发起 state 的变更，
    // 把新的值放入 pair 中
    pair[0] = nextState;
    updateDOM();
  }
```

每次调用 setState 时候，会将传入的新的 state 更新到同一个变量 `pair[0]` 中，`pair[0]` 为 useState 返回数组第一个下标值。因此也可以解释为什么 state 是异步更新的。

以 useState 为例，分析 React Hooks 的调用链路：

* 首次渲染调用链路：mountState(首次渲染)构建链表并渲染。

<img src="../images/image-20240418200215161.png" alt="image-20240418200215161" style="zoom:50%;" />

* 更新渲染调用链路：updateState 依次遍历链表并渲染

<img src="../images/image-20240418200409296.png" alt="image-20240418200409296" style="zoom: 50%;" />

通过以上分析：hooks 的渲染是通过“依次遍历”来定位每个hooks 内容的。如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的。



#### 实现 `useState`  

实现一个简化版本的 `useState` 需要考虑几个关键点：

1. **状态存储**：我们需要一个全局的地方来存储状态。
2. **状态更新**：更新状态时需要能够触发组件的重新渲染。
3. **顺序依赖**：确保 `useState` 的调用顺序在每次渲染中保持一致。

下面是一个简化版本的 `useState` 实现：

```javascript
// 假设有一个全局的 state 列表  
let stateList = [];  
let index = 0;  
  
// 简化版的 useState  
function useState(initialState) {  
  // 初始化状态  
  if (index >= stateList.length) {  
    stateList[index] = initialState;  
  }  
  
  // 获取当前状态  
  const currentState = stateList[index];  
  
  // 更新状态的函数  
  function setState(newState) {  
    // 更新状态值  
    stateList[index] = newState;  
    // 触发重新渲染（这里简化处理，实际 React 中会复杂得多）  
    renderComponent();  
  }  
  
  // 递增索引，为下一次 useState 调用做准备  
  index++;  
  
  // 返回当前状态和更新函数  
  return [currentState, setState];  
}  
  
// 假设的组件渲染函数  
function renderComponent() {  
  // 清空索引，为下一次渲染做准备  
  index = 0;  
  // 假设的组件函数  
  function MyComponent() {  
    const [count, setCount] = useState(0);  
    return (  
      <div>  
        <p>Count: {count}</p>  
        <button onClick={() => setCount(count + 1)}>Increment</button>  
      </div>  
    );  
  }  
  
  // 这里只是简单地打印组件的“渲染结果”，实际 React 中会进行 DOM 操作  
  console.log(MyComponent());  
}  
  
// 初始渲染  
renderComponent();
```

**解释**：

- `stateList` 是一个全局数组，用于存储每个状态的值。在每次组件渲染时，这个数组会被清空并重新填充。
- `index` 是一个全局变量，用于跟踪当前 `useState` 调用的位置。每次调用 `useState` 时，`index` 都会递增，确保我们可以从 `stateList` 中获取正确的状态值。
- `useState` 函数接受一个初始状态值，并在第一次调用时将其存储在 `stateList` 的相应位置。然后，它返回当前状态值和一个更新状态的函数 `setState`。
- `setState` 函数接受一个新状态值，更新 `stateList` 中的对应项，并假设性地调用一个 `renderComponent` 函数来触发组件的重新渲染。在实际 React 中，重新渲染的过程会涉及更多的复杂性和优化。
- `renderComponent` 函数模拟了组件的渲染过程。它首先重置 `index` 为 0，然后定义并“渲染”一个使用 `useState` 的组件。这里简单地打印了组件的“渲染结果”，但在真实的 React 中，这会涉及实际的 DOM 操作。

请注意，这个简化版本的 `useState` 和实际的 React `useState` 有很大的不同。实际的 React 实现涉及更多的内部机制，比如 Fiber 架构、调度和协调、优先级处理、以及复杂的状态更新逻辑等。此外，实际的 React 还处理了并发模式、错误边界、Suspense 等高级特性。这个简化版本只是为了帮助你理解 `useState` 的基本原理。



### **state 与 变量区别**

1. 组件的`state`变化时会触发组件的重新渲染，变量不会触发组件的重新渲染。
2. 每次组件渲染时，`state` 会根据下次值状态进行渲染，而变量每次将重新定义。
   * `state `**持久性**：`state`的值在组件的多个渲染之间保持持久。即使组件重新渲染，`state`的值也会被保留，除非通过特定的setter函数进行更新。
   * **变量重新定义**：每次组件函数被调用（即每次组件渲染）时，组件变量的定义都会执行。这意味着每次渲染时，变量都会被“重新定义”。但这并不意味着变量的值会重置；如果变量是一个引用类型（如对象或数组），则每次渲染时都会创建新的引用，但引用指向的内容保持不变，除非被重新赋值。

| 对比项         | 组件的`state`                                                | 组件变量                                                     |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **定义与存储** | 使用React的特定方法（如`this.state`或`useState`）定义，用于存储组件内部状态 | 在组件内部直接定义，可以是普通变量或常量                     |
| **生命周期**   | 与组件实例相关联，会随着组件的挂载、更新和卸载而经历相应的生命周期 | 与组件实例相关联，但变化不会触发组件重新渲染                 |
| **更新机制**   | 需要使用React提供的特定方法（如`this.setState`或`setState`函数）来更新 | **直接赋值更新**，无需特殊方法                               |
| **触发渲染**   | **当`state`发生变化时，会触发组件的重新渲染**                | **组件变量的变化不会触发组件的重新渲染**                     |
| **持久性**     | 组件重新渲染，`state`的值也会被保留，除非通过特定的setter函数进行更新。 | 每次组件函数被调用（即每次组件渲染）时，组件变量的定义都会执行。 |
| **用途**       | 存储那些需要随着用户交互或组件生命周期变化而变化的数据，以触发组件重新渲染 | 存储不需要触发组件重新渲染的数据，或用于组件内部的临时计算   |
| **示例**       | `const [count, setCount] = useState(0); setCount(1);`        | `const myVariable = 'Hello';`                                |



### setState 调用顺序

setState 的表现会因调用场景的不同而不同:

* 在 React 钩子函数及合成事件中，它表现为异步；

* 在setTimeout、setlnterval等函数中包括在 DOM 原生事件中，它都表现为同步；

  > **原因**：
  >
  > 1. **上下文不同**：在 `setTimeout`、`setInterval` 或 DOM 原生事件（如 `click`、`mousedown` 等）的回调函数中，React 不再控制执行上下文。这些函数或事件是在浏览器的事件循环中独立执行的，与 React 的事件处理或渲染循环没有直接关系。
  > 2. **即时响应**：在这些场景中，你通常期望代码能够立即执行并产生效果。因此，当在这些环境中调用 `setState` 时，React 会立即触发组件的重渲染，以确保状态能够立即反映到 UI 上。





---

## **Effect**

Effect是一种用于处理副作用操作的机制（副作用操作是指与组件渲染无关的任务，比如数据获取、订阅事件、手动修改DOM等）。

**Effect能够在组件被挂载、更新或卸载时执行**。

使用Effect的目的是为了将副作用操作与组件逻辑分离，并确保这些操作在正确的时间点被执行。这样可以避免产生bug、提高代码可读性和维护性。

**摘要**

- 与事件不同，Effect 是由渲染本身，而非特定交互引起的。
- Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
- 默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
- 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect。
- 不能随意选择依赖项，它们是由 Effect 内部的代码决定的。
- 空的依赖数组（`[]`）对应于组件“挂载”，即添加到屏幕上。
- 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
- 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数。
- React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数。

### 编写 Effect 

**为什么需要 useEffect?**

使用函数式组件缺少对生命周期的管理控制，useEffect 则在一定程度上弥补了函数式组件生命周期的缺席。

**useEffect 能够为函数组件引入副作用**：过去习惯放在componentDidMount、componentDidUpdate 和componentWillUnmount 三个生命周期里来做的事现在可以放在 useEffect 里来做。



**编写 Effect**

> 官方文档详细解释了编写 Effect 流程：[使用 Effect 同步 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/synchronizing-with-effects#)

编写 Effect 需要遵循以下三个规则：

1. **声明 Effect**:
   * 默认情况下，**Effect 会在每次渲染后都会执行**。
2. **指定 Effect 依赖**:
   * 大多数 Effect 应该按需执行，而不是在每次渲染后都执行。
   * 依赖状态变化时，执行Effect回调
   * 空数组表示这个Effect只在组件挂载和卸载时执行。
3. **添加清理（cleanup）函数**:
   * 每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数

```js
useEffect(() => { // 第一个参数为回调函数，在DOM挂载和依赖状态变化时执行
	return () => {} // 清理函数：每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数
}, []); //依赖状态变化时，执行回调；空数组表示这个Effect只在组件挂载和卸载时执行
```

> `useEffect` ：
>
> 第一个参数：为回调函数，在每次渲染后都会执行：
>
> 第二个参数：为依赖状态
>
> * 依赖状态变化时，执行回调
> * 空数组表示这个Effect只在组件挂载和卸载时执行回调



```jsx
import React, { useEffect } from 'react';
function ExampleComponent() {  
  useEffect(() => {  
    // 这是一个Effect，它会在组件挂载后执行  
    // 如果需要在组件卸载时执行清理操作，可以返回一个函数  
    return () => {  
      console.log('Component will unmount');  
      // 清理操作，如取消订阅事件、清除计时器等  
    };  
  }, []); // 空数组表示这个Effect只在组件挂载和卸载时执行  
  
  return (  
    <div>  
      <p>测试</p>  
    </div>  
  );  
}
```



下面是一个基本的`useEffect`的使用示例：

```jsx
import React, { useEffect, useState } from 'react';  
  
function ExampleComponent() {  
  const [count, setCount] = useState(0);  
  
  useEffect(() => {  
    // 这是一个Effect，它会在组件挂载后执行  
    console.log('Component mounted');  
  
    // 模拟异步数据获取  
    const fetchData = async () => {  
      const response = await fetch('https://api.example.com/data');  
      const data = await response.json();  
      // 更新状态或执行其他操作  
      setCount(data.count);  
    };  
  
    fetchData();  
  
    // 如果需要在组件卸载时执行清理操作，可以返回一个函数  
    return () => {  
      console.log('Component will unmount');  
      // 清理操作，如取消订阅事件、清除计时器等  
    };  
  }, []); // 空数组表示这个Effect只在组件挂载和卸载时执行  
  
  return (  
    <div>  
      <p>Count: {count}</p>  
    </div>  
  );  
}
```

在这个例子中，`useEffect`的回调函数会在组件挂载后立即执行。它模拟了一个异步数据获取的操作，并在数据到达后更新了组件的状态。

`useEffect`的第二个参数是一个依赖数组。在这个例子中，依赖数组是空的（`[]`），这意味着Effect只在组件首次渲染（挂载）和卸载时执行。如果依赖数组中包含某些值，那么当这些值发生变化时，Effect也会重新执行。

例如，如果你想要Effect在`count`状态改变时重新执行，你可以这样写：

```jsx
useEffect(() => {  
  console.log(`Count changed to ${count}`);  
}, [count]); // 当count变化时，这个Effect会重新执行
```

在编写Effect时，要注意避免在Effect中直接修改状态或执行可能导致无限循环的操作，除非你有明确的逻辑来控制这些操作。同时，如果你订阅了外部数据源（如事件或定时器），记得在Effect的清理函数中取消订阅，以避免内存泄漏。

### **响应式 Effect 的生命周期**

> 详细示例解释：[响应式 Effect 的生命周期 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/lifecycle-of-reactive-effects)

每个 React 组件都经历相同的生命周期：

- 当组件被添加到屏幕上时，它会进行组件的 **挂载**。
- 当组件接收到新的 props 或 state 时，通常是作为对交互的响应，它会进行组件的 **更新**。
- 当组件从屏幕上移除时，它会进行组件的 **卸载**。

每个 Effect 与周围组件有着独立的生命周期，每个 Effect 描述了一个独立的同步过程，可以 **开始** 和 **停止**：

1. **挂载阶段 (Mounting)：**
   - **当组件首次渲染到 DOM 时，`useEffect` 中的回调函数会被执行**。这是 Effect 的“挂载”阶段。
     - 如果 `useEffect` 的依赖数组为空（`[]`），则 Effect 只会在组件首次渲染时执行一次。
     - 如果 `useEffect` 有依赖项，则当这些依赖项的值发生变化时，Effect 会重新执行。
2. **更新阶段 (Updating):**
   - **当组件的 props 或 state 发生变化导致组件重新渲染时，`useEffect` 会再次检查其依赖项**。
     - 如果依赖项的值没有变化，则 Effect 不会重新执行。
     - 如果依赖项的值发生了变化，则 Effect 会重新执行。
   - 每一次**组件更新后，`useEffect` 中的回调函数都会被重新安排到微任务队列中**，等待当前同步代码执行完毕后执行。
3. **卸载阶段 (Unmounting)**
   - 当组件从 DOM 中卸载时（例如，由于父组件的条件渲染或路由切换），`useEffect` 中的回调函数会再次执行，但此时会带有一个清理函数（cleanup function）。
   - 清理函数是 `useEffect` 回调函数中返回的那个函数，它会在组件卸载前执行，用于执行必要的清理操作，如取消事件监听、清除定时器或清除之前创建的资源等。

### **useEffect 用法**

**每一次渲染后都执行的副作用**: 传入回调函数，不传依赖数组

```js
useEffect(callBack)
```

**仅在挂载阶段执行一次的副作用**: 传入回调函数，且这个函数的返回值不是一个函数，同时传入一个空数组

```js
useEffect(()=>{
//这里是业务逻辑
},[])
```

**仅在挂载阶段和卸载阶段执行的副作用**: 传入回调函数，且这个函数的返回值是一个函数，同时传入一个空数组

```js
useEffect(()=>{
// 这里是A的业务逻辑
//返回一个函数记为 B
return ()=>{}
},[])
```

**每一次渲染都触发，且卸载阶段也会被触发的副作用**: 传入回调函数，且这个函数的返回值是一个函数，同时不传第二个参数

```js
useEffect(()=>{
//这里是 A的业务逻辑
// 返回一个函数记为 B
return ()=>{}
})
```

**根据一定的依赖条件来触发的副作用**: 传入回调函数，同时传入一个非空的数组

```js
useEffect(()=>{
//这是回调函数的业务逻辑
// 若 xxx 是一个函数，则 xxx 会在组件卸载时被触发
return xxx
},[numl,num2,num3])
```



## **Hooks**

### 本质

一套能够使函数组件更强大、更灵活的“钩子”

函数组件比起类组件“少”了很多东西，给函数组件的使用带来了非常多的局限性，引入 hooks 能够使函数组件更强大、更灵活。

### **特性**

在 React 中，**以 `use` 开头的函数——只能在组件或[自定义 Hook](https://react.docschina.org/learn/reusing-logic-with-custom-hooks) 的最顶层调用**，`useState` 以及任何其他以“`use`”开头的函数都被称为 **Hook**。

> 如何编写 Hooks 参考文档：[使用自定义 Hook 复用逻辑 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/reusing-logic-with-custom-hooks)

* 只能在组件的最顶层调用。

* **Hook 内部使用了 state，Effect 以及其他的 React 特性**。
* Hook 是特殊的函数，只在 React [渲染](https://react.docschina.org/learn/render-and-commit#step-1-trigger-a-render)时有效。**每次组件重新渲染时，所有的 Hook 会重新运行**。
* 自定义 Hook 共享的只是状态逻辑而不是状态本身。对 Hook 的每个调用完全独立于对同一个 Hook 的其他调用。

### **命名公约**

1. **React 组件名称必须以大写字母开头**，比如 `StatusBar` 和 `SaveButton`。React 组件还需要返回一些 React 能够显示的内容，比如一段 JSX。
2. **Hook 的名称必须以 `use` 开头，然后紧跟一个大写字母**，就像内置的 [`useState`](https://react.docschina.org/reference/react/useState) 或者本文早前的自定义 `useOnlineStatus` 一样。Hook 可以返回任意值。

如果你在组件内部看见 `getColor()` 函数调用，就可以确定它里面不可能包含 React state，因为它的名称没有以 `use` 开头。但是像 `useOnlineStatus()` 这样的函数调用就很可能包含对内部其他 Hook 的调用！

### **Hook使用注意的问题和原因**

在使用React的Hook时，需要注意以下几个问题和原因：

#### **只在函数组件的顶层调用Hook**

- 原因：React依靠Hook的调用顺序来正确管理组件的状态。如果Hook在循环、条件或嵌套函数中调用，React无法确定组件的状态，这可能会导致意外的行为、状态丢失或内存泄漏。
  - 这个规则的存在是为了确保 Hooks 的行为在 React 组件中是可预测和一致的


**示例：**

以下例子来解释为什么 Hooks 不能在条件语句中调用：

假设你有一个组件，该组件根据某个条件（例如，某个 prop 的值）决定是否使用 `useState` Hook：

```jsx
function ExampleComponent({ shouldUseState }) {  
  if (shouldUseState) {  
    const [count, setCount] = useState(0);  
  
    // ... 其他的逻辑  
  }  
  
  // ... 其他的组件逻辑  
  
  return (  
    <div>  
      {/* ... 渲染内容 */}  
    </div>  
  );  
}
```

> 在上面的例子中，`useState` 是在一个条件语句中调用的。但是，这种用法违反了 Hooks 的规则。
>
> 原因是 React 需要确保每次组件渲染时，Hooks 的调用顺序和数量都是相同的。如果在条件语句中调用 Hooks，那么 Hooks 的调用顺序和数量就会根据条件的不同而变化，这会导致不可预测的行为和可能的错误。
>
> 例如，如果 `shouldUseState` 在第一次渲染时为 `true`，在第二次渲染时为 `false`，那么在第二次渲染时，React 期望在第一次调用 `useState` 的位置再次调用一个 Hook。但是，由于条件语句的存在，那个位置并没有调用任何 Hook，这会导致错误。



正确的做法是**将所有的 Hooks 放在组件的顶层**，并且确保它们的调用顺序和数量在每次渲染时都是相同的。

如果需要根据条件来决定是否使用某个 Hook，你可以通过逻辑来控制 Hook 的返回值或如何使用它，而不是决定是否调用它。例如：

```jsx
function ExampleComponent({ shouldUseState }) {  
  const [count, setCount] = useState(shouldUseState ? 0 : undefined);  
  
  if (shouldUseState) {  
    // ... 只有在 shouldUseState 为 true 时才使用 count 和 setCount  
  }  
  
  // ... 其他的组件逻辑  
  
  return (  
    <div>  
      {/* ... 根据 shouldUseState 的值来渲染内容 */}  
    </div>  
  );  
}
```

在这个修正后的例子中，`useState` 始终在组件的顶层被调用，并且它的调用顺序和数量在每次渲染时都是相同的。然后，你可以通过 `shouldUseState` 的值来控制是否使用 `count` 和 `setCount`。





#### **不要在循环、条件或嵌套函数中调用Hook**

- 原因：同上，React需要确定Hook的调用顺序。在循环或条件语句中调用Hook，每次组件渲染时Hook的调用顺序可能会改变，这违反了React的规则。

#### **避免在自定义Hook中执行副作用操作**

- 原因：自定义Hook应该只包含逻辑代码，而不应该直接执行副作用操作（如设置订阅或修改DOM）。副作用操作应该放在组件中，并使用`useEffect` Hook来管理。

#### **确保Hook的依赖项正确**

- 对于`useEffect` Hook，需要明确指定依赖项数组。如果遗漏了某个依赖项，当该依赖项变化时，`useEffect`不会重新运行，可能导致状态不同步或逻辑错误。
- 原因：React使用依赖项数组来确定何时重新运行`useEffect`。如果依赖项未正确指定，React无法准确判断何时需要更新副作用。

#### **避免在渲染过程中直接修改状态**

- 原因：React的状态更新是异步的，并且在渲染过程中直接修改状态可能导致不可预测的行为。应该使用`setState`函数来更新状态。

#### **注意闭包问题**

- 在`useEffect`或事件处理函数中，如果引用了组件的state或props，可能会遇到闭包问题。这意味着，在函数执行时，它捕获的是当前的state或props值，而不是最新的值。
- 原因：JavaScript的闭包特性导致函数记住并访问其词法作用域，包括外部函数的变量和`this`值。在React中，这可能导致状态或属性值的延迟或错误使用。

#### **Hook命名约定**

- 自定义Hook应以“use”开头，这是一个约定，有助于其他开发者更容易地识别和理解你的代码。
- 原因：这是一个编码习惯和约定，有助于提高代码的可读性和可维护性。

正确使用Hook并遵循这些注意事项，可以帮助你编写更可靠、可预测和可维护的React组件。



### **为什么需要 React Hooks**

1. 告别难以理解的 Class
2. Hooks 解决业务逻辑难以拆分的问题：
   * 生命周期使逻辑与生命周期耦合在一起。
   * Hooks 能够帮助我们实现业务逻辑的聚合避免复杂的组件和冗余的代码
3. Hooks  使状态逻辑复用变得简单可行
4. 函数组件从设计思想上来看，更加契合 React 的理念

**告别难以理解的 Class**

类组件的两大痛点：

1. this 指向不明确问题
2. 生命周期管理

**this 指向不明确问题**

```react
class Example extends Component {
    state ={
        name:'sewen',
        age: '99'
    }

    changeAge() {
    // 这里会报错
        this.setState({
         age: '100'
        });
    }
    
    render() {
        return <button onClick={this.changeAge}>{this.state.name}的年龄是{this.state.age}</button>
    }
}
```

> 以上代码点击按钮时候，程序报错，报错原因是 `changeAge` 中 找不到 this，this 指向有问题：
>
> * 在 React 类组件中，如果你在构造函数中没有绑定事件处理函数，或者没有使用箭头函数来自动绑定 `this`，那么在事件触发时，`this` 指向的可能是 `undefined`，这会导致运行时错误.
>
> 为了解决这个问题，你可以在构造函数中绑定 `this.changeAge`：
>
> ```javascript
> constructor(props) {  
>     super(props);  
>     this.changeAge = this.changeAge.bind(this);  
> }
> ```
>
> 或者使用箭头函数在类中定义 `changeAge` 方法，这样 `this` 会自动绑定到组件实例上：
>
> ```javascript
> changeAge = () => {  
>     this.setState({  
>         age: '100'  
>     });  
> }
> ```

以上问题本质上都是在用实践层面的约束来解决设计层面的问题

**生命周期管理问题**

* 学习成本

* 不合理的逻辑规划方式： 逻辑与生命周期耦合在一起。


### 原理

Hooks 的正常运作，在底层依赖于顺序链表

**Hooks 的数据结构本质是链表**

---

## **事件**



**摘要**

- 事件通常在你的组件 **内部** 定义。事件处理函数在组件内部定义，所以它们可以访问 props。
- 名称以 `handle` 开头，后跟事件名称。
- 可以将事件处理函数作为 props 传递给组件。
- 事件处理函数 props 应该以 `on` 开头，后跟一个大写字母。
- 事件处理函数不需要是 [纯函数](https://react.docschina.org/learn/keeping-components-pure)，因此它是用来 *更改* 某些值的绝佳位置 。
- 事件冒泡与捕获：React 中的事件处理遵循与原生 DOM 事件相同的冒泡和捕获机制。你可以通过事件对象的 `stopPropagation` 和 `preventDefault` 方法来控制事件的行为。

> 详细内容参考：[响应事件 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/responding-to-events)

### **函数组件事件**

````react
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}

````

### **类组件事件**

在 React 的类组件中定义事件与函数组件略有不同，因为类组件有自己的实例方法和生命周期方法。

**在类组件中，你通常需要手动绑定事件处理器到组件实例**（使用 `.bind(this)`）:

**手动绑定 `this`**

```jsx
import React, { Component } from 'react';  
  
class MyButton extends Component {  
  constructor(props) {  
    super(props);  
  
    // 在构造函数中绑定 this 到 handleClick 方法  
    this.handleClick = this.handleClick.bind(this);  
  }  
  
  // 定义事件处理器方法  
  handleClick() {  
    alert('Button clicked!');  
  }  
  
  // 渲染组件并绑定事件  
  render() {  
    return (  
      <button onClick={this.handleClick}>  
        Click me  
      </button>  
    );  
  }  
}  
  
export default MyButton;
```

> 在这个例子中，`MyButton` 是一个类组件。我们在构造函数中调用了 `this.handleClick.bind(this)` 来确保 `handleClick` 方法中的 `this` 指向组件实例。然后，在 `render` 方法中，我们将 `handleClick` 方法作为 `onClick` prop 绑定到 `<button>` 元素上。

**箭头函数自动绑定 `this`**

另一种绑定事件处理器的方式是在方法定义时就使用箭头函数，这样可以自动绑定 `this`：

```jsx
import React, { Component } from 'react';  
  
class MyButton extends Component {  
  // 使用箭头函数定义事件处理器，自动绑定 this  
  handleClick = () => {  
    alert('Button clicked!');  
  }  
  
  render() {  
    return (  
      <button onClick={this.handleClick}>  
        Click me  
      </button>  
    );  
  }  
}  
  
export default MyButton;
```

> 使用箭头函数的好处是你可以在类的方法定义中直接使用它们，而无需在构造函数中进行额外的绑定。这有助于减少样板代码，并使代码更加简洁。
>
> 但是，请注意，这种方式可能会导致每个实例都创建一个新的函数，这可能会影响性能，特别是在渲染大量组件时。在大多数情况下，这种性能影响可以忽略不计，但如果你确实遇到了性能问题，那么你可能需要考虑使用其他方法，比如在构造函数中进行绑定。



### **合成事件**

`React`基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等；

在`React`中这套事件机制被称之为合成事件；

在将统一事件处理程序会将事件分发到具体的组件实例之前，React 会将原生 DOM 事件进行包装成 合成事件，可以通过 `e.nativeEvent` 属性获取DOM事件。

```tsx
//如果想要获得原生DOM事件，可以通过e.nativeEvent属性获取
const handleClick = (e) => console.log(e.nativeEvent);;
const button = <button onClick={handleClick}>按钮</button>
```



#### **为什么要用合成事件？**

合成事件在底层抹平了不同浏览器的差异，在上层面向开发者暴露统一的、稳定的、与 DOM 原生事件相同的事件接口。

在不同浏览器中使用同一套API以及一致的行为。

React根据W3C规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口。

#### **React 事件工作流**

React事件工作流是一个从事件绑定开始，经过事件传播和处理，最终利用合成事件对象完成事件响应的完整过程：

1. **事件绑定**：在React中，你可以使用类似HTML中的onClick、onMouseDown等属性来绑定事件处理程序。这些属性允许你在React组件上定义事件处理函数，当特定事件发生时，这些函数将被调用。
2. **事件传播**：在React组件中，当一个事件被触发时，该事件会沿着组件树向上或向下传播到其他组件。React使用了合成事件（SyntheticEvent）来处理事件传播。事件传播分为两个阶段：捕获阶段和冒泡阶段。在捕获阶段，事件从根组件向下传播到目标组件；在冒泡阶段，事件从目标组件向上冒泡到根组件。React中的事件传播遵循与原生DOM事件相似的机制，但有一些区别。
3. **事件处理**：React事件处理是通过将事件处理器绑定到组件上实现的。当事件触发时，会更新组件的内部状态，而内部状态的更新会触发组件的重绘。在React中，事件处理函数的命名采用驼峰命名法，响应事件的函数要以对象的形式赋值。
4. **合成事件对象**：React的合成事件对象提供了一致性接口，使开发者不需要关心不同浏览器之间的事件差异。这个对象包含了与事件相关的信息，并提供了方法来阻止事件的默认行为（event.preventDefault()）和停止事件冒泡（event.stopPropagation()）。

React通过事件代理来处理实际的DOM事件。这意味着React维护一个事件监听器，而不是在每个DOM元素上都添加监听器，以提高性能。

#### **合成事件和普通事件对比**

`React`事件和原生事件也非常的相似，但也有一定的区别：

- 事件名称命名方式不同

```jsx
// 原生事件绑定方式
<button onclick="handleClick()">按钮命名</button>
      
// React 合成事件绑定方式
const button = <button onClick={handleClick}>按钮命名</button>
```

- 事件处理函数书写不同

```jsx
// 原生事件 事件处理函数写法
<button onclick="handleClick()">按钮命名</button>
      
// React 合成事件 事件处理函数写法
const button = <button onClick={handleClick}>按钮命名</button>
```

#### **合成事件原理**

虽然`onclick`看似绑定到`DOM`元素上，但实际并不会把事件代理函数直接绑定到真实的节点上，而是把所有的事件绑定到结构的最外层 document 上，使用一个统一的事件去监听。

当事件在具体的 DOM 节点上被触发后最终都会冒泡到 **document 上**，document 上所绑定的统一事件处理程序会将事件分发到具体的组件实例。

这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；

当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升



#### **执行顺序**

**React 会先执行原生事件，然后处理 React 合成事件，最后执行document 上挂载的事件**:

当你在 React 组件中绑定一个事件处理函数时，这个处理函数实际上是在 React 的合成事件系统中注册的。

当原生事件被触发时，React 会捕获这个事件，并在内部创建一个合成事件对象。

然后，React 会调用你在组件中定义的事件处理函数，并将这个合成事件对象作为参数传递给它。

因此，**原生事件首先被触发**，然后 React 捕获这个事件并创建合成事件对象，最后调用你在组件中定义的事件处理函数。在这个处理函数中，你可以访问到合成事件对象，但也可以通过 `nativeEvent` 属性访问到原生的浏览器事件对象。

React 所有事件都挂载在 document 对象上，当真实 DOM 元素触发事件，会冒泡到 document 对象，先执行原生事件，再处理 React 事件，最后真正执行 document 上挂载的事件

对应过程如图所示：

![img](../images/08e22ff0-d870-11eb-ab90-d9ae814b240d.png)

```tsx
import  React  from 'react';
class App extends React.Component{

  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.childRef = React.createRef();
  }
  componentDidMount() {
    console.log("React componentDidMount！");
    this.parentRef.current?.addEventListener("click", () => {
      console.log("原生事件：父元素 DOM 事件监听！");
    });
    this.childRef.current?.addEventListener("click", () => {
      console.log("原生事件：子元素 DOM 事件监听！");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  }
  parentClickFun = () => {
    console.log("React 事件：父元素事件监听！");
  };
  childClickFun = () => {
    console.log("React 事件：子元素事件监听！");
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    );
  }
}
export default App;
```

输出顺序为：

```js
原生事件：子元素 DOM 事件监听！ 
原生事件：父元素 DOM 事件监听！ 
React 事件：子元素事件监听！ 
React 事件：父元素事件监听！ 
原生事件：document DOM 事件监听！ 
```

### **事件绑定**

在类组件中，事件中 `this` 的值将取决于调用上下文，而不是 事件定义的组件实例。

由于事件处理函数通常是由浏览器事件系统调用的，而不是由 React 或组件实例调用的，因此在 React 类组件中 `this` 通常将会是 `undefined`。

```tsx
class ShowAlert extends React.Component {
  showAlert() {
    //点击按钮，则会发现控制台输出undefined
    console.log("this ==",this);
  }

  render() {
    return <button onClick={this.showAlert}>show</button>;
  }
}
```

为解决 React 类组件 `this` 绑定问题，可以使用以下绑定方式：

- render 方法中使用 bind
- render 方法中使用箭头函数
- constructor 中 bind
- 定义阶段使用箭头函数绑定

#### render方法中使用 bind

如果使用一个类组件，在其中给某个组件/元素一个`onClick`属性，它现在并会自定绑定其`this`到当前组件，解决这个问题的方法是在事件函数后使用`.bind(this)`将`this`绑定到当前组件中

```jsx
class App extends React.Component {
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>test</div>
    )
  }
}
```

这种方式在组件每次`render`渲染的时候，都会重新进行`bind`的操作，影响性能

#### render方法中使用箭头函数

通过`ES6`的上下文来将`this`的指向绑定给当前组件，同样再每一次`render`的时候都会生成新的方法，影响性能

```jsx
class App extends React.Component {
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={e => this.handleClick(e)}>test</div>
    )
  }
}
```

#### constructor中bind

在`constructor`中预先`bind`当前组件，可以避免在`render`操作中重复绑定

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick}>test</div>
    )
  }
}
```

#### 定义阶段使用箭头函数绑定

跟上述方式三一样，能够避免在`render`操作中重复绑定，实现也非常的简单，如下：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    console.log('this > ', this);
  }
  render() {
    return (
      <div onClick={this.handleClick}>test</div>
    )
  }
}
```



## **Reducer**

**React中的reducer是一种特殊的函数，用于处理应用的状态变化**。

Reducer 接收一个旧的状态和一个动作对象，并返回一个新的状态。

**摘要：**

把 `useState` 转化为 `useReducer`：

1. 通过事件处理函数 dispatch actions；
2. 编写一个 reducer 函数，它接受传入的 state 和一个 action，并返回一个新的 state；
3. 使用 `useReducer` 替换 `useState`；

> 如何转化详细内容参考官网：[迁移状态逻辑至 Reducer 中 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/extracting-state-logic-into-a-reducer#)

**特点：**

1. 集中管理状态更新：reducer可以将组件的所有状态更新整合到一个外部函数中，使得状态管理更加集中和有序。
2. 响应动作：reducer通过接收动作对象来指明“用户刚刚做了什么”，根据动作类型来更新状态，使得状态的变化与用户的操作紧密关联。
3. 易于测试：reducer的逻辑相对独立，可以单独对它进行测试。可以针对特定的初始状态和动作，断言reducer返回的特定状态。

在编写reducer时，你需要遵循一定的规则和结构。以下是一个简单的reducer编写示例：

```javascript
// 状态的初始值
const initialState = {  
  count: 0  
};  
// reducer 函数：封装 action, action 对状态进行操作
function reducer(state = initialState, action) {  
  switch (action.type) {  
    case 'increment':  
      return { count: state.count + 1 };  
    case 'decrement':  
      return { count: state.count - 1 };  
    default:  
      return state;  
  }  
}
```

> 在这个示例中，我们首先定义了一个初始状态`initialState`，它包含了一个`count`属性，初始值为0。
>
> 然后，我们定义了一个名为`reducer`的函数，它接收两个参数：`state`和`action`。`state`是当前的状态，`action`是一个包含`type`属性的对象，用于描述要执行的操作。
>
> 在`reducer`函数中，我们使用一个`switch`语句来根据`action.type`的值执行不同的操作。
>
> 在这个示例中，我们定义了两个操作类型：`increment`和`decrement`，分别用于增加和减少`count`的值。如果`action.type`的值不是这两个之一，我们就返回当前的状态，不做任何改变。



最后，你可以在React组件中使用`useReducer`钩子来管理状态。例如：

```javascript
import React, { useReducer } from 'react';  
  
function Counter() {  
  const [state, dispatch] = useReducer(reducer, initialState);  
  
  return (  
    <div>  
      <p>Count: {state.count}</p>  
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>  
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>  
    </div>  
  );  
}
```

> 在这个组件中，我们使用`useReducer`钩子来创建一个状态和一个调度函数`dispatch`。
>
> 然后，我们在按钮的点击事件处理程序中调用`dispatch`函数，并传入一个包含`type`属性的对象来触发状态更新。这样，每当用户点击按钮时，就会通过reducer函数更新状态，并重新渲染组件。

---



## **Context**



**React中的Context提供了一种在组件之间共享数据的方法，无需通过组件树逐层显式地传递props，解决Prop逐级透传问题**。

它可以让你避免在多个层级间手动传递props，从而使你的代码更简洁且易于管理。

通过Context，你可以在整个组件树中访问共享的数据，如当前认证的用户、主题或首选语言等。

**摘要：**

- Context 使组件向其下方的整个树提供信息。
- 传递 Context 的方法:
  1. 通过 `export const MyContext = createContext(defaultValue)` 创建并导出 context。
  2. 在无论层级多深的任何子组件中，把 context 传递给 `useContext(MyContext)` Hook 来读取它。
  3. 在父组件中把 children 包在 `<MyContext.Provider value={...}>` 中来提供 context。
- Context 会穿过中间的任何组件。
- Context 可以让你写出 “较为通用” 的组件。
- 在使用 context 之前，先试试传递 props 或者将 JSX 作为 `children` 传递。

> 如何使用context参考官网：[使用 Context 深层传递参数 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/passing-data-deeply-with-context#)

> 在 Vue 中使用 provide` 和 `inject 来解决 Prop 逐级透传问题：[依赖注入 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling)

### **Context API 数据流**

<img src="../images/image-20240416094838507.png" alt="image-20240416094838507" style="zoom:50%;" />

对于**全局、不常修改的数据共享**，就比较适合用 Context API 来实现。

- 当前认证的用户
- 主题方案
- 首选语言

除了业务场景外，很多 React 相关的功能库也是使用 Context API 实现：

- [React Redux](https://github.com/reduxjs/react-redux)：`<Provider>` 组件，通过 Context 提供一个全局态的 `store`
- [React Router](https://github.com/ReactTraining/react-router)：路由组件，通过 Context 管理路由状态

**参考资料**

[Context - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/context/)





---



## **Ref**

`React` 中的 `Refs`提供了一种方式：允许我们访问 `DOM`节点或在 `render`方法中创建的 `React`元素。

本质为`ReactDOM.render()` 返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染`dom`则返回的是具体的`dom`节点

### **摘要**

- ref 是一种脱围机制，用于**保留不用于渲染的值**。 你不会经常需要它们。
- ref 是一个普通的 JavaScript 对象，具有一个名为 `current` 的属性，你可以对其进行读取或设置。
- 你可以通过调用 `useRef` Hook 来让 React 给你一个 ref。
- 与 state 一样，**ref 允许你在组件的重新渲染之间保留信息**。
- 与 state 不同，**设置 ref 的 `current` 值不会触发重新渲染**。
- 不要在渲染过程中读取或写入 `ref.current`。这使你的组件难以预测。

> ref详细解释参考官网：[使用 ref 引用值 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/referencing-values-with-refs#)

### **使用**

#### 传入字符串

在对应元素或组件中 `ref` 属性

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref="myRef" />;
  }
}
```

访问当前节点的方式如下：

```js
this.refs.myref.innerHTML = "hello";
```

#### 传入对象

`refs` 通过 `React.createRef()` 创建，然后将 `ref` 属性添加到`React`元素中，如下：

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

当 `ref` 被传递给 `render` 中的元素时，对该节点的引用可以在 `ref` 的 `current` 属性中访问

```js
const node = this.myRef.current;
```

#### 传入函数

当`ref`传入为一个函数的时候，在渲染过程中，回调函数参数会传入一个元素对象，然后通过实例将对象进行保存

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={element => this.myRef = element} />;
  }
}
```

获取`ref`对象只需要通过先前存储的对象即可

```js
const node = this.myRef 
```

#### 传入 HOOK

通过从 React 导入 `useRef` Hook 来为你的组件添加一个 ref：

```js
import { useRef } from 'react';
```

在你的组件内，调用 `useRef` Hook 并传入你想要引用的初始值作为唯一参数。例如，这里的 ref 引用的值是“0”：

```js
const ref = useRef(0);
```

`useRef` 返回一个这样的对象:

```js
{ 
  current: 0 // 你向 useRef 传入的值
}
```

你可以用 `ref.current` 属性访问该 ref 的当前值。

### **ref 和 state 的不同之处** 

| ref                                                         | state                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| `useRef(initialValue)`返回 `{ current: initialValue }`      | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`) |
| **更改时不会触发重新渲染**                                  | 更改时触发重新渲染。                                         |
| **可变** —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。 |
| 你不应在渲染期间读取（或写入） `current` 值。               | 你可以随时读取 state。但是，每次渲染都有自己不变的 state [快照](https://react.docschina.org/learn/state-as-a-snapshot)。 |

### **ref 和 DOM**



你可以将 ref 指向任何值。但是，ref 最常见的用法是访问 DOM 元素。

当你将 ref 传递给 JSX 中的 `ref` 属性时，比如 `<div ref={myRef}>`，React 会将相应的 DOM 元素放入 `myRef.current` 中。当元素从 DOM 中删除时，React 会将 `myRef.current` 更新为 `null`。

要访问由 React 管理的 DOM 节点，首先，引入 `useRef` Hook：

```jsx
import { useRef } from 'react';
```

然后，在你的组件中使用它声明一个 ref：

```jsx
const myRef = useRef(null);
```

最后，将 ref 作为 `ref` 属性值传递给想要获取的 DOM 节点的 JSX 标签：

```jsx
<div ref={myRef}>
```

### **React 何时添加 refs** 

在 React 中，每次更新都分为 [两个阶段](https://react.docschina.org/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)：

- 在 **渲染** 阶段， React 调用你的组件来确定屏幕上应该显示什么。
- 在 **提交** 阶段， **React 把变更应用于 DOM**。

在第一次渲染期间，DOM 节点尚未创建，因此 `ref.current` 将为 `null`。在渲染更新的过程中，DOM 节点还没有更新。所以读取它们还为时过早。

React 在提交阶段设置 `ref.current`。在更新 DOM 之前，React 将受影响的 `ref.current` 值设置为 `null`。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。



- Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
- 你通过传递 `<div ref={myRef}>` 指示 React 将 DOM 节点放入 `myRef.current`。
- 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
- 默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 `forwardRef` 并将第二个 `ref` 参数传递给特定节点来暴露 DOM 节点。
- 避免更改由 React 管理的 DOM 节点。



**参考资料**

[Refs - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/refs/)

[使用 ref 引用值 – React 中文文档 (docschina.org)](https://react.docschina.org/learn/referencing-values-with-refs)





----

## **Portals**

### createPortal

> 详细用法参考文档：[createPortal – React 中文文档 (docschina.org)](https://react.docschina.org/reference/react-dom/createPortal)

`createPortal` 允许你将 JSX 作为 children 渲染至 DOM 的不同部分。

```jsx
<div>
  <SomeComponent />
  {createPortal(children, domNode, key?)}
</div>
```

`createPortal(children, domNode, key?)` 

调用 `createPortal` 创建 portal，并传入 JSX 与实际渲染的目标 DOM 节点：

```jsx
import { createPortal } from 'react-dom';
// ...
<div>
  <p>这个子节点被放置在父节点 div 中。</p>
  {createPortal(
    <p>这个子节点被放置在 document body 中。</p>,
    document.body
  )}
</div>
```

**参考资料**

[Portals - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/portals)

---

## **核心API**

React的核心API主要包括用于创建组件、管理状态、处理生命周期以及处理用户输入等的函数和方法。

以下是一些主要的React核心API，以及它们的作用和用法：

|           API            |                             作用                             |                             用法                             |
| :----------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| `React.createElement()`  |                 创建并返回一个新的React元素                  |     `React.createElement(type, [props], [...children])`      |
|    `React.Component`     |               React组件的基类，用于创建类组件                |     `class MyComponent extends React.Component { ... }`      |
|        `render()`        |        类组件中必须的方法，用于返回要渲染的React元素         |       `render() { return <div>Hello, World!</div>; }`        |
|       `setState()`       |                    用于更新组件的局部状态                    |      `this.setState({ count: this.state.count + 1 });`       |
|  `componentDidMount()`   |   组件被挂载后立即调用，常用于发起网络请求、添加事件监听等   |            `componentDidMount() { fetchData(); }`            |
|  `componentDidUpdate()`  |         组件的props或state更新后调用，常用于DOM操作          |      `componentDidUpdate(prevProps, prevState) { ... }`      |
| `componentWillUnmount()` | 组件卸载及销毁之前直接调用，常用于清理操作，如取消网络请求、移除事件监听等 |   `componentWillUnmount() { clearTimeout(this.timerID); }`   |
|       `useState()`       |                 用于在函数组件中添加局部状态                 |           `const [count, setCount] = useState(0);`           |
|      `useEffect()`       | 用于在函数组件中执行副作用操作，如数据获取、订阅、手动更改DOM等 | `useEffect(() => { document.title = `You clicked ${count} times`; });` |
|      `useContext()`      | 接收一个context对象（由`React.createContext`返回）并返回该context的当前值 |          `const theme = useContext(ThemeContext);`           |
|      `useReducer()`      |      用于在函数组件中使用Redux风格的“reducer”来管理状态      | `const [state, dispatch] = useReducer(reducer, initialCount);` |
|     `useCallback()`      |                    返回一个记忆的回调函数                    | `const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);` |
|       `useMemo()`        |                       返回一个记忆的值                       | `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);` |
|        `useRef()`        | 返回一个可变的ref对象，其`.current`属性被初始化为传入的参数（`initialValue`） |               `const inputRef = useRef(null);`               |
|   `useLayoutEffect()`    | 其API与`useEffect`相同，但它会在所有的DOM变更之后同步调用effect |              `useLayoutEffect(() => { ... });`               |
|    `useDebugValue()`     |      用于在React Developer Tools中显示自定义hook的标签       |                   `useDebugValue(value);`                    |





## React Hooks

| 钩子名称                                                     | 描述                                                         | 引入版本   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| `useState`                                                   | 用于在函数组件中添加本地状态                                 | React 16.8 |
| `useEffect`                                                  | 用于在函数组件中执行副作用操作（如数据获取、订阅等）         | React 16.8 |
| `useContext`                                                 | 允许在函数组件中订阅React的Context，从而能够跨组件层级访问数据 | React 16.8 |
| `useRef`                                                     | 可以在组件的整个生命周期内保持对值的引用，常用于获取DOM元素  | React 16.8 |
| `useReducer`                                                 | 使用reducer函数来管理组件的本地状态，适用于复杂的状态逻辑    | React 16.8 |
| `useCallback`                                                | 返回一个记忆化的回调函数版本，该回调仅在依赖项改变时才会更新 | React 16.8 |
| [`useMemo`](https://zh-hans.react.dev/reference/react/useMemo) | 返回一个记忆化的值，该值仅在依赖项改变时才会重新计算         | React 16.8 |
| `useLayoutEffect`                                            | 在DOM更新完成后立即同步调用effect，但会在浏览器绘制之前执行  | React 16.8 |
| `useImperativeHandle`                                        | 自定义使用`ref`时暴露给父组件的实例值                        | React 16.8 |
| `useDebugValue`                                              | 在React Developer Tools中显示自定义Hook的标签                | React 16.8 |
| `useDeferredValue`                                           | 允许组件在渲染过程中延迟读取某些值，以提高性能               | React 18   |
| `useTransition`                                              | 允许你将状态更新标记为过渡，从而可以在更新时实现更平滑的UI   | React 18   |
| `useOpaqueIdentifier`                                        | 生成一个不透明的标识符，用于在组件间传递和比较，但避免直接操作 | React 18   |
| `useSyncExternalStore`                                       | 允许组件订阅外部数据源（如Redux store）并在数据变化时更新状态 | React 18   |



### [**useMemo**](https://zh-hans.react.dev/reference/react/useMemo)

> 详细参考文档：[useMemo – React 中文文档](https://zh-hans.react.dev/reference/react/useMemo)

`useMemo` 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。

```
const cachedValue = useMemo(calculateValue, dependencies)
```

**参数** 

- `calculateValue`：要缓存计算值的函数。
  - 它应该是一个没有任何参数的纯函数，并且可以返回任意类型。
  - React 将会在首次渲染时调用该函数；在之后的渲染中，如果 `dependencies` 没有发生变化，React 将直接返回相同值。
  - 否则，将会再次调用 `calculateValue` 并返回最新结果，然后缓存该结果以便下次重复使用。
- `dependencies`：
  - 所有在 `calculateValue` 函数中使用的响应式变量组成的数组。
  - 响应式变量包括 props、state 和所有你直接在组件中定义的变量和函数。

**返回值** 

* 在初次渲染时，`useMemo` 返回不带参数调用 `calculateValue` 的结果。
* 在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 `calculateValue`，并返回最新结果。
* **通过 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较所有依赖项是否发生变化**。



| 部分       | 详细                 | 描述                                                         |
| ---------- | -------------------- | ------------------------------------------------------------ |
| 功能       |                      | `useMemo` 是一个 React Hook，用于在**每次重新渲染时缓存计算结果**。 |
| 基本用法   |                      | 通过 `useMemo(calculateValue, dependencies)` 缓存计算结果，避免不必要的重新计算和组件重新渲染。 |
| 原理       |                      | 通过 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较所有依赖项是否发生变化 |
| 参数       |                      |                                                              |
| -          | `calculateValue`     | 要缓存计算值的函数，是一个纯函数，无参数，返回任意类型。     |
| -          | `dependencies`       | 包含 `calculateValue` 函数中使用的响应式变量数组。           |
| 返回值     |                      | 初次渲染时返回 `calculateValue` 的结果，后续渲染中，依赖项不变则返回缓存值，否则重新计算并缓存新结果。 |
| 注意事项   |                      |                                                              |
| -          | 使用位置             | 只能在组件顶层或自定义 Hook 中调用。                         |
| -          | 开发模式             | 严格模式下，计算函数可能被调用两次，以帮助发现错误。         |
| -          | 缓存丢弃             | 特定情况下 React 可能会丢弃缓存值，例如组件初始挂载期间被终止。 |
| 性能优化   |                      | 用于跳过代价昂贵的重新计算，提高组件性能。                   |
| 衡量开销   |                      | 使用 `console.time` 和 `console.timeEnd` 来测量计算过程的开销。 |
| 使用条件   |                      | 仅在计算明显慢且依赖关系很少改变时使用 `useMemo`。           |
| 避免滥用   |                      | 遵循一定原则，避免不必要的记忆化，提高代码可读性。           |
| 子组件优化 |                      | 使用 `useMemo` 帮助优化子组件的重新渲染性能。                |
| 记忆化函数 |                      | 使用 `useMemo` 记忆化函数，但通常使用 `useCallback` 更为方便。 |
| 故障排除   |                      |                                                              |
| -          | 计算函数运行两次     | 开发环境下，React 会调用计算函数两次来帮助发现错误。         |
| -          | 返回 `undefined`     | 确保正确使用对象字面量语法，避免返回 `undefined`。           |
| -          | 每次渲染都重新计算   | 确保传递正确的依赖项数组给 `useMemo`。                       |
| -          | 循环中调用 `useMemo` | 不要在循环中调用 `useMemo`，而是为每个列表项提取组件或使用 `memo`。 |

---



### [useCallback](https://zh-hans.react.dev/reference/react/useCallback)

`useCallback` 是一个允许你在多次渲染中**缓存函数**的 React Hook。

```
const cachedFn = useCallback(fn, dependencies)
```

**参数** 

- `fn`：想要缓存的函数。
  - 此函数可以接受任何参数并且返回任何值。
  - 在初次渲染时，React 将把函数返回给你（而不是调用它！）。
  - 当进行下一次渲染时，如果 `dependencies` 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。
  - 否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。
  - React 不会调用此函数，而是返回此函数。你可以自己决定何时调用以及是否调用。
- `dependencies`：有关是否更新 `fn` 的所有响应式值的一个列表。
  - 响应式值包括 props、state，和所有在你组件内部直接声明的变量和函数。
  - 如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将校验每一个正确指定为依赖的响应式值。
  - 依赖列表必须具有确切数量的项，并且必须像 `[dep1, dep2, dep3]` 这样编写。
  - **React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每一个依赖和它的之前的值**。

**返回值** 

* 在初次渲染时，`useCallback` 返回你已经传入的 `fn` 函数
* 在之后的渲染中, 如果依赖没有改变，`useCallback` 返回上一次渲染中缓存的 `fn` 函数；否则返回这一次渲染传入的 `fn`。

**注意** 

- `useCallback` 是一个 Hook，所以应该在 **组件的顶层** 或自定义 Hook 中调用。你不应在循环或者条件语句中调用它。如果你需要这样做，请新建一个组件，并将 state 移入其中。



| 部分     | 详细                | 描述                                                         |
| -------- | ------------------- | ------------------------------------------------------------ |
| 功能     |                     | `useCallback` 是一个 React Hook，用于在多次渲染中**缓存函数**。 |
| 基本用法 |                     | 通过 `useCallback(fn, dependencies)` 缓存函数，避免在组件重新渲染时不必要的函数重新创建。 |
| 参数     |                     |                                                              |
| -        | `fn`                | 需要缓存的函数，可以接收任何参数，返回任何值。               |
| -        | `dependencies`      | 一个包含所有响应式值的列表，用于判断是否需要更新 `fn`。      |
| 返回值   |                     | 初次渲染返回传入的 `fn` 函数，在后续渲染中，依赖未变则返回缓存的 `fn`，否则返回当前渲染的 `fn`。 |
| 注意事项 |                     |                                                              |
| -        | 使用位置            | 应在组件顶层或自定义 Hook 中调用，不在循环或条件语句中使用。 |
| -        | 缓存机制            | React 不会在没有特定理由的情况下丢弃缓存的函数。             |
| 用法     |                     |                                                              |
| -        | 跳过组件的重新渲染  | 通过缓存传递给子组件的函数来优化渲染性能。                   |
| -        | 更新 state          | 从记忆化回调中更新 state 时，尽量减少依赖项。                |
| -        | 防止频繁触发 Effect | 通过缓存 Effect 中使用的函数，避免不必要的 Effect 触发。     |
| -        | 优化自定义 Hook     | 自定义 Hook 返回的函数应使用 `useCallback` 进行包裹。        |
| 疑难解答 |                     |                                                              |
| -        | 返回不同函数        | 确保传递依赖数组给 `useCallback`。                           |
| -        | 循环中使用          | 不要在循环中调用 `useCallback`，应提取组件或使用 `memo`。    |

---



### **useMemo VS useCallback**

> 详细参考：[useCallback – React 中文文档](https://zh-hans.react.dev/reference/react/useCallback#how-is-usecallback-related-to-usememo)

#### 相同点

| 相同点           | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **Hooks 的使用** | 两者都是 React 的 Hook，用于优化组件性能。                   |
| **缓存机制**     | 都利用了记忆化来避免不必要的计算或渲染。                     |
| **依赖数组**     | 都接收一个依赖数组作为参数，以判断何时应该重新计算或更新。   |
| **顶层调用**     | 推荐在组件或自定义 Hook 的顶层调用，避免在循环或条件语句中使用。 |

#### 区别

- **[`useMemo`](https://zh-hans.react.dev/reference/react/useMemo) 缓存函数调用的结果**。
  - 在这里，它缓存了调用 `computeRequirements(product)` 的结果。
  - 除非 依赖项 发生改变，否则它将不会发生变化。
  - 这让你向下传递 计算结果 时而无需不必要地重新渲染 子组件。
  - 必要时，React 将会调用传入的函数重新计算结果。
- **`useCallback` 缓存函数本身**。
  - 不像 `useMemo`，它不会调用你传入的函数。相反，它缓存此函数。
  - 除非 依赖项 发生改变，缓存函数 自己将不会发生改变。
  - 这让你向下传递 缓存 函数而无需不必要地重新渲染 子组件。

| 区别             | `useMemo`                                                    | `useCallback`                                                |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **目的**         | **缓存计算结果**                                             | **缓存函数本身**                                             |
| **返回值**       | **返回计算函数的结果**                                       | **返回一个记忆化的函数**                                     |
| **使用场景**     | 当你需要缓存一个计算过程的结果，且该计算过程在组件渲染中代价较大时使用 | 当你希望避免在每次渲染时都创建一个新的函数实例，特别是作为子组件的 props 传递时 |
| **计算函数**     | 接受一个计算函数作为第一个参数，并在依赖项变化时重新执行该函数 | 不执行传入的函数，而是返回一个引用相等的函数                 |
| **记忆化内容**   | 记忆化计算结果，如果依赖项不变，则返回上一次的计算结果       | 记忆化函数引用，如果依赖项不变，则返回相同的函数引用         |
| **示例**         | `useMemo(() => expensiveCalculation(a, b), [a, b])`          | `useCallback(() => { doSomething(); }, [a, b])`              |
| **开发模式行为** | 在严格模式下，计算函数可能会被执行两次以帮助发现副作用       | 函数本身不会被执行，只是返回一个函数引用                     |
| **适用情况**     | 适用于计算结果的记忆化，例如数组过滤、对象转换等             | 适用于函数引用的记忆化，例如传递给子组件的回调函数           |
| **避免滥用**     | 避免在所有地方使用，只有在计算成本高且依赖项稳定时使用       | 避免在所有地方使用，只有在函数引用需要稳定时使用             |





----



## **参考资料**

[React Guidebook - 📚 React 知识图谱 关于概念、技巧、生态、前沿、源码核心 - React Guidebook (tsejx.github.io)](https://tsejx.github.io/react-guidebook/)

[React技术揭秘 (iamkasong.com)](https://react.iamkasong.com/#导学视频)

[React 官方中文文档 (docschina.org)](https://react.docschina.org/)
