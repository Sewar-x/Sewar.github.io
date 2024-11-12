# CSS 原子化

## 概念

CSS原子化是一种CSS的架构方式，它倾向于创建小巧且单一用途的class，并且这些class的名称通常基于视觉功能。

在原子化CSS中，CSS组件被拆分为更小的部分，这些部分可以独立地编辑、测试和重用。

这些原子通常是单个像素或极其微小的变化，例如颜色、大小、位置等。这些原子可以组合成更复杂的组件，例如按钮、表单、图标等。

使用工具类构建自定义设计，无需编写 CSS

**示例**

使用定制设计需要定制 CSS 的传统方法

![](../images/image-20240523164605764.png)

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    align-items: center;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

使用 Tailwind，你可以通过直接在 HTML 中应用预先存在的类来设置元素样式。

使用工具类构建自定义设计，无需编写 CSS：

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```





## 优点

1. 减少代码量：通过将CSS拆分为更小的部分，可以减少总体代码量。
2. 提高可维护性和可重用性：由于每个class都专注于单一的视觉功能，因此可以更容易地维护和重用这些代码。
3. 提高开发效率：通过组合现有的原子来构建复杂的样式，可以加快开发速度。



## 框架

- [tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [windicss](https://github.com/windicss/windicss)
- [unocss](https://github.com/unocss/unocss)
- [Tachyons](https://tachyons.io/)
- [Atomic CSS](https://acss.io/)



### Tailwind CSS

[Tailwind CSS](https://link.juejin.cn?target=https%3A%2F%2Ftailwindcss.com%2F) 是一个功能优先的CSS框架，它继承了诸如flex、pt-4、text-center和rotate-90这样的类，它们能直接在脚本标记语言中组合起来，构建任何的设计。

截止到目前该框架在[Github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftailwindlabs%2Ftailwindcss)上拥有79 k的Star，在[2021年最受欢迎的项目](https://link.juejin.cn?target=https%3A%2F%2Frisingstars.js.org%2F2021%2Fzh)中位列第六。  [swipperjs](https://link.juejin.cn?target=https%3A%2F%2Fswiperjs.com%2F) 网站就是使用了该框架。

 

### Windi CSS

[Windi](https://link.juejin.cn?target=https%3A%2F%2Fwindicss.org%2F) 号称下一代功能优先的CSS框架。可以把`Windi CSS`看作是按需供应的`Tailwind`替代方案，它的出现是为了解决`Tailwind v2.0`随着项目变大初始化编译和热更新慢的问题。

`Windi CSS`完美兼容`Tailwind v2.0`并且拥有很多额外的炫酷功能。

该框架在[Github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwindicss%2Fwindicss)上拥有 6.5k的Star。

但需要注意的是，`Tailwind v3` 版本默认开启了即时引擎（JIT），实现了和Windi类似的按需加载的功能，构建速度得到了极大的提升。可能也是因为这个原因，截止目前Windi的Github仓库已经半年没有提交过代码。



### UnoCSS

[UnoCSS](https://link.juejin.cn?target=https%3A%2F%2Funo.antfu.me%2F) 是具有高性能且极具灵活性的即时原子化CSS引擎。它是一个引擎而非框架，因为它并没有提供核心工具类，所有功能可以通过预设和内联配置提供。

`UnoCSS`的主要目标是直观性和可定制性，它可以开发者在极短时间内定义自己的CSS工具类。

尽管`UnoCSS`目前还处于beta阶段，但其在 [Github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Funocss%2Funocss) 上的 `Star`数已经达到15.6K。

 

### 框架对比

**各方面对比：**

|    特性/框架     |                         Tailwind CSS                         |                        Windi CSS                         |                           UnoCSS                           |
| :--------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--------------------------------------------------------: |
|     **概述**     | 提供一组实用程序类来控制布局、颜色、间距等，无需编写自定义CSS | 基于Tailwind CSS的实用程序类，但具有按需编译和更快的性能 | 即时、按需的原子级CSS引擎，提供轻量化、高性能的CSS解决方案 |
|  **响应式设计**  |                      内置响应式设计功能                      |                      支持响应式设计                      |                       支持响应式设计                       |
|    **模块化**    |                    提供原子类，可自由组合                    |                   提供原子类，按需编译                   |                       使用原子类概念                       |
|    **灵活性**    |         提供了大量的原子类，允许快速构建和自定义样式         |           与Tailwind CSS类似，但具有更好的性能           |             支持自定义工具类、变体、指令和图标             |
|   **学习曲线**   |           对于不熟悉原子类的开发者可能需要一些时间           |           与Tailwind CSS类似，但可能更易于集成           |                       易于学习和使用                       |
|   **文件大小**   |         可能导致较大的CSS文件，因为包含了大量原子类          |                 通过按需编译减少文件大小                 |               只生成实际使用的样式，文件较小               |
|   **样式重复**   |             原子类数量庞大，可能导致样式重复定义             |                 通过按需编译减少样式重复                 |                避免了不必要的样式加载和重复                |
|     **性能**     |                    加载速度取决于文件大小                    |                   通过按需编译提高性能                   |                   即时加载和渲染，高性能                   |
|   **集成选项**   |                  广泛支持各种前端框架和工具                  |     提供VSCode扩展、Vite、Rollup、Webpack等集成选项      |                   支持多种前端框架和工具                   |
|   **智能提示**   |                    可能需要额外工具或插件                    |                  提供强大的智能提示功能                  |                   可能需要额外工具或插件                   |
| **快速原型开发** |                       支持快速构建原型                       |                   支持快速创建页面布局                   |                   支持快速开发和原型设计                   |
|    **自定义**    |                    支持自定义颜色和字体等                    |                   在配置中定义自定义值                   |             支持自定义工具类、变体、指令和图标             |
|   **使用场景**   |  适用于各种规模的项目，特别是需要快速开发和自定义样式的项目  |       适用于快速原型开发、动态内容丰富的应用程序等       |          适用于需要高性能、轻量化和即时加载的项目          |

#### 功能对比

| 功能/性能                | Tailwind CSS             | Windi CSS                          | UnoCSS                                |
| :----------------------- | :----------------------- | :--------------------------------- | :------------------------------------ |
| **按需加载**             | ✓（通过PurgeCSS插件）    | ✓（更灵活和高效）                  | ✓（即时生成）                         |
| **响应式设计**           | ✓                        | ✓（支持Tailwind CSS）              | ✓                                     |
| **模块化**               | ✓                        | ✓（支持Tailwind CSS）              | ✓                                     |
| **灵活性**               | ✓                        | ✓（高度可定制化）                  | ✓（高度可定制，即时）                 |
| **轻量级**               | ✓                        | ✓                                  | ✓（零依赖，适用于浏览器）             |
| **零配置启动**           | ✗                        | ✓                                  | ✓（无核心工具，所有功能通过预设提供） |
| **丰富的工具集**         | ✓（常见工具）            | ✓（包括VSCode插件、WebPack插件等） | ✓（对多种工具的一流支持）             |
| **自定义属性和插件**     | ✓（支持）                | ✓（支持）                          | ✓（支持）                             |
| **编译模式**             | ✓（常规编译）            | ✓（支持Tailwind CSS编译模式）      | ✓（在构建时合并多个类）               |
| **检查器**               | ✓（可能有第三方工具）    | ✓（可能有第三方工具）              | ✓（交互式检查和调试）                 |
| **CDN运行时构建**        | ✓（可能需要额外配置）    | ✓（可能需要额外配置）              | ✓（只需一行CDN引入）                  |
| **纯 CSS 图标支持**      | ✗（需要额外库或工具）    | ✓（可能通过插件或库支持）          | ✓（内置或通过插件支持）               |
| **CSS-in-JS 运行时构建** | ✗（不直接支持）          | ✓（通过Twin.macro等库支持）        | ✓（可能通过插件或库支持）             |
| **CSS Directives**       | ✓（通过CSS文件）         | ✓（与Tailwind CSS一致）            | ✓（可能支持，具体取决于配置）         |
| **属性模式**             | ✓（通过CSS类）           | ✓（与Tailwind CSS一致）            | ✓（将实用工具分组放置在属性中）       |
| **可定制行为**           | ✓（通过自定义CSS或插件） | ✓（高度可定制）                    | ✓（完全可定制，无核心工具）           |



#### 按需加载支持

> 详细对比可以参考文章：[重新构想原子 CSS (antfu.me)](https://antfu.me/posts/reimagine-atomic-css)

#### **Tailwind CSS**

* 具有按需加载功能，需要依赖PurgeCSS插件和Webpack进行实现的。

* 除仅在生产版本中起作用，这意味着您仍在使用开发中的巨大 CSS。
*  Webpack 中并不那么突出，但在 Vite 中却变得很痛苦

**Tailwind CSS 按需加载原理：**

1. 在生产环境构建配置中，会先使用PurgeCSS对项目中的HTML、JavaScript和CSS进行扫描，去除未使用的样式，生成一个经过优化的样式文件。
2. 这个过程通过PurgeCSS的策略配置来实现，可以根据项目的具体情况进行调整。
3. 然后，在Webpack中配置MiniCssExtractPlugin插件，将抽离出的CSS样式文件进行压缩和合并，输出给浏览器使用。
4. 这样，只有被使用到的样式代码会被打包到最终的CSS文件中。通过这种方式，可以有效地减小生产环境下的CSS文件大小，提高网页的加载速度。
5. 此外，Tailwind CSS也支持JIT（Just-In-Time）模式，这是一种按需编译的方式，可以在运行时动态生成所需的CSS类名，从而进一步减少最终打包的CSS文件大小。

<img src="../images/unocss-traditional-way.png" style="zoom:50%;" />



#### **Windi CSS**

**Windi CSS 按需加载原理：**

Windi CSS 的按需加载原理主要基于其构建过程中的优化和实时编译能力：

1. **扫描和分析**：在开发过程中，Windi CSS 会扫描你的项目中的 HTML、Vue 组件或其他模板文件，以及你的 JavaScript 和 CSS 文件，以识别你实际使用的 Tailwind CSS 实用程序（即类名）。
2. **实时编译**：与传统的 Tailwind CSS 相比，Windi CSS 不需要预先生成整个样式表。相反，它会在你保存文件时实时编译你正在使用的实用程序，并生成一个只包含这些实用程序的优化后的 CSS 文件。这意味着你的 CSS 文件会非常小，只包含你实际需要的样式。
3. **HMR（热模块替换）**：Windi CSS 支持热模块替换（HMR），这意味着当你在开发过程中更改一个 CSS 类或添加一个新的类时，浏览器可以立即重新加载更改，而无需完全刷新页面。这可以显著提高开发效率。
4. **零配置**：Windi CSS 支持 Tailwind CSS 的所有实用程序，并且大多数情况下，你不需要进行任何额外的配置。它会自动处理扫描、编译和优化等任务。
5. **高性能**：由于 Windi CSS 只生成你实际需要的 CSS，并且支持实时编译和 HMR，因此它在性能方面通常比传统的 Tailwind CSS 设置更好。这有助于减少网络传输的 CSS 数据量，提高页面加载速度，并改善用户体验。

<img src="../images/unocss-on-demand-way.png" style="zoom:50%;" />

与Tailwind CSS的按需加载相比，Windi CSS的按需加载在原理和实现上有一些不同之处，同时也带来了一些优点和缺点：

**不同之处**

1. **实时编译**：Tailwind CSS的按需加载通常依赖于构建工具（如Webpack）和PurgeCSS插件，在构建过程中扫描并去除未使用的样式。**而Windi CSS则支持实时编译（JIT模式）**，这意味着当你保存文件时，Windi CSS会立即扫描你的代码并生成只包含你实际使用的实用程序的CSS。
2. **开发体验**：由于Windi CSS的实时编译特性，开发人员可以在编写代码时立即看到样式变化，而**无需等待整个项目重新构建**。这提高了开发效率，并使得样式调试更加容易。

**优点**：

1. **快速开发**：Windi CSS的实时编译功能使得开发人员可以在编写代码时立即看到样式效果，从而加快了开发速度。
2. **减少构建时间**：与Tailwind CSS相比，Windi CSS在构建过程中不需要扫描整个项目来查找未使用的样式。这可以减少构建时间，特别是在大型项目中。
3. **更好的性能**：由于Windi CSS只生成实际使用的CSS，因此最终的CSS文件通常更小，这有助于减少网络传输的开销并提高页面加载速度。

**缺点**

1. **额外的配置**：虽然Windi CSS通常可以自动配置并扫描项目中的文件，但在某些情况下，你可能需要手动配置它以确保它正确地扫描和识别你的代码。
2. **对项目的侵入性**：由于Windi CSS需要实时扫描和编译你的代码，它可能会对你的项目结构或构建过程产生一定的影响。这可能需要一些额外的设置或调整来确保它与你的项目完美集成。
3. **社区和文档**：与Tailwind CSS相比，Windi CSS可能拥有较小的社区和较少的文档资源。这可能会使得在遇到问题时难以找到解决方案或获得帮助。



#### UnoCss

>  没有解析，没有 AST，没有扫描。 它比 Windi CSS 或 Tailwind CSS JIT 快 5 倍。

UnoCSS的按需加载是通过即时地根据HTML结构生成CSS样式来实现的。这意味着UnoCSS不需要预先编译，样式可以在需要时动态地生成。这种方式可以优化页面的加载速度，并减少不必要的网络传输和运行时的样式计算。

**优点**：

1. **实时性**：UnoCSS能够实时地根据HTML结构生成CSS样式，这使得开发者可以立即看到样式变化，提高开发效率。
2. **轻量化**：由于UnoCSS只生成实际使用的样式，因此生成的CSS文件体积较小，有助于优化页面加载速度。
3. **灵活性**：UnoCSS支持与其他前端框架集成，可以方便地在现代前端项目中使用。

**缺点：**

1. **依赖动态分析**：UnoCSS的按需加载依赖于对HTML结构的动态分析，如果HTML结构发生变化，可能需要重新生成CSS样式，这可能会增加一些额外的开销。
2. **可能存在性能瓶颈**：当项目中的HTML结构变得非常复杂时，UnoCSS的动态分析可能会成为性能瓶颈，导致页面加载速度变慢。



## 如何选择？

### 为什么选择 UnoCSS？

> UnoCSS 官方文档[为什么选择 UnoCSS？ (nodejs.cn)](https://unocss.nodejs.cn/guide/why)中，详细介绍了 UnoCSS 和 Windi CSS、Tailwind CSS 差异

* UnoCSS 更好支持 Vite、同时也支持 Webpack 
* 支持自定义预设
* 支持纯 CSS 图标
* UnoCSS的按需加载

### 特征

引用官网：

受 [Windi CSS](http://windicss.org/)、[Tailwind CSS](https://tailwindcss.com/) 和 [Twind](https://github.com/tw-in-js/twind) 的启发，但是：

- [完全可定制](https://unocss.dev/config/) - 没有核心实用程序。所有功能均通过预设提供。
- 无需解析，无需 AST，无需扫描，它是**即时**的（比 Windi CSS 或 Tailwind JIT 快 5 倍）。
- ~6kb min+brotli - 零 deps 和浏览器友好.
- [快捷方式](https://unocss.dev/config/shortcuts) - 动态叠加实用程序。
- [属性模式](https://unocss.dev/presets/attributify/) - 对属性中的实用程序进行分组。
- [纯 CSS 图标](https://unocss.dev/presets/icons/) - 将任何图标用作单个类。
- [变体组](https://unocss.dev/transformers/variant-group) - 具有通用前缀的组实用程序的简写。
- [CSS Directives](https://unocss.dev/transformers/directives) - 在 CSS 中重用 utils with directive.`@apply`
- [编译模式](https://unocss.dev/transformers/compile-class/) - 在构建时将多个类合成为一个类。
- [检查器](https://unocss.dev/tools/inspector) - 以交互方式进行检查和调试。
- [CSS-in-JS 运行时构建](https://unocss.dev/integrations/runtime) - 将 UnoCSS 与一行 CDN 导入一起使用。
- [VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)
- CSS 代码拆分 - 为 MPA 提供最小的 CSS。

### CSS 预设

> UnoCSS 预设兼容 [Tailwind CSS](https://tailwind.nodejs.cn/) 和 [Windi CSS](https://windicss.org/)，详细使用方法可以参考 Tailwind CSS [预设文档](https://tailwind.nodejs.cn/docs)。
>
> 既 UnoCSS 的预设使用的是  [Tailwind CSS](https://tailwind.nodejs.cn/) 的 CSS 预设：[工具优先的基础 - Tailwind CSS 中文网 (nodejs.cn)](https://tailwind.nodejs.cn/docs/utility-first)

UnoCSS 的默认预设。目前相当于 [`@unocss/preset-wind`](https://unocss.nodejs.cn/presets/wind)。

此预设尝试提供流行的工具优先框架的通用超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。

例如，`ml-3` (Tailwind CSS)、`ms-2` (Bootstrap)、`ma4` (Tachyons) 和 `mt-10px` (Windi CSS) 均有效。

```css
.ma4 { margin: 1rem; }
.ml-3 { margin-left: 0.75rem; }
.ms-2 { margin-inline-start: 0.5rem; }
.mt-10px { margin-top: 10px; }
```
