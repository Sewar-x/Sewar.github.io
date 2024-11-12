---
star: start
order: 2
category:
  - Vue
tag:
  - Vue2
  - Vue2源码分析
---

# Vue2 API原理分析

## 全局API

### [Vue.extend(options)](https://cn.vuejs.org/v2/api/#Vue-extend)

#### **原理**

* 使用基础 Vue 构造器，创建一个“子类”。
* 其实就是扩展了基础构造器，形成了一个可复用的有指定选项功能的子构造器
* 使用 **`原型继承`** 的方式把一个纯对象转换一个继承于 Vue 的构造器 Sub 并返回，然后对 Sub 这个对象本身扩展了一些属性，如扩展 options、添加全局 API 等；并且对配置中的 props 和 computed 做了初始化工作；
* 最后对于这个 Sub 构造函数做了缓存，避免多次执行 Vue.extend 的时候对同一个子组件重复构造

#### **源码分析**

`Vue.extend` 函数的定义在 [src/core/global-api/extend.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/global-api/extend.js) 中。

```js
  /*
  参数是一个包含组件option的对象。  https://cn.vuejs.org/v2/api/#Vue-extend-options
  */
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {} //new Vue()时传入的组件对象
    /*父类的构造*/
    const Super = this //this指向Vue
    /*父类的cid，cid构造器唯一标识*/
    const SuperId = Super.cid
    /*cachedCtors用于缓存组件对象
    缓存组件对象目的：当该组件对象被多个组件引用时，该组件构造器逻辑只执行一次，下次再引用该组件时直接返回缓存中的构造器
    */
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    /*如果构造函数中已经存在了该组件cid，则代表已经该组件通过extend进行实例化了，直接返回*/
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    //获取组件名称
    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production') { //非生产环境下进行组件名称校验
      /*name只能包含字母与连字符*/
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        )
      }
    }

    /*
      Sub构造函数其实就一个_init方法，这跟Vue的构造方法是一致的，在_init中处理各种数据初始化、生命周期等。
      因为Sub作为一个Vue的扩展构造器，所以基础的功能还是需要保持一致，跟Vue构造器一样在构造函数中初始化_init。
    */
    const Sub = function VueComponent(options) {
      this._init(options)
    }
    /*继承父类，使用原型式继承，使子类构原型指向父类实例对象*/
    Sub.prototype = Object.create(Super.prototype)
    /*构造函数*/
    Sub.prototype.constructor = Sub
    /*创建一个新的cid*/
    Sub.cid = cid++
    /*将父组件的option与子组件的合并到一起(Vue有一个cid为0的基类，即Vue本身，会将一些默认初始化的option合并)*/
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    /*es6语法，super为父类构造*/
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    /*在扩展时，我们将计算属性以及props通过代理绑定在Vue实例上（也就是vm），这也避免了Object.defineProperty被每一个实例调用*/
    if (Sub.options.props) {
      /*初始化props，将option中的_props代理到vm上*/
      initProps(Sub)
    }
    if (Sub.options.computed) {
      /*处理计算属性，给计算属性设置defineProperty并绑定在vm上*/
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    /*加入extend、mixin以及use方法，允许将来继续为该组件提供扩展、混合或者插件*/
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    /*使得Sub也会拥有父类的私有选项（directives、filters、components）*/
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    /*把组件自身也加入components中，为递归自身提供可能（递归组件也会查找components是否存在当前组件，也就是自身）*/
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    /*保存一个父类的options，此后我们可以用来检测父类的options是否已经被更新*/
    Sub.superOptions = Super.options
    /*extendOptions存储起来*/
    Sub.extendOptions = extendOptions
    /*保存一份option，extend的作用是将Sub.options中的所有属性放入{}中*/
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    /*缓存构造函数（用cid），防止重复extend*/
    cachedCtors[SuperId] = Sub
    return Sub
  }
```



### [Vue.nextTick](https://cn.vuejs.org/v2/api/#Vue-nextTick)

#### [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)

* Vue 在更新 DOM 时是**异步**执行的：只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
* 如果同一个 watcher 被多次触发，只会被推入到队列中一次。
* 这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
* 然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

* vue 在异步更新数据时使用 nextTick 进行异步更新：参考 异步更新 一节


#### **实现原理**

* Vue 在内部对异步队列尝试使用原生的 **`Promise.then`、`MutationObserver` 和 `setImmediate`**，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

#### **应用**

* 数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick。这就是我们平时在开发的过程中，比如从服务端接口去获取数据的时候，数据做了修改，如果我们的某些方法去依赖了数据修改后的 DOM 变化，我们就必须在 `nextTick` 后执行。

  ```javascript
  getData(res).then(()=>{
    this.xxx = res.data
    this.$nextTick(() => {
      // 这里我们可以获取变化后的 DOM
    })
  })
  ```

  

#### **流程图**

![](../images/nextTick.png)

#### **源码分析**

* 在 Vue  源码 2.3.0 中，`nextTick` 定义在 [src/core/util/env.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/util/env.js)

  ```js
  /**
   * Defer a task to execute it asynchronously.
   */
   /*
      延迟一个任务使其异步执行，在下一个tick时执行，一个立即执行函数，返回一个function
      这个函数的作用是在task或者microtask中推入一个timerFunc，在当前调用栈执行完以后以此执行直到执行到timerFunc
      目的是延迟到当前调用栈执行完以后执行
  */
  export const nextTick = (function () {
    /*异步任务队列，存放异步执行的回调*/
    const callbacks = []
    /*一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送*/
    let pending = false
    /*一个函数指针，指向函数将被推送到任务队列中，等到主线程任务执行完时，任务队列中的timerFunc被调用*/
    let timerFunc
  
    /*下一个tick时的回调*/
    function nextTickHandler () {
      /*一个标记位，标记等待状态（即函数已经被推入任务队列或者主线程，已经在等待当前栈执行完毕去执行），这样就不需要在push多个回调到callbacks时将timerFunc多次推入任务队列或者主线程*/
      pending = false
      /*执行所有callback*/
      const copies = callbacks.slice(0)
      callbacks.length = 0
      for (let i = 0; i < copies.length; i++) {
        copies[i]()
      }
    }
  
    /*
      这里解释一下，一共有Promise、MutationObserver以及setTimeout三种尝试得到timerFunc的方法。
      优先使用Promise，在Promise不存在的情况下使用MutationObserver，这两个方法的回调函数都会在microtask中执行，它们会比setTimeout更早执行，所以优先使用。
      如果上述两种方法都不支持的环境则会使用setTimeout，在task尾部推入这个函数，等待调用执行。
      为啥要用 microtask？
      根据 HTML Standard，在每个 task 运行完以后，UI 都会重渲染，那么在 microtask 中就完成数据更新，
      当前 task 结束就可以得到最新的 UI 了。反之如果新建一个 task 来做数据更新，那么渲染就会进行两次。
      参考：https://www.zhihu.com/question/55364497/answer/144215284
    */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
      /*使用Promise*/
      var p = Promise.resolve()
      var logError = err => { console.error(err) }
      timerFunc = () => {
        p.then(nextTickHandler).catch(logError)
        // in problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microtask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microtask queue to be flushed by adding an empty timer.
        if (isIOS) setTimeout(noop)
      }
    } else if (typeof MutationObserver !== 'undefined' && (
      isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
      // use MutationObserver where native Promise is not available,
      // e.g. PhantomJS IE11, iOS7, Android 4.4
      /*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，
      在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），
      即textNode.data = String(counter)时便会加入该回调*/
      var counter = 1
      var observer = new MutationObserver(nextTickHandler)
      var textNode = document.createTextNode(String(counter))
      observer.observe(textNode, {
        characterData: true
      })
      timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
      }
    } else {
      // fallback to setTimeout
      /* istanbul ignore next */
      /*使用setTimeout将回调推入任务队列尾部*/
      timerFunc = () => {
        setTimeout(nextTickHandler, 0)
      }
    }
  
    /*
      推送到队列中下一个tick时执行
      cb 回调函数
      ctx 上下文
    */
    return function queueNextTick (cb?: Function, ctx?: Object) {
      let _resolve
      /*cb存到callbacks中*/
      callbacks.push(() => {
        if (cb) {
          try {
            cb.call(ctx)
          } catch (e) {
            handleError(e, ctx, 'nextTick')
          }
        } else if (_resolve) {
          _resolve(ctx)
        }
      })
      if (!pending) {
        pending = true
        timerFunc()
      }
      if (!cb && typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          _resolve = resolve
        })
      }
    }
  })()
  ```

  

* 在 Vue 源码 2.5+ 后，`nextTick` 的实现单独有一个 JS 文件来维护它。在 [src/core/util/next-tick.js](https://github.com/vuejs/vue/blob/2.6/src/core/util/next-tick.js) 中：

  * `next-tick.js` 申明了 `microTimerFunc` 和 `macroTimerFunc` 2 个变量，它们分别对应的是 micro task 的函数和 macro task 的函数。对于 macro task 的实现，优先检测是否支持原生 `setImmediate`，这是一个高版本 IE 和 Edge 才支持的特性，不支持的话再去检测是否支持原生的 `MessageChannel`，如果也不支持的话就会降级为 `setTimeout 0`；而对于 micro task 的实现，则检测浏览器是否原生支持 Promise，不支持的话直接指向 macro task 的实现。

  

### [Vue.set ](https://cn.vuejs.org/v2/api/#Vue-set)

#### **为什么要引入 `Vue.set` ?**

* **解决数组和对象检测更新问题。**

* 对于使用 `Object.defineProperty` 实现响应式的对象，当我们去给这个对象添加一个新的属性的时候，是不能够触发它的 setter 的，比如：

  ```js
  var vm = new Vue({
    data:{
      a:1
    }
  })
  // vm.b 是非响应的
  vm.b = 2
  ```

  但是添加对象新属性的场景我们在平时开发中会经常遇到，那么 Vue 为了解决这个问题，定义了一个全局 API `Vue.set` 方法

#### **原理**

* 如果目标是数组：使用 vue 实现的变异方法 **splice 实现响应式**；
* 如果目标是对象：判断属性存在,即为响应式,直接赋值；
* 如果 target 本身就不是响应式,直接赋值并返回；
* 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理；
* 最后**手动的触发依赖通知**（这就是为什么执行 `Vue.set` 的时候可以让添加新的属性到对象也可以检测到变化）

#### **源码分析**

* 初始化set过程: 在 [vue](https://github.com/vuejs/vue)/[src](https://github.com/vuejs/vue/tree/dev/src)/[core](https://github.com/vuejs/vue/tree/dev/src/core)/[instance](https://github.com/vuejs/vue/tree/dev/src/core/instance)/[index.js](https://github.com/vuejs/vue/blob/dev/src/core/instance/index.js) 中，在 new Vue() 前 stateMixin(Vue) 中  `Vue.prototype.$set = set`。

* set 源码： 定义在 [vue/src/core/observer/index.js]((https://github.com/vuejs/vue/blob/v2.3.0/src/core/observer/index.js))

  ```javascript
  export function set (target: Array<any> | Object, key: any, val: any): any {
    // set用于设置Array/Object, 如果 set 函数的第一个参数是 undefined 或 null 或者是原始类型值，那么在非生产环境下会打   //印警告信息
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPrimitive(target))
    ) {
      warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      // 修改数组的长度, 避免 索引 > 数组长度 导致splcie()执行有误
      target.length = Math.max(target.length, key)
      // 利用数组的 splice 变异方法触发响应式
      target.splice(key, 1, val)
      return val
    }
    // target为对象, key在target或者target.prototype上
    // 同时必须不能在 Object.prototype 上 issue: https://github.com/vuejs/vue/issues/6845
    if (key in target && !(key in Object.prototype)) {
      target[key] = val
      return val
    }
    // 给target创建一个新的属性,获取Observer实例(data的__ob__属性保存数据对应的观察者对象,Observe类中定义_ob_)
    const ob = (target: any).__ob__
    // Vue 实例对象拥有 _isVue 属性,一个防止vm实例自身被观察的标志位
    // 也不允许Vue.set/$set 函数为根数据对象(vm.$data)添加属性
    //当vue已经被Observer了,并且是根数据对象, vmCount才大于零
    if (target._isVue || (ob && ob.vmCount)) {
      process.env.NODE_ENV !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      )
      return val
    }
    // target本身就不是响应式数据, 直接赋值
    if (!ob) {
      target[key] = val
      return val
    }
    // 进行响应式处理
    defineReactive(ob.value, key, val)
    ob.dep.notify() //手动的触发依赖通知
    return val
  }
  ```

  

#### **应用**

* 错误示例：
* 先给对象添加属性，后使用Vue.set定义响应式内容![](../images/vue.set_err.png)
  * 错误原因: 直接给对象添加 replayList 属性时, 该属性不是响应式，并且不能触发视图更新，当后面使用 Vue.set 添加 replayList[0] 时，replayList[0] 式响应式,但 replayList 依然不是响应式对象,所以依然无法触发视图更新
  * 更正：
    * 方式1：给对象添加 replayList 响应式属性后再添加数据![](../images/fe57f01feb56c361931bbc6825085f3.png)
    * 方式2：直接给对象添加响应式属性数据 ![](../images/1b3384d6a9799879571ed3dc66edb5f.png)



### [Vue.use( plugin )](https://cn.vuejs.org/v2/api/#Vue-use)

#### **作用**

- **参数**：
  - `{Object | Function} plugin`

- **用法**：
  * 安装 Vue.js 插件。
    * **如果插件是一个对象，必须提供 `install` 方法**。
    * **如果插件是一个函数，它会被作为 install 方法**。

  * **install 方法调用时，会将 Vue 作为参数传入**。
    * 插件中传入 Vue 原因：作为 Vue 的插件对 `Vue` 对象是有依赖的，但又不能去单独去 `import Vue`，因为那样会增加包体积，所以就通过这种方式拿到 `Vue` 对象。
  * **该方法在调用 `new Vue()` 之前被调用**。

  * **当 install 方法被同一个插件多次调用，插件将只会被安装一次。**


#### **原理**

- **维护了一个 `_installedPlugins` 缓存数组，它存储所有注册过的 `plugin`；**
- 先在缓存查找  `plugin`，找到直接返回； 
- 否则，判断 `plugin` 有没有定义 `install` 方法，如果有的话则调用该方法，并且该方法执行的第一个参数是 `Vue`；
- 最后把 `plugin` 存储到 `installedPlugins` 中；

#### **源码分析**

- 源码：定义在 [vue/src/core/global-api/use.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/global-api/use.js)中。

  ```javascript
  /*初始化use*/
  export function initUse (Vue: GlobalAPI) {
    /*https://cn.vuejs.org/v2/api/#Vue-use*/
    Vue.use = function (plugin: Function | Object) {
      /* istanbul ignore if */
      /*标识位检测该插件是否已经被安装*/
      if (plugin.installed) {
        return
      }
      // additional parameters
      const args = toArray(arguments, 1)
      /*a*/
      args.unshift(this)
      if (typeof plugin.install === 'function') {
        /*install执行插件安装*/
        plugin.install.apply(plugin, args)
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args)
      }
      plugin.installed = true
      return this
    }
  }
  ```

- 调用时机：引入`import Vue from vue` -> `initGlobalAPI(Vue)` -> ` initUse(Vue)`

- **参考**：[插件](https://cn.vuejs.org/v2/guide/plugins.html)



### [Vue.mixin( mixin )](https://cn.vuejs.org/v2/api/#Vue-mixin)

#### **作用**

- **参数**：
  - `{Object} mixin`

- **用法**：
  * 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。
  * 插件作者可以使用混入，向组件注入自定义的行为。**不推荐在应用代码中使用**。


#### **原理**

把 mixin 的对象通过 `mergeOption` 合并到 `Vue` 实例的 `options` 中。

由于每个组件的构造函数都会在 `extend` 阶段合并 `Vue.options` 到组件自身的 `options` 中，所以也就相当于每个组件都继承了 `mixin` 定义的选项。

#### **源码分析**

- 源码：定义在 [src/core/global-api/mixin.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/global-api/mixin.js)

  ```javascript
  /*初始化mixin*/
  export function initMixin (Vue: GlobalAPI) {
      /*https://cn.vuejs.org/v2/api/#Vue-mixin*/
    Vue.mixin = function (mixin: Object) {
      /*mergeOptions合并optiuons*/
      this.options = mergeOptions(this.options, mixin)
    }
  }
  ```

- 执行时机： 定义 Vue 构造函数 -> `initMixin(Vue)` -> `new Vue()`

- 优点：mixin可以根据逻辑关注点进行组织代码，复用组件代码。

- 缺点：

  - `mixins` 带来了隐式依赖
  - `mixins` 与 `mixins` 之间，`mixins` 与组件之间容易导致命名冲突
  - 由于 `mixins` 是侵入式的，它改变了原组件，所以修改 `mixins` 等于修改原组件，随着需求的增长 `mixins` 将变得复杂，导致滚雪球的复杂性。

- **参考**：[全局混入](https://cn.vuejs.org/v2/guide/mixins.html#全局混入)

#### [选项合并策略](https://cn.vuejs.org/v2/guide/mixins.html#自定义选项合并策略)

**混入基础：**

* [混入](https://cn.vuejs.org/v2/guide/mixins.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5)(mixin) : 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。

* 混入 API：[Vue.mixin( mixin )](https://cn.vuejs.org/v2/api/#Vue-mixin)

* 一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

* 默认混入(合并)策略：

  * 数据对象 data： 进行递归合并，并在发生冲突时以组件数据优先 ；
  * 值为对象的选项（例如 `methods`、`components` 和 `directives`）：合并为同一个对象。两个对象键名冲突时，取组件对象的键值对；
  * 钩子函数： 合并为一个数组，因此都将被调用，调用顺序：混入对象的钩子 -> 组件自身钩子;

* 混入类型：

  * 全局混入：一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。
  * 局部混入：使用 minxis 属性添加对象。

* Vue 中提供自定义选项合并策略API:

  * [Vue.config.optionMergeStrategies](https://cn.vuejs.org/v2/api/#optionMergeStrategies) 添加一个函数：

    ```js
    Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
      // 返回合并后的值
    }
    ```



#### **选项合并策略分析**

* 混入即使用 vue 的默认选项合并策略。

* 对于 `options` 的合并有 2 个过程：

  * 外部初始化 Vue 通过 `mergeOptions` 合并选项；

* 子组件初始化过程通过 `initInternalComponent` 过程中通过 `mergeOptions` 合并选项 ；

* 选项合并结果：合并后 vue实例 vm.$options 的值最终包含：vue默认option、用户传入 option、 组件实例 option。

* 选项合并流程：

  ![](../images/选项合并流程.png)

  

* 合并流程分析：

  * 为了更直观，我们可以举个简单的示例：

    ```js
    import Vue from 'vue'
    
    let childComp = {
      template: '<div>{{msg}}</div>',
      created() {
        console.log('child created')
      },
      mounted() {
        console.log('child mounted')
      },
      data() {
        return {
          msg: 'Hello Vue'
        }
      }
    }
    
    Vue.mixin({
      created() {
        console.log('parent created')
      }
    })
    
    let app = new Vue({
      el: '#app',
      render: h => h(childComp)
    })
    ```

  * **外部调用合并过程：**

    * 外部引入 Vue 实例时，在 `initGlobalAPI(Vue)` 的时候初始化 Vue 实例默认 option。代码[src/core/global-api/index.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/global-api/index.js) 

      ```js
      //在 Vue 上扩展的一些全局方法的定义
      export function initGlobalAPI(Vue: GlobalAPI) {
        // config
        const configDef = {}
        configDef.get = () => config
        if (process.env.NODE_ENV !== 'production') {
          configDef.set = () => {
            warn(
              'Do not replace the Vue.config object, set individual fields instead.'
            )
          }
        }
        Object.defineProperty(Vue, 'config', configDef)
      
        // exposed util methods.
        // NOTE: these are not considered part of the public API - avoid relying on
        // them unless you are aware of the risk.
        Vue.util = {
          warn,
          extend,
          mergeOptions,
          defineReactive
        }
      
        Vue.set = set
        Vue.delete = del
        Vue.nextTick = nextTick
      
        Vue.options = Object.create(null)
        /** 
        `ASSET_TYPES` 的定义在 `src/shared/constants.js` 中：
         ASSET_TYPES = [
            'component',
            'directive',
            'filter'
          ]
          遍历结果为
          Vue.options.components = {}
          Vue.options.directives = {}
          Vue.options.filters = {}
        */
        ASSET_TYPES.forEach(type => {
          Vue.options[type + 's'] = Object.create(null)
        })
      
        // this is used to identify the "base" constructor to extend all plain-object
        // components with in Weex's multi-instance scenarios.
        /*_base被用来标识基本构造函数（也就是Vue），以便在多场景下添加组件扩展*/
        Vue.options._base = Vue
        /* 把一些内置组件扩展到 Vue.options.components*/
        extend(Vue.options.components, builtInComponents)
      
        initUse(Vue)
        initMixin(Vue)
        initExtend(Vue)
        initAssetRegisters(Vue)
      }
      ```

    * 当执行 `new Vue` 的时候，在执行 `this._init(options)` 的时候，就会执行如下逻辑去合并 `options`：

      ```js
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
      ```

    * `mergeOptions` 函数:  主要功能就是把 `parent` 和 `child` 这两个对象根据一些合并策略，合并成一个新对象并返回。它的定义在 [src/core/util/options.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/util/options.js) 中：

      ```javascript
       /**
        * mergeOptions 主要功能就是把 parent 和 child 这两个对象根据一些合并策略，合并成一个新对象并返回
        * @param {*} parent 
        * @param {*} child 
        * @param {*} vm 
        */
      export function mergeOptions (
        parent: Object,
        child: Object,
        vm?: Component
      ): Object {
        if (process.env.NODE_ENV !== 'production') {
          /*检查是否是有效的组件名*/
          checkComponents(child)
        }
      
        if (typeof child === 'function') {
          child = child.options
        }
      
        /*确保所有props option序列化成正确的格式*/
        normalizeProps(child)
        /*将函数指令序列化后加入对象*/
        normalizeDirectives(child)
        /*
          https://cn.vuejs.org/v2/api/#extends
          允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数),而无需使用 
          将child的extends也加入parent扩展
        */
        const extendsFrom = child.extends
        if (extendsFrom) { //递归把子组件的extends合并到parant
          parent = mergeOptions(parent, extendsFrom, vm)
        }
        /*child的mixins加入parent中*/
        if (child.mixins) { //递归把子组件的mixins合并到parent
          for (let i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i], vm)
          }
        }
        const options = {}
        let key
        for (key in parent) {
          mergeField(key)
        }
        /*合并parent与child*/
        for (key in child) {
          if (!hasOwn(parent, key)) { //如果 key 不在 parent 的自身属性上
            mergeField(key) //合并
          }
        }
        //mergeField 函数，它对不同的 key 有着不同的合并策略
        function mergeField (key) {
          /*strats里面保存了 用户自定义合并策略optionMergeStrategies、el、data、props、watch、computed、
          生命周期钩子函数、component、directive、filter 的合并方法，在这里取出合并方法*/
          const strat = strats[key] || defaultStrat
          /*根据合并方法来合并两个option*/
          options[key] = strat(parent[key], child[key], vm, key)
        }
        return options
      }
      ```

      * 先递归把 `extends` 和 `mixixns` 合并到 `parent` 上
      * 然后遍历 `parent`，调用 `mergeField`，然后再遍历 `child`，如果 `key` 不在 `perent` 的自身属性上，则调用 `mergeField`

    * `mergeField`函数：选项合并策略函数，它对不同的 `key` 有着不同的合并策略。 strat 是函数数组，数组包含 optionMergeStrategies 的 propsData、data、Hook、Assets、Watch、Computed、Components、Directives 等选项的合并策略方法。strat 定义在 [src/core/util/options.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/util/options.js) 中：

      ```javascript
       /*
        这个strats的作用就是，当要合并两个option（比如父组件的option与子组件的option）合并的时候，
        这里写了如何合并两个数据（或者function等）得到最终结果的方法
       */
      const strats = config.optionMergeStrategies //全局api
      
      
      /**
      *  定义默认合并策略
       * Default strategy.
       */
      const defaultStrat = function (parentVal: any, childVal: any): any {
        return childVal === undefined
          ? parentVal
          : childVal
      }
      
      // 以 data 合并策略为例，其他合并策略代码省略...
      /**
       * Data
       */
      strats.data = function (
        parentVal: any,
        childVal: any,
        vm?: Component
      ): ?Function {
        if (!vm) {
          // in a Vue.extend merge, both should be functions
          if (!childVal) {
            return parentVal
          }
          if (typeof childVal !== 'function') {
            process.env.NODE_ENV !== 'production' && warn(
              'The "data" option should be a function ' +
              'that returns a per-instance value in component ' +
              'definitions.',
              vm
            )
            return parentVal
          }
          if (!parentVal) {
            return childVal
          }
          // when parentVal & childVal are both present,
          // we need to return a function that returns the
          // merged result of both functions... no need to
          // check if parentVal is a function here because
          // it has to be a function to pass previous merges.
          return function mergedDataFn () {
            return mergeData(
              childVal.call(this),
              parentVal.call(this)
            )
          }
        } else if (parentVal || childVal) {
          return function mergedInstanceDataFn () {
            // instance merge
            const instanceData = typeof childVal === 'function'
              ? childVal.call(vm)
              : childVal
            const defaultData = typeof parentVal === 'function'
              ? parentVal.call(vm)
              : undefined
            if (instanceData) {
              return mergeData(instanceData, defaultData)
            } else {
              return defaultData
            }
          }
        }
      }
      ```

    * 执行完 mergeOptions 方法后，`vm.$options` 中包含 Vue 默认 option 和 用户传入 option：

      ```js
       vm.$options = {
        components: { }, // vue 默认option
        created: [
          function created() { // 用户传入 option
            console.log('parent created')
          }
        ],
        directives: { }, // vue 默认option
        filters: { }, // vue 默认option
        _base: function Vue(options) {  // vue 默认option
          // ...
        },
        el: "#app",
        render: function (h) {
          //...
        }
      }
      ```

  * **组件实例化合并过程：**

    * 在创建组件一节中组件实例化时有两处：

      * render 方法调用的 _createElement() 方法中：当 tag 不是 string 时，调用 createComponent() 创建组件；
      * path 方法调用 createElem() 方法中： 调用 createComponent() 创建组件；

    * 只有path 方法 createElem() 方法中调用 createComponent() 创建组件时通过 new Vue() 实例创建；代码定义在 `src/core/vdom/create-component.js` 中：

      ```js
      export function createComponentInstanceForVnode (
        vnode: any, // we know it's MountedComponentVNode but flow doesn't
        parent: any, // activeInstance in lifecycle state
      ): Component {
        const options: InternalComponentOptions = {
          _isComponent: true,
          _parentVnode: vnode,
          parent
        }
        // ...
        return new vnode.componentOptions.Ctor(options)
      }
      ```

    * `new vnode.componentOptions.Ctor(options)` 时，组件的构造函数是通过 `Vue.extend` 继承自 `Vue` 的：代码定义在 `src/core/global-api/extend.js` 中。

      ```js
      /**
       * Class inheritance
       */
      Vue.extend = function (extendOptions: Object): Function {
        // ...
        Sub.options = mergeOptions(
          Super.options,
          extendOptions
        )
      
        // ...
        // keep a reference to the super options at extension time.
        // later at instantiation we can check if Super's options have
        // been updated.
        Sub.superOptions = Super.options
        Sub.extendOptions = extendOptions
        Sub.sealedOptions = extend({}, Sub.options)
      
        // ...
        return Sub
      }
      ```

      * 在组件构造函数中，主要通过 mergeOptions 将 vue 实例默认 option 和 `extendOptions` 组件对象的  option 进行合并，作为组件 Sub.options。

    * 执行 `new vnode.componentOptions.Ctor(options)` 接着执行 `this._init(options)`，因为 `options._isComponent` 为 true，那么合并 `options` 的过程走到了 `initInternalComponent(vm, options)` 逻辑。

    * `initInternalComponent` 函数：将组件 option 保存到 vue 实例的 option 中。

      * 因为实例化 vue 时,将 用户传入 option 和 vue 默认 option 已经合并，并且在实例化组件时，组件构造函数将组件option 和 vue 实例 option 合并作为组件 option，因此此时组件 option 包含：vue默认option、用户传入 option、 组件实例 option。

        ```javascript
        export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
          const opts = vm.$options = Object.create(vm.constructor.options)
          // doing this because it's faster than dynamic enumeration.
          const parentVnode = options._parentVnode
          opts.parent = options.parent
          opts._parentVnode = parentVnode
        
          const vnodeComponentOptions = parentVnode.componentOptions
          opts.propsData = vnodeComponentOptions.propsData
          opts._parentListeners = vnodeComponentOptions.listeners
          opts._renderChildren = vnodeComponentOptions.children
          opts._componentTag = vnodeComponentOptions.tag
        
          if (options.render) {
            opts.render = options.render
            opts.staticRenderFns = options.staticRenderFns
          }
        }
        ```

    * **执行完合并后`vm.$options` 的值最终包含：vue默认option、用户传入 option、 组件实例 option**。

      ```javascript
      vm.$options = {
        parent: Vue /*父Vue实例*/,
        propsData: undefined, //vue默认option
        _componentTag: undefined,
        _parentVnode: VNode /*父VNode实例*/,
        _renderChildren:undefined,
        __proto__: {
          components: { }, //vue默认option
          directives: { }, //vue默认option
          filters: { },//vue默认option
          _base: function Vue(options) { //vue默认option
              //...
          },
          _Ctor: {},
          created: [
            function created() {
              console.log('parent created') //用户传入 option
            }, function created() {
              console.log('child created') //组件实例 option
            }
          ],
          mounted: [
            function mounted() {
              console.log('child mounted') //组件实例 option
            }
          ],
          data() {
             return {
               msg: 'Hello Vue'
             }
          },
          template: '<div>{{msg}}</div>'
        }
      }
      ```

      

* 选项合并设计思路：自身定义了一些默认配置，同时又可以在初始化阶段传入一些定义配置，然后去 merge 默认配置，来达到定制化不同需求的目的。



## 选项/数据

### [data](https://cn.vuejs.org/v2/api/#data)

- **类型**：`Object | Function`

- **限制**：**组件的定义只接受 `function`, 既 data 是一个函数 **


#### **原理**

* data 是 Vue 实例的数据对象。

* Vue 初始化阶段，Vue 会递归地把 data 的 property 通过  `Object.defineProperty()` 转换为 getter/setter，从而让 data 的 property 能够响应数据变化。

* **对象必须是纯粹的对象 (含有零个或多个的 key/value 对)**：浏览器 API 创建的原生对象，原型上的 property 会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。

* 一旦观察过，你就无法在根数据对象上添加响应式 property。因此推荐在创建实例之前，就声明所有的根级响应式 property。

* 实例创建之后，可以通过 `vm.$data` 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

* 以 `_` 或 `$` 开头的 property **不会**被 Vue 实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些 property。

* 当一个组件被定义，**`data` 必须声明为返回一个初始数据对象的函数**，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。

* 如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。



### [computed 计算属性](https://cn.vuejs.org/v2/api/#computed)

#### **原理**

![](../images/computed.png)

#### **computed & watch 比较** 

* 相同点：数据变化时，会执行回调方法，进行依赖数据收集和重新计算。
* 区别：![computed2](../images/computed2.png)





#### **初次渲染 comouted 流程**

![](../images/computed-yuanli1.png)

#### **修改 computed 重新渲染流程**

![](../images/computed-yuanli2.png)



#### **源码分析**

计算属性的初始化是发生在 Vue 实例初始化阶段的 `initState` 函数中，执行了 `if (opts.computed) initComputed(vm, opts.computed)`，`initComputed` 的定义在 [src/core/instance/state.js](https://github.com/vuejs/vue/blob/v2.3.0/src/core/instance/state.js) 中：

```js
const computedWatcherOptions = { lazy: true } // lazy 标志是否重新求值

/*初始化computed*/
function initComputed (vm: Component, computed: Object) {
  const watchers = vm._computedWatchers = Object.create(null) // 创建 watcher 对象

  for (const key in computed) { // 遍历计算属性对象
    const userDef = computed[key]
    /*
      计算属性可能是一个function，也有可能设置了get以及set的对象。
      可以参考 https://cn.vuejs.org/v2/guide/computed.html#计算-setter
    */
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production') { // 非生产环境下提示警告
      /*getter不存在的时候抛出warning并且给getter赋空函数*/
      if (getter === undefined) {
        warn(
          `No getter function has been defined for computed property "${key}".`,
          vm
        )
        getter = noop
      }
    }
    // create internal watcher for the computed property.
    /*
      为每一个计算属性创建一个对应的内部的监视器 Watcher，保存在vm实例的_computedWatchers中
      这里的computedWatcherOptions参数传递了一个lazy为true，会使得watch实例的dirty为true
    */
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    /*组件正在定义的计算属性已经定义在现有组件的原型上则不会进行重复定义*/
    if (!(key in vm)) {
      /*定义计算属性*/
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') { // 非生产环境下警告
      /*如果计算属性与已定义的data或者props中的名称冲突则发出warning*/
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```

* 函数首先创建 `vm._computedWatchers` 为一个空对象，接着对 `computed` 对象做遍历，拿到计算属性的每一个 `userDef`，然后尝试获取这个 `userDef` 对应的 `getter` 函数，拿不到则在开发环境下报警告。
* 接下来为每一个 `getter` 创建一个 `watcher`，这个 `watcher` 和渲染 `watcher` 有一点很大的不同，它是一个 `computed watcher`，因为 `const computedWatcherOptions = { computed: true }`。
* 最后对判断如果 `key` 不是 `vm` 的属性，则调用 `defineComputed(vm, key, userDef)`，否则判断计算属性对于的 `key` 是否已经被 `data` 或者 `prop` 所占用，如果是的话则在开发环境报相应的警告。

那么接下来需要重点关注 `defineComputed` 的实现：

```js
/*定义计算属性*/
export function defineComputed (target: any, key: string, userDef: Object | Function) {
  if (typeof userDef === 'function') {
    /*创建计算属性的getter*/
    sharedPropertyDefinition.get = createComputedGetter(key)
    /*
      当userDef是一个function的时候是不需要setter的，所以这边给它设置成了空函数。
      因为计算属性默认是一个function，只设置getter。
      当需要设置setter的时候，会将计算属性设置成一个对象。参考：https://cn.vuejs.org/v2/guide/computed.html#计算-setter
    */
    sharedPropertyDefinition.set = noop
  } else {
    /*get不存在则直接给空函数，如果存在则查看是否有缓存cache，没有依旧赋值get，有的话使用createComputedGetter创建*/
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop
    /*如果有设置set方法则直接使用，否则赋值空函数*/
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  /*defineProperty上getter与setter*/
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

这段逻辑很简单，其实就是利用 `Object.defineProperty` 给计算属性对应的 `key` 值添加 getter 和 setter，setter 通常是计算属性是一个对象，并且拥有 `set` 方法的时候才有，否则是一个空函数。在平时的开发场景中，计算属性有 setter 的情况比较少，我们重点关注一下 getter 部分，缓存的配置也先忽略，最终 getter 对应的是 `createComputedGetter(key)` 的返回值，来看一下它的定义：

```js
/*
* 创建计算属性的 getter 函数
* 主要执行两个步骤： 
*  1. 获取 computed 对应的 watcher 对象判断依赖数据是否改变，改变了 重新计算computed 
*  2. 重新依赖收集
*/
function createComputedGetter (key) {
  return function computedGetter () {
    // 获取 computed 对应的 watcher 对象
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      /*实际是脏检查，在计算属性中的依赖发生改变的时候dirty会变成true，在get的时候重新计算计算属性的输出值*/
      if (watcher.dirty) {
        watcher.evaluate()
      }
      /*依赖收集*/
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

`createComputedGetter` 返回一个函数 `computedGetter`，它就是计算属性对应的 getter。

整个计算属性的初始化过程到此结束，我们知道计算属性是一个 `computed watcher`，它和普通的 `watcher` 有什么区别呢，为了更加直观，接下来来我们来通过一个例子来分析 `computed watcher` 的实现。

```js
var vm = new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

当初始化这个 `computed watcher` 实例的时候，构造函数部分逻辑稍有不同：

```js
constructor (
  vm: Component,
  expOrFn: string | Function,
  cb: Function,
  options?: ?Object,
  isRenderWatcher?: boolean
) {
  // ...
  if (this.computed) {
    this.value = undefined
    this.dep = new Dep()
  } else {
    this.value = this.get()
  }
}  
```

可以发现 `computed watcher` 会并不会立刻求值，同时持有一个 `dep` 实例。

然后当我们的 `render` 函数执行访问到 `this.fullName` 的时候，就触发了计算属性的 `getter`，它会拿到计算属性对应的 `watcher`，然后执行 `watcher.depend()`，来看一下它的定义：

```js
/**
  * Depend on this watcher. Only for computed property watchers.
  */
depend () {
  if (this.dep && Dep.target) {
    this.dep.depend()
  }
}
```

注意，这时候的 `Dep.target` 是渲染 `watcher`，所以 `this.dep.depend()` 相当于渲染 `watcher` 订阅了这个 `computed watcher` 的变化。

然后再执行 `watcher.evaluate()` 去求值，来看一下它的定义：

```js
/**
  * Evaluate and return the value of the watcher.
  * This only gets called for computed property watchers.
  */
evaluate () { // 进行脏检查，在计算属性中的依赖发生改变的时候dirty会变成true，重新计算
  if (this.dirty) {
    this.value = this.get()
    this.dirty = false
  }
  return this.value
}
```

`evaluate` 的逻辑非常简单，判断 `this.dirty`，如果为 `true` 则通过 `this.get()` 求值，然后把 `this.dirty` 设置为 false。在求值过程中，会执行 `value = this.getter.call(vm, vm)`，这实际上就是执行了计算属性定义的 `getter` 函数，在我们这个例子就是执行了 `return this.firstName + ' ' + this.lastName`。

这里需要特别注意的是，由于 `this.firstName` 和 `this.lastName` 都是响应式对象，这里会触发它们的 getter，根据我们之前的分析，它们会把自身持有的 `dep` 添加到当前正在计算的 `watcher` 中，这个时候 `Dep.target` 就是这个 `computed watcher`。

最后通过 `return this.value` 拿到计算属性对应的值。我们知道了计算属性的求值过程，那么接下来看一下它依赖的数据变化后的逻辑。

一旦我们对计算属性依赖的数据做修改，则会触发 setter 过程，通知所有订阅它变化的 `watcher` 更新，执行 `watcher.update()` 方法：

```js
/* istanbul ignore else */
if (this.computed) {
  // A computed property watcher has two modes: lazy and activated.
  // It initializes as lazy by default, and only becomes activated when
  // it is depended on by at least one subscriber, which is typically
  // another computed property or a component's render function.
  if (this.dep.subs.length === 0) {
    // In lazy mode, we don't want to perform computations until necessary,
    // so we simply mark the watcher as dirty. The actual computation is
    // performed just-in-time in this.evaluate() when the computed property
    // is accessed.
    this.dirty = true
  } else {
    // In activated mode, we want to proactively perform the computation
    // but only notify our subscribers when the value has indeed changed.
    this.getAndInvoke(() => {
      this.dep.notify()
    })
  }
} else if (this.sync) {
  this.run()
} else {
  queueWatcher(this)
}
```

那么对于计算属性这样的 `computed watcher`，它实际上是有 2 种模式，lazy 和 active。如果 `this.dep.subs.length === 0` 成立，则说明没有人去订阅这个 `computed watcher` 的变化，仅仅把 `this.dirty = true`，只有当下次再访问这个计算属性的时候才会重新求值。在我们的场景下，渲染 `watcher` 订阅了这个 `computed watcher` 的变化，那么它会执行：

```js
this.getAndInvoke(() => {
  this.dep.notify()
})

getAndInvoke (cb: Function) {
  const value = this.get()
  if (
    value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) ||
    this.deep
  ) {
    // set new value
    const oldValue = this.value
    this.value = value
    this.dirty = false
    if (this.user) {
      try {
        cb.call(this.vm, value, oldValue)
      } catch (e) {
        handleError(e, this.vm, `callback for watcher "${this.expression}"`)
      }
    } else {
      cb.call(this.vm, value, oldValue)
    }
  }
}
```

`getAndInvoke` 函数会重新计算，然后对比新旧值，如果变化了则执行回调函数，那么这里这个回调函数是 `this.dep.notify()`，在我们这个场景下就是触发了渲染 `watcher` 重新渲染。

通过以上的分析，我们知道计算属性本质上就是一个 `computed watcher`，也了解了它的创建过程和被访问触发 getter 以及依赖更新的过程，其实这是最新的计算属性的实现，之所以这么设计是因为 Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化才会触发渲染 `watcher` 重新渲染，本质上是一种优化。

接下来我们来分析一下侦听属性 `watch` 是怎么实现的。





### [watch 侦听器](https://cn.vuejs.org/v2/api/#watch)

#### **作用**

用于数据变化时执行异步或开销较大的操作。

本质上侦听属性也是基于 `Watcher` 实现的，它是一个 `user watcher`

#### **watcher 初始化流程**

![](../images/watcher初始化.png)

#### **源码分析**

* 侦听属性的初始化也是发生在 Vue 的实例初始化阶段的 `initState` 函数中，在 `computed` 初始化之后，执行了：

  ```js
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
  ```

   `initWatch` 函数：它的定义在 `src/core/instance/state.js` 中：

  ```js
  function initWatch (vm: Component, watch: Object) {
    for (const key in watch) {
      const handler = watch[key]
      if (Array.isArray(handler)) {
        for (let i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i])
        }
      } else {
        createWatcher(vm, key, handler)
      }
    }
  }
  ```

  这里就是对 `watch` 对象做遍历，拿到每一个 `handler`，因为 Vue 是支持 `watch` 的同一个 `key` 对应多个 `handler`，所以如果 `handler` 是一个数组，则遍历这个数组，调用 `createWatcher` 方法，否则直接调用 `createWatcher`：

  ```js
  function createWatcher (
    vm: Component,
    expOrFn: string | Function,
    handler: any,
    options?: Object
  ) {
    if (isPlainObject(handler)) {
      options = handler
      handler = handler.handler
    }
    if (typeof handler === 'string') {
      handler = vm[handler]
    }
    return vm.$watch(expOrFn, handler, options)
  }
  ```

  这里的逻辑也很简单，首先对 `hanlder` 的类型做判断，拿到它最终的回调函数，最后调用 `vm.$watch(keyOrFn, handler, options)` 函数，`$watch` 是 Vue 原型上的方法，它是在执行 `stateMixin` 的时候定义的：

  ```js
  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      cb.call(vm, watcher.value)
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
  ```

  * 侦听属性 `watch` 最终会调用 `$watch` 方法，这个方法首先判断 `cb` 如果是一个对象，则调用 `createWatcher` 方法，这是因为 `$watch` 方法是用户可以直接调用的，它可以传递一个对象，也可以传递函数。
  * 接着执行 `const watcher = new Watcher(vm, expOrFn, cb, options)` 实例化了一个 `watcher`，这里需要注意一点这是一个 `user watcher`，因为 `options.user = true`。通过实例化 `watcher` 的方式，一旦我们 `watch` 的数据发送变化，它最终会执行 `watcher` 的 `run` 方法，执行回调函数 `cb`，并且如果我们设置了 `immediate` 为 true，则直接会执行回调函数 `cb`。
  * 最后返回了一个 `unwatchFn` 方法，它会调用 `teardown` 方法去移除这个 `watcher`。 

**watcher 对象**

* Watcher 对象：进行依赖收集的观察者，同时在数据变更时通知响应数据改变。

* ```js
  /* A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
    一个解析表达式，进行依赖收集的观察者，同时在表达式数据变更时触发回调函数。它被用于$watch api以及指令
   */
  export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    id: number;
    deep: boolean;
    user: boolean;
    lazy: boolean;
    sync: boolean;
    dirty: boolean;//表示数据是否被读取
    active: boolean;
    deps: Array<Dep>;
    newDeps: Array<Dep>;
    depIds: ISet;
    newDepIds: ISet;
    getter: Function;
    value: any;
  
    constructor (
      vm: Component,
      expOrFn: string | Function, //在new Watcher(vm, updateComponent, noop, {}) 中对应 updateComponent() 方法
      cb: Function,
      options?: Object
    ) {
      this.vm = vm
      /*_watchers存放观察者实例*/
      vm._watchers.push(this)
      // options
      if (options) { //Watcher 类型选项
        this.deep = !!options.deep // deep Watcher 标记
        this.user = !!options.user  // user Watcher 标记
        this.lazy = !!options.lazy // computed watcher 标记
        this.sync = !!options.sync // sync watcher 标记 （vue数据更新是异步的，当响应式数据发送变化后，触发了 watcher.update()，只是把这个 watcher 推送到一个队列中，在 nextTick 后才会真正执行 watcher 的回调函数。而一旦我们设置了 sync，就可以在当前 Tick 中同步执行 watcher 的回调函数）
      } else {
        this.deep = this.user = this.lazy = this.sync = false
      }
      this.cb = cb
      this.id = ++uid // uid for batching
      this.active = true
      this.dirty = this.lazy // for lazy watchers
      this.deps = [] //当数据发生更新时候的旧数据的依赖watcher
      this.newDeps = [] //当数据发生更新时候的新数据的依赖watcher
      this.depIds = new Set()
      this.newDepIds = new Set()
      this.expression = process.env.NODE_ENV !== 'production'
        ? expOrFn.toString()
        : ''
      // parse expression for getter
      /*把表达式expOrFn参数解析成getter*/
      if (typeof expOrFn === 'function') {
        this.getter = expOrFn
      } else {
        this.getter = parsePath(expOrFn)
        if (!this.getter) {
          this.getter = function () {}
          process.env.NODE_ENV !== 'production' && warn(
            `Failed watching path: "${expOrFn}" ` +
            'Watcher only accepts simple dot-delimited paths. ' +
            'For full control, use a function instead.',
            vm
          )
        }
      }
      this.value = this.lazy
        ? undefined
        : this.get()
    }
  
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    /*获得getter的值并且重新进行依赖收集*/
    get () {
      /*将自身watcher观察者实例设置给Dep.target，用以依赖收集*/
      pushTarget(this)
      let value
      const vm = this.vm
  
      /*
        执行了getter操作，看似执行了渲染操作，其实是执行了依赖收集。
        在将Dep.target设置为自生观察者实例以后，执行getter操作。
        譬如说现在的的data中可能有a、b、c三个数据，getter渲染需要依赖a跟c，
        那么在执行getter的时候就会触发a跟c两个数据的getter函数，
        在getter函数中即可判断Dep.target是否存在然后完成依赖收集，
        将该观察者对象放入闭包中的Dep的subs中去。
      */
      if (this.user) {
        try {
          value = this.getter.call(vm, vm) //this.getter 对应就是 updateComponent 函数()
        } catch (e) {
          handleError(e, vm, `getter for watcher "${this.expression}"`)
        }
      } else {
        value = this.getter.call(vm, vm)
      }
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      /*如果存在deep，则触发每个深层对象的依赖，追踪其变化*/
      if (this.deep) {
        /*递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系*/
        traverse(value)
      }
  
      /*将观察者实例从target栈中取出并设置给Dep.target*/
      popTarget()
      this.cleanupDeps()
      return value
    }
  
    /**
     * Add a dependency to this directive.
     */
     /*添加一个依赖关系到Deps集合中*/
    addDep (dep: Dep) {
      const id = dep.id
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id)
        this.newDeps.push(dep)
        if (!this.depIds.has(id)) {
          dep.addSub(this)
        }
      }
    }
  
    /**
     * Clean up for dependency collection.
     */
    /*清理依赖收集
      目的：在重新渲染时候清除更新后视图没有依赖的Watcher对象
    */
    cleanupDeps () {
      /*移除所有观察者对象*/
      let i = this.deps.length
      while (i--) {
        const dep = this.deps[i]
        /*移除更新后没有订阅的数据*/
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this)
        }
      }
      let tmp = this.depIds
      this.depIds = this.newDepIds
      this.newDepIds = tmp
      this.newDepIds.clear()
      tmp = this.deps
      this.deps = this.newDeps
      this.newDeps = tmp
      this.newDeps.length = 0
    }
  
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    /*
      订阅者接口，当依赖发生改变的时候进行回调
     */
    update () {
      /* istanbul ignore else */
      if (this.lazy) {
        this.dirty = true
      } else if (this.sync) { //sync Watcher
        /*同步则执行run直接渲染视图*/
        this.run()
      } else {
        /*异步推送到观察者队列中，下一个tick时调用。*/
        queueWatcher(this)
      }
    }
  
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    /*
        调度者工作接口，将被调度者回调。
      */
    run () {
      if (this.active) {
        /* 对于渲染 watcher 而言，它在执行 this.get() 方法求值的时候，会执行 getter 方法
        (getter方法实际为updateComponents方法，该方法首先调用_render()方法渲染Vnode,然后调用_update()方法更新dom)
        所以这就是当我们去修改组件相关的响应式数据的时候，会触发组件重新渲染的原因，
        接着就会重新执行 patch 的过程，但它和首次渲染有所不同 */
        const value = this.get()//获取当前的值
        if (
          value !== this.value ||
          // Deep watchers and watchers on Object/Arrays should fire even
          // when the value is the same, because the value may
          // have mutated.
          /*
          如果满足新旧值不等、新值是对象类型、deep 模式任何一个条件
          即便值相同，拥有Deep属性的观察者以及在对象／数组上的观察者应该被触发更新，因为它们的值可能发生改变。
          */
          isObject(value) ||
          this.deep
        ) {
          // set new value
          const oldValue = this.value
          /*设置新的值*/
          this.value = value
  
          /*触发回调*/
          if (this.user) {
            try {
              //该回调就是定义watch对向时的回调
              this.cb.call(this.vm, value, oldValue)
            } catch (e) {
              handleError(e, this.vm, `callback for watcher "${this.expression}"`)
            }
          } else {
            this.cb.call(this.vm, value, oldValue)
          }
        }
      }
    }
  
    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
  /*获取观察者的值*/
    evaluate () {
      this.value = this.get()
      this.dirty = false
    }
  
    /**
     * Depend on all deps collected by this watcher.
     */
     /*收集该watcher的所有deps依赖*/
    depend () {
      let i = this.deps.length
      while (i--) {
        this.deps[i].depend()
      }
    }
  
    /**
     * Remove self from all dependencies' subscriber list.
     */
     /*将自身从所有依赖收集订阅列表删除*/
    teardown () {
      if (this.active) {
        // remove self from vm's watcher list
        // this is a somewhat expensive operation so we skip it
        // if the vm is being destroyed.
        /*从vm实例的观察者列表中将自身移除，由于该操作比较耗费资源，所以如果vm实例正在被销毁则跳过该步骤。*/
        if (!this.vm._isBeingDestroyed) {
          remove(this.vm._watchers, this)
        }
        let i = this.deps.length
        while (i--) {
          this.deps[i].removeSub(this)
        }
        this.active = false
      }
    }
  }
  ```

* 根据 options 传入选项，Watcher 对象有四中类型。 

  * `deep watcher`： 对象做深度观测；
  * `user watcher`: 通过 `vm.$watch` 创建的 `watcher` ;
  * `computed watcher` : watch 计算属性;
  * `sync watcher` : 同步执行 `watcher` 

* **deep watcher**

  通常，如果我们想对一下对象做深度观测的时候，需要设置这个属性为 true，考虑到这种情况：

  ```js
  var vm = new Vue({
    data() {
      a: {
        b: 1
      }
    },
    watch: {
      a: {
        handler(newVal) {
          console.log(newVal)
        }
      }
    }
  })
  vm.a.b = 2
  ```

  这个时候是不会 log 任何数据的，因为我们是 watch 了 `a` 对象，只触发了 `a` 的 getter，并没有触发 `a.b` 的 getter，所以并没有订阅它的变化，导致我们对 `vm.a.b = 2` 赋值的时候，虽然触发了 setter，但没有可通知的对象，所以也并不会触发 watch 的回调函数了。

  而我们只需要对代码做稍稍修改，就可以观测到这个变化了

  ```js
  watch: {
    a: {
      deep: true,
      handler(newVal) {
        console.log(newVal)
      }
    }
  }
  ```

  这样就创建了一个 `deep watcher` 了，在 `watcher` 执行 `get` 求值的过程中有一段逻辑：

  ```js
  get() {
    let value = this.getter.call(vm, vm)
    // ...
    if (this.deep) {
      traverse(value)
    }
  }
  ```

  在对 watch 的表达式或者函数求值后，会调用 `traverse` 函数，它的定义在 `src/core/observer/traverse.js` 中：

  ```javascript
   /*递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系*/
  
   /*用来存放Oberser实例等id，避免重复读取*/
  const seenObjects = new Set()
  function traverse (val: any) {
    seenObjects.clear()
    _traverse(val, seenObjects)
  }
  
  function _traverse (val: any, seen: ISet) {
    let i, keys
    const isA = Array.isArray(val)
    /*非对象或数组或是不可扩展对象直接return，不需要收集深层依赖关系。*/
    if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
      return
    }
    if (val.__ob__) {
      /*把子响应式对象通过它们的 dep id 记录到 seenObjects，避免以后重复访问*/
      const depId = val.__ob__.dep.id
      if (seen.has(depId)) {
        return
      }
      seen.add(depId)
    }
  
    /*递归对象及数组*/
    if (isA) {
      i = val.length
      while (i--) _traverse(val[i], seen)
    } else {
      keys = Object.keys(val)
      i = keys.length
      while (i--) _traverse(val[keys[i]], seen)
    }
  }
  ```

  `traverse` 的逻辑也很简单，它实际上就是对一个对象做深层递归遍历，因为遍历过程中就是对一个子对象的访问，会触发它们的 getter 过程，这样就可以收集到依赖，也就是订阅它们变化的 `watcher`，这个函数实现还有一个小的优化，遍历过程中会把子响应式对象通过它们的 `dep id` 记录到 `seenObjects`，避免以后重复访问。

  那么在执行了 `traverse` 后，我们再对 watch 的对象内部任何一个值做修改，也会调用 `watcher` 的回调函数了。

  对 `deep watcher` 的理解非常重要，今后工作中如果大家观测了一个复杂对象，并且会改变对象内部深层某个值的时候也希望触发回调，一定要设置 `deep` 为 true，但是因为设置了 `deep` 后会执行 `traverse` 函数，会有一定的性能开销，所以一定要根据应用场景权衡是否要开启这个配置。

* **user watcher**

  通过 `vm.$watch` 创建的 `watcher` 是一个 `user watcher`，其实它的功能很简单，在对 `watcher` 求值以及在执行回调函数的时候，会处理一下错误，如下：

  ```js
  get() {
    if (this.user) {
      handleError(e, vm, `getter for watcher "${this.expression}"`)
    } else {
      throw e
    }
  },
  getAndInvoke() {
    // ...
    if (this.user) {
      try {
        this.cb.call(this.vm, value, oldValue)
      } catch (e) {
        handleError(e, this.vm, `callback for watcher "${this.expression}"`)
      }
    } else {
      this.cb.call(this.vm, value, oldValue)
    }
  }
  ```

  `handleError` 在 Vue 中是一个错误捕获并且暴露给用户的一个利器

* **sync watcher**

  当响应式数据发送变化后，触发了 `watcher.update()`，只是把这个 `watcher` 推送到一个队列中，在 `nextTick` 后才会真正执行 `watcher` 的回调函数。而一旦我们设置了 `sync`，就可以在当前 `Tick` 中同步执行 `watcher` 的回调函数。

  ```js
  update () {
    if (this.computed) {
      // ...
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
  ```

  只有当我们需要 watch 的值的变化到执行 `watcher` 的回调函数是一个同步过程的时候才会去设置该属性为 true



### this.$options.data() 和 this.$data

在 Vue 2 中，`this.$options.data()` 和 `this.$data` 在组件内部都是与组件的数据（data）相关的，但它们的使用和返回的内容有所不同。

#### **`this.$options.data()`**

- `this.$options` 是一个对象，它包含了当前 Vue 实例的初始化选项。
- `this.$options.data` 通常是一个函数，这个函数返回组件的初始数据对象。
- 但是，注意这里只是函数本身，而不是函数执行的结果。所以，如果你直接访问 `this.$options.data`，你会得到一个函数，而不是数据对象。
- 如果你调用 `this.$options.data()`（注意加上了括号），那么你会得到这个函数返回的数据对象。但通常我们不会这样做，因为这会返回组件的原始数据对象，而不包含任何 Vue 实例对其进行的响应式处理或修改。

#### **`this.$data`**

- `this.$data` 是一个对象，它包含了 Vue 实例当前的响应式数据。
- 这个对象是由 Vue 在创建实例时，通过执行 `this.$options.data()` 函数并将返回的对象转换为响应式对象而得到的。
- 所以，`this.$data` 中的数据是响应式的，这意味着当数据改变时，视图会自动更新。
- 通常，我们不会直接访问或修改 `this.$data`，而是直接通过 `this.someDataProperty` 的形式来访问或修改数据。

#### **为什么我们通常不直接使用 `this.$options.data()` 或 `this.$data`**

- `this.$options.data()` 返回的是原始数据对象，不包含任何 Vue 的响应式处理，所以直接修改它通常不会触发视图的更新。
- `this.$data` 虽然包含了响应式数据，但直接修改它可能会绕过 Vue 的数据变更检测机制，导致某些更新不被触发。
- 在 Vue 中，我们通常通过直接访问和修改组件实例上的数据属性（如 `this.someDataProperty`）来进行数据操作，这样可以确保所有的数据变更都能被 Vue 的响应式系统正确处理。

**参考资料**

[Vue中的this.$options.data()和this.$data用法说明](https://www.yzlfxy.com/jiaocheng/JavaScript/363285.html)



## 指令

### [v-if & v-show](https://cn.vuejs.org/v2/api/#v-show)	

![](../images/if-show.png)

* **共同点：** 都能控制元素的显示和隐藏；
* **不同点：** 实现本质方法不同，`v-show` 本质就是通过控制 css 中的 `display` 设置为 `none`，控制隐藏，只会编译一次；`v-if` 是动态的向 DOM 树内添加或者删除 DOM 元素，若初始值为 `false` ，就不会编译了。而且 `v-if` 不停的销毁和创建比较消耗性能。

### **v-if & v-for**

* 2.x 版本中在一个元素上同时使用 `v-if` 和 `v-for` 时，`v-for` 会优先作用。
* 3.x 版本中 `v-if` 总是优先于 `v-for` 生效。



### [v-model 双向绑定](https://cn.vuejs.org/v2/api/#v-model)

#### 双向绑定

**什么是双向绑定？**

> 数据变化更新视图，视图变化更新数据，数据和视图双向绑定

* 输入框内容变化时，Data 中的数据同步变化。即 View => Data 的变化

* Data 中的数据变化时，文本节点的内容同步变化。即 Data => View 的变化

  ![](../images/v-model.png)

#### **原理**

![](../images/v-model2.png)

本质上就是一种语法糖，它即可以支持原生表单元素，也可以支持自定义组件。

* 原生的v-model，会根据标签的不同生成不同的事件和属性。

* 在组件的实现中，我们是可以配置子组件接收的 `prop` 名称，以及派发的 `event `属性来进行自定义

  ```javascript
  let Child = {
    template: '<div>'
    + '<input :value="msg" @input="updateValue" placeholder="edit me">' +
    '</div>',
    props: ['msg'],
    model: {
      prop: 'msg', //子组件 v-model 绑定的属性
      event: 'change' // 子组件 v-model 触发的事件
    },
    methods: {
      updateValue(e) {
        this.$emit('change', e.target.value)
      }
    }
  }
  
  let vm = new Vue({
    el: '#app',
    template: '<div>' +
    '<child v-model="message"></child>' +
    '<p>Message is: {{ message }}</p>' +
    '</div>',
    data() {
      return {
        message: ''
      }
    },
    components: {
      Child
    }
  })
  ```


* [源码分析](http://caibaojian.com/vue-analysis/extend/v-model.html#v-model)



## [实例方法 / 事件](https://cn.vuejs.org/v2/api/#实例方法-事件)

### Vue 事件机制

* Vue 事件机制 本质上就是 一个 发布-订阅 模式的实现

###  修饰符

![](../images/修饰符.png)

### 手写$on,$off,$emit,$once

```js
class Vue {

  constructor() {
    //  事件通道调度中心
    this._events = Object.create(null)
  }

  $on(event, fn) {
    if (Array.isArray(event)) { //如果事件名为数组，递归添加事件
      event.map(item => {
        this.$on(item, fn)
      })
    } else { //向事件对象添加事件回调
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
    return this
  }

  $once(event, fn) {
    function on() {
      this.$off(event, on)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.$on(event, on)
    return this
  }

  $off(event, fn) {
    if (!arguments.length) {
      this._events = Object.create(null)
      return this
    }
    if (Array.isArray(event)) {
      event.map(item => {
        this.$off(item, fn)
      })
      return this
    }
    const cbs = this._events[event]
    if (!cbs) {
      return this
    }
    if (!fn) {
      this._events[event] = null
      return this
    }
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return this
  }
  
  $emit(event) {
    let cbs = this._events[event]
    if (cbs) {
      const args = [].slice.call(arguments, 1)
      cbs.map(item => {
        args ? item.apply(this, args) : item.call(this)
      })
    }
    return this
  }
}
```





## [特殊属性](https://cn.vuejs.org/v2/api/#特殊-attribute)

### [key](https://cn.vuejs.org/v2/api/#key)

#### **作用**

`key` 是一个特殊的属性，主要用于跟踪每个节点的身份，从而复用和重新排序现有元素。当你使用 `v-for` 指令来渲染一个列表时，为每一项提供一个唯一的 `key` 是非常重要的。以下是设置 `key` 值的主要作用：

1. **性能优化**：Vue 使用 `key` 来跟踪每个节点的身份，从而能够更智能地复用和重新排序现有元素。如果没有 `key`，Vue 会使用一种就地更新策略，即复用尽可能多的元素，并且只是改变它们的内容。但在某些情况下，这种就地更新可能会导致问题，比如状态/组件的意外保留或更新。
2. **维护状态和避免问题**：当列表的数据变化时，Vue 会尝试通过最小量的 DOM 操作来更新视图。但是，如果没有 `key`，Vue 可能无法准确地跟踪每个节点的身份，从而可能导致以下问题：
   - **状态保留**：当列表重新排序或过滤时，如果没有 `key`，Vue 可能会错误地保留某些元素的状态（如输入框的值、复选框的选中状态等）。
   - **列表渲染错误**：在某些复杂的列表中，如果没有 `key`，Vue 可能会错误地渲染或更新元素。
3. **提高可预测性**：通过为每个元素提供一个唯一的 `key`，你可以确保 Vue 总是以可预测的方式更新 DOM。这有助于提高代码的可读性和可维护性。
4. 更快速 : key 的唯一性可以被 Map 数据结构充分利用,相比于遍历查找的时间复杂度 O(n),Map 的时间复杂度仅仅为 O(1)。
5. 在v-if条件渲染中，用 key **进行组件复用**:

* 当我们使用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用。
* 如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。
* 因此我们可以通过使用 key 来唯一的标识一个元素，这个情况下，使用相同 key 的元素被复用。
* 这个时候 key 的作用是用来标识一个独立的元素。

![](../images/key4.png)

6. 在v-for列表渲染中,用 key 维护维护列表状态：

* 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略；

* 如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。

* 因此通过为每个列表项提供一个 key 值，来以便 Vue 跟踪元 素的身份，从而高效的实现复用。

* 这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。

* 原理：diff 比较同层列表时，未加 Key 则会继续比较该层的子 dom 变化，导致子 dom 树没有变化的节点被复用；添加 key 值就会直接根据 Key 比较，查找同层列表中 Key 值相同的节点，然后复用列表组件，因此复用整层的 dom 树。

  ![](../images/key5.png)

#### **原理**

![key2](../images/key2.png)

![key3](../images/key3.png)



* 参考资料
  * [Vue2.0 v-for 中 :key 到底有什么用？](https://www.zhihu.com/question/61064119)





## **全局API 问答**

### **Vue 初始化全局 API 时，做了什么？**

* 1.Vue 初始化了全局的 config 配置并设为响应式。
* 2.暴露一些工具方法，如日志、选项扩展、选项合并、设置对象响应式 
* 3.暴露全局初始化方法，如 `Vue.set、Vue.delete、Vue.nextTick、Vue.observable` 
* 4.暴露组件配置注册方法，如  `Vue.options.components、Vue.options.directives、Vue.options.filters、Vue.options._base` 
* 5.暴露全局方法，如 `Vue.use、Vue.mixin、Vue.extend、Vue.initAssetRegisters()`



### **Vue 全局 API 有什么作用？**

* `Vue.use()`： 用来安装 plugin 插件，对插件进行缓存优化，并执行 install() 安装。

* `Vue.mixin()`：用来在 Vue 的全局配置上合并 options 配置。并且每个组件生成 vnode 时会合并全局配置和组件配置，因此可以作为抽离公共的业务逻辑，实现公共的业务逻辑，也就是类的继承。

* `Vue.extend()`：用来在 Vue 实例扩展子类，可以用于一些公共组件化配置上。与 Vue.mixin() 区别，我认为 extend 更多的是公众的组件化，也就是类的多态，外观模式。

* `Vue.initAssetRegisters()`：用来将实例上的 component、directive、filter 对象配置到全局的 Vue.options 上。
