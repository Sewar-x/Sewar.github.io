# Vite 性能优化

## 总结



| 优化方法                               | 描述                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| 预构建                                 | 使用 `optimizeDeps` 配置项对依赖进行预构建，提高开发启动速度和热更新速度。 |
| 库模式                                 | 通过[`build.lib` 配置项](https://cn.vitejs.dev/config/build-options.html#build-lib) 和`rollupOptions.external` 配置项将不想打包进库的依赖（如 Vue、ElmentPlus）进行外部化处理。 |
| 代码分割                               | 将代码分割成多个小块，实现按需加载。<br />JS 代码拆分通过配置 `manualChunks` 选项，将特定的模块或依赖包分割成单独的块；<br />CSS 通过 `cssCodeSplit`切割 CSS |
| 组件动态导入                           | 通过动态 `import()` 语法实现组件或模块的按需加载，减少初始加载时间。<br />使用 `unplugin-vue-components` 插件来自动导入 Vue 组件。 |
| 压缩资源                               | 在生产环境中对 CSS、JavaScript 等文件进行压缩，减小文件体积。<br /> `vite-plugin-compression` 插件：将打包后的静态资源压缩成 gzip 格式，减小文件体积； |
| 图片压缩                               | 使用 `vite-plugin-imagemin` 插件对图片资源进行压缩，减少图片文件的大小，提升加载速度。 |
| 图片优化                               | 使用 `vite-imagetools`  对图片进行宽高的重设、按图像尺寸调整显示的位置、自动生成不同分片率下的图片，以适应响应式变化时图片的高清显示等。 |
| 使用 SVG 图/图标                       | 使用 ` vite-plugin-svg-icons`   插件实现生成 SVG 精灵图、预加载所有图标、SVG 压缩、SVG缓存 |
| 缓存优化                               | 利用浏览器缓存策略，减少重复下载相同资源。<br />Vite 可以通过配置 CDN 来优化缓存。 |
| 使用 ES 模块                           | Vite 默认使用原生 ES 模块，相较于 CommonJS，ESM 提供了更好的加载性能和树摇（Tree Shaking）支持。 |
| 开启压缩模式                           | 通过设置 `mode: 'production'`，Vite 会自动应用一系列生产环境优化，如代码压缩、移除死代码等。 |
| 环境变量                               | 利用环境变量来管理不同环境（如开发、测试、生产）下的配置，避免硬编码。 |
| 利用 Vite 插件                         | Vite 生态系统提供了丰富的插件，用于解决各种性能问题，如图片压缩、字体优化等。 |
| 移除未使用的代码<br />（Tree Shaking） | Vite 结合 ES 模块的特性，能够自动移除项目中未使用的代码，减少最终打包体积。 |
| 清除日志和调试语句                     | 在生产环境中，使用 `terser` 插件的 `compress` 选项来清除 `console.log` 和 `debugger` 语句，减少不必要的代码体积。 |

> 详细的性能优化配置，可以参考我的 Vue3 项目模板中的 Vite 配置：[admin-scaffolds/vite.config.ts at main · Sewar-x/admin-scaffolds (github.com)](https://github.com/Sewar-x/admin-scaffolds/blob/main/vite.config.ts)



## **使用[库模式](https://cn.vitejs.dev/guide/build.html#library-mode)**

> 详细配置内容参考文档：[构建生产版本 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/build#library-mode)

* 通过**库模式**将那些不想打包进库的依赖（如 Vue、ElmentPlus）进行外部化处理；
* 通过[`build.lib` 配置项](https://cn.vitejs.dev/config/build-options.html#build-lib) 和`rollupOptions.external` 配置项配置。
* 通过库模式该库可以提供两种构建格式：`es` 和 `umd` ；

**使用场景**

当你需要开发一个插件/组件库时候，可以使用库模式配置 Vite，将 插件/组件库 依赖的插件进行外部化处理。

比如，你使用 JSON Scheme 方式对 Vue3 + ElemetPlus 做了二次封装形成一个组件库，那么在使用该组件库的项目中，可能已经安装了 Vue3 和 ElementPlus。

为了避免 Vue3 和 ElementPlus 代码重复，你需要将你的组件库中的 Vue3 和 ElementPlus 代码进行外部化处理，在打包组件库代码时避免将 Vue3 和 ElementPlus 代码打包到组件库中。

> 示例可以参考我的开源组件库 Vite 配置：[X-UI/packages/element-plus/vite.config.ts at main · Sewar-x/X-UI (github.com)](https://github.com/Sewar-x/X-UI/blob/main/packages/element-plus/vite.config.ts)



## **代码分割**

### **JS 代码拆分**

在生产环境中，Vite 使用 Rollup 进行打包，并自动处理代码分割。

通过配置 Rollup 的 `manualChunks` 选项，可以自定义分块策略，将特定的模块或依赖包分割成单独的块：

* 将所有来自 `node_modules` 的依赖打包到一个单独的 chunk 。

* 将 loadsh 等外部库代码打包到单独 chunk。

> 示例可以参考我的开源组件库 Vite 配置：[X-UI/packages/element-plus/vite.config.ts at main · Sewar-x/X-UI (github.com)](https://github.com/Sewar-x/X-UI/blob/main/packages/element-plus/vite.config.ts)



### **切割 CSS** 

`cssCodeSplit` 是 Vite 中的一个配置选项，用于控制 CSS 代码的分割行为。

在 Vite 的构建过程中，这个选项决定了 CSS 是否应该被分割成多个文件，以及这些文件是如何被管理和加载的。

在默认情况下，Vite 可能会启用 CSS 代码分割，这意味着 CSS 样式会被提取到单独的 CSS 文件中。

然而，这种做法有时会导致样式丢失的问题，尤其是在某些特定的构建配置或项目结构中。

#### 作用与影响

- **启用 CSS 代码分割**：当 `cssCodeSplit` 设置为 `true` 时（或未明确设置，因为默认值可能根据 Vite 的版本而异），Vite 会尝试将 CSS 样式分割成多个文件，以便按需加载。这有助于减少初始加载时间，但可能会引入样式加载的延迟或丢失问题。
- **禁用 CSS 代码分割**：将 `cssCodeSplit` 设置为 `false` 可以禁用 CSS 代码分割。此时，所有的 CSS 样式都会被合并到一个或多个 CSS 文件中（取决于其他配置），并内联到 JavaScript 文件中或通过 `<link>` 标签直接加载。这种做法可以避免样式丢失的问题，但可能会增加初始加载时间。

#### 配置方式

在 `vite.config.js` 或 `vite.config.ts` 文件中，你可以通过修改 `build` 配置项下的 `cssCodeSplit` 属性来设置 CSS 代码分割的行为。以下是一个配置示例：

```javascript
// vite.config.js 或 vite.config.ts  
import { defineConfig } from 'vite';  
  
export default defineConfig({  
  build: {  
    cssCodeSplit: false, // 禁用 CSS 代码分割  
    // 其他构建配置...  
  },  
  // 其他 Vite 配置...  
});
```

#### 注意事项

- **版本差异**：请注意，Vite 的不同版本可能在默认行为和配置项上存在差异。因此，建议查阅你正在使用的 Vite 版本的官方文档以获取最准确的信息。
- **性能考虑**：禁用 CSS 代码分割可能会增加初始加载时间，因为用户需要下载更多的 JavaScript 文件来加载样式。然而，这通常可以通过合理的缓存策略和代码分割策略来缓解。
- **样式丢失问题**：如果你遇到了样式丢失的问题，并且确定这是由于 CSS 代码分割导致的，那么将 `cssCodeSplit` 设置为 `false` 可能是一个有效的解决方案。但是，如果问题仍然存在，可能需要进一步检查你的项目配置和代码。

总之，`cssCodeSplit` 是一个有用的配置选项，它允许你根据项目的需求和性能目标来控制 CSS 代码的分割行为。通过合理配置这个选项，你可以优化你的项目的加载时间和用户体验。



## **组件动态导入**

### **动态导入语法**

Vite 支持原生 ES 模块的动态导入语法（`import()`），这使得代码分割变得简单直接。你可以在需要时才加载某个模块或组件，从而减小初始加载时间。



### **`unplugin-vue-components` 插件**

使用 `unplugin-vue-components` 插件来自动导入 Vue 组件，减少手动导入的繁琐，同时实现组件的按需加载。

避免一次性引入组件库所有组件。



## 静态资源优化

### **gzip 压缩**

通过配置 `vite-plugin-compression` 插件，可以将打包后的静态资源压缩成 gzip 格式，减小文件体积，加快传输速度。

> [vite-plugin-compression/README.zh_CN.md at main · vbenjs/vite-plugin-compression (github.com)](https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md)



### **图片压缩**

使用 `vite-plugin-imagemin` 插件对图片资源进行压缩，减少图片文件的大小，提升加载速度。

> [vbenjs/vite-plugin-imagemin - Vite 中文文档 (viterc.cn)](https://www.viterc.cn/en/vite-plugin-imagemin.html)



### 图片优化

> [`vite-imagetools`  npm](https://www.npmjs.com/package/vite-imagetools) 

使用 `vite-imagetools`  对图片进行宽高的重设、按图像尺寸调整显示的位置、自动生成不同分片率下的图片，以适应响应式变化时图片的高清显示等众多操作。

* **提高页面加载速度和性能**：
  * 原始图片可能太大或分辨率太高，因此需要将其缩小或压缩，以提高页面加载速度和性能。
  * 通过设置适当的宽度，高度等属性，可以有效的减小图片的文件大小和加载时间。 
* **适应不同的屏幕大小和设备**：
  * 在响应式外部设计中，我们需要确保图片在不同屏幕尺寸设备上，都能够适当显示。
  * 通过设置适当的宽度，高度和缩放模式等属性，可以使图片在不同设备上都有最佳的显示效果。
* **防止图片失真或拉伸：**
  * 如果我们不对图像进行处理而之间在网页上显示，可能会出现拉伸或失真等问题。
  * 通过调整图像的宽度，高度和缩放模式等属性，可以确保图像在网页上可以保持原始比例和清晰度。 
* **调整图像质量：**
  * 在某些情况下，我们需要调整图像的质量，以达到最佳的视觉效果。
  * 通过调整图像的质量属性，可以实现不同的视觉效果和文件大小。
* **增加图片美观度**：
  * 通过添加背景颜色，模糊效果等属性，可以使图片看起来更美观和有吸引力。



### 使用 SVG 图/图标

#### **SVG 图特点**

- **文件小**：相比于位图图形（如JPEG、PNG等），SVG文件通常更小，因为它是基于文本的格式。这有助于减少网页加载时间，提高用户体验。
- **优化空间**：SVG图标可以通过压缩和优化进一步减小文件大小，同时保持高质量的视觉效果。
- **相对于图标字体（icon font）**：SVG图标通常比图标字体更快速、更可靠地呈现，且不受字体渲染问题的影响。此外，SVG图标支持多色图形，而图标字体则在这方面有所限制。
- **相对于位图图形（PNG、JPG）**：SVG图标在放大或缩小时**不会失真**，而位图图形则可能出现模糊或锯齿现象。此外，SVG图标的文件大小通常更小，有助于减少网页加载时间。
- **无损缩放**：SVG是矢量图形，意味着它可以无损地放大或缩小而不会失真。这使得SVG图标在不同尺寸和分辨率的屏幕上都能保持清晰的视觉效果。
- **易于编辑**：SVG图标可以通过文本编辑器直接编辑，包括颜色、形状、大小等属性，这使得设计师和开发者能够轻松地对图标进行修改和优化。



#### **使用SVG 图标**

使用 ` vite-plugin-svg-icons`   插件实现：

1. **生成 SVG 精灵图**：
   - 插件用于生成 SVG 精灵图，这有助于优化项目中 SVG 图标使用。
2. **预加载所有图标**：
   - 项目运行时生成所有图标，只需对 DOM 进行一次操作即可。
3. **高性能**：
   - 内置缓存机制，仅在文件被修改时才会重新生成图标。
4. **SVG 压缩配置**：
   - 支持 SVG 压缩选项 (`svgoOptions`)，可以是布尔值或 `SvgoOptions` 对象。

> ` vite-plugin-svg-icons`   文档：[vbenjs/vite-plugin-svg-icons - Vite 中文文档 (viterc.cn)](https://www.viterc.cn/en/vite-plugin-svg-icons.html)





### **清除日志和调试语句**

在生产环境中，使用 `terser` 插件的 `compress` 选项来清除 `console.log` 和 `debugger` 语句，减少不必要的代码体积。

* 通过配置 `esbuild.pure`  为 true 清除 `console.log` 。
* 通过配置 `esbuild.drop`  为 true 清除 `debugger` 语句。



### **HTTP 缓存**

合理配置构建产物，利用浏览器缓存机制，减少对未更改资源的重复请求。



### **CDN 加速**

CDN（内容分发网络）通过将资源缓存到多个地理位置分散的节点上，使用户能够从最近的节点获取资源，从而加快资源加载速度。

Vite 项目可以通过以下方式使用 CDN 来优化缓存：

1. **手动引入 CDN 资源**：在项目的 HTML 文件中，可以直接通过 `<script>` 和 `<link>` 标签引入 CDN 上的资源。这种方式简单直接，但需要手动管理资源版本和 CDN 链接。
2. **使用 Vite 插件自动引入 CDN 资源**：如 `vite-plugin-cdn-import` 插件，它可以帮助自动将项目中的某些依赖从本地文件引入改为从 CDN 引入。这种方式减少了项目的构建体积，加快了资源加载速度，同时减轻了服务器的负担。配置方式通常是在 `vite.config.js` 或 `vite.config.ts` 文件中引入插件并设置需要加速的依赖项。



## 开发模式依赖预编译

在 Vite 中，`optimizeDeps` 配置项用于在**开发服务器启动前对项目的依赖进行预编译**（也称为预构建或预打包）。

这个过程主要是将那些大型的、复杂的第三方库转换成可以直接在浏览器运行的 ES 模块，从而加快开发过程中的加载速度和构建速度。

`optimizeDeps` 是 Vite 中一个非常重要的配置项，通过合理配置可以显著提高项目的加载性能和构建速度。

### 作用与优势

1. **提高加载效率**：通过预编译，Vite 将这些库提前编译到一个文件里，减少了请求的开销，从而加快了开发过程中的加载速度。
2. **加快构建速度**：预编译阶段已经预先处理了依赖的模块，所以在最终打包构建的时候，只需要处理自身的源代码逻辑，无需再额外处理依赖模块，以此提高构建速度。
3. **改善兼容性问题**：由于很多第三方模块可能包含一些现在浏览器所不支持的代码（如 JSX），通过预编译，Vite 将这些代码转换成浏览器可以直接运行的 ES 模块，解决了兼容性问题。
4. **实现按需加载和代码拆分**：预编译将大库拆分成多个小模块，可以按需加载，无需加载整个库，从而优化了性能。



### 工作原理

1. 在 DevServer 启动前，Vite 会对需要编译的依赖进行预先编译，并在模块使用导入（import）时，直接引用预编译过的依赖。
2. 如果依赖项已存在于缓存中且未失效，则直接使用缓存中的预编译文件；
3. 如果依赖项不存在或已失效，则进行新的预编译。
4. 预编译后的文件会被存储在 `node_modules/.vite` 目录下。



### 配置方式

在 Vite 项目中，`optimizeDeps` 配置项通常在 `vite.config.js` 文件中进行设置。以下是一个基本的配置示例：

```javascript
// vite.config.js  
import { defineConfig } from 'vite';  
  
export default defineConfig({  
  optimizeDeps: {  
    include: ['lodash'], // 将 lodash 加入预编译  
    exclude: ['moment'] // 将 moment 移除预编译  
  }  
});
```

- `include`：包含哪些库进行优化，可以是库名或 npm 包名。
- `exclude`：排除哪些库，同样可以是库名或 npm 包名。

注意：开发依赖和已知不需要编译的依赖会自动被 Vite 排除掉。如果遇到有问题的依赖预编译，可以使用 `exclude` 来手动排除。而对于 Vite 默认没有预编译，但你需要其预编译的依赖，可以使用 `include` 来手动添加。



### 注意事项

- 依赖预编译**仅适用于开发模式**，生产构建中通常使用其他工具（如 Rollup）来处理依赖。
- 如果需要强制 Vite 重新构建依赖项，可以在启动开发服务器时指定 `--force` 选项，或手动删除 `node_modules/.vite` 缓存目录。
- 对于大型项目或复杂的依赖关系，合理配置 `optimizeDeps` 可以显著提升开发体验和构建效率。



## 组件封装

1. 通过封装监听指定表单的 JSON 配置，**将动态表单逻辑预先封装进入表单**，减少动态表单逻辑开发量。
2. 通过将预配置 和 后端接口格式 封装成固定格式，减少与后端的对接工作量。