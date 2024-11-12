---
star: true
sticky: true
category:
  - 移动端开发
tag:
  - SSG项目
---
# 从零到一搭建移动端SSG项目

> 详细项目代码参考： [Sewar-x/SSG-Demo: 《从零到一搭建移动端SSG项目实践》| Sewen 博客 示例项目，项目仅作学习使用 (github.com)](https://github.com/Sewar-x/SSG-Demo)

## **预渲染 (SSG )**

### **概念**

* SSG是指在**构建时（build time）生成静态HTML文件**，这些文件可以直接提供给浏览器，而不需要在服务器上进行动态渲染。
* 在构建过程中，组件会被渲染成静态HTML，并保存在文件中。这意味着每个页面都是预渲染的，并且可以以纯静态文件的形式提供给浏览器，无需运行 JavaScript 代码，会有一些辅助的JS来增强页面交互；

### **特点**

* **静态HTML文件**：预渲染生成的页面是纯静态的HTML文件，不需要在浏览器端执行JavaScript代码。
* **快速加载速度**：由于页面已经在构建时生成，没有额外的网络请求和JavaScript执行，预渲染的页面加载速度非常快。
* **支持SEO**：预渲染的HTML文件包含了完整的页面内容，对搜索引擎更友好，有助于提高网站的搜索引擎排名。

### **适应场景**

* **静态内容**：适用于**内容相对稳定的页面，页面内容不频繁变化的情况**下，可以使用预渲染来生成静态HTML文件。
* **高性能要求**：对于**追求快速加载速度和响应性能的网站**，预渲染可以大幅减少页面的加载时间，提供更好的用户体验。
* **SEO优化**：对于需要更好的搜索引擎优化（SEO）的网站，预渲染可以确保搜索引擎能够看到完整的渲染结果，提高网站的可索引性和排名。

### **不适应场景**

* **动态内容**：如果页面内容需要实时获取并根据用户交互进行更新，预渲染的静态HTML文件无法满足这种需求。

* **大规模网站**：对于大规模网站或包含大量动态内容的网站，预渲染可能不太实用，因为构建和维护大量静态HTML文件可能变得复杂和耗时。

* **频繁变化的内容**：如果页面内容需要频繁更新，每次更新都需要重新构建和生成静态HTML文件，预渲染的成本可能会很高。

* **大量路由场景**。 如果您的站点有成百上千个路由，则预渲染将非常缓慢。当然，每个更新只需要执行一次，但是可能要花一些时间。大多数人并没有最终获得数千个静态网页，而是以防万一。



## **项目特性**

* **注重 SEO**: 项目偏向内容类站点，主要通过 Google、Biying 等国外搜索引擎增加曝光度。
* **静态展示网站**：站点偏向于媒体资讯类静态内容的站点。
* **国际化**：站点面向多个国家，不同国家站点有不同的皮肤风格设计。



## **技术栈**

项目基于 Vue SSR 官方demo：[ vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) 进行二次开发，项目结构等基础参考 [vue-ssr 文档](https://ssr.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F)。

**`dependencies` 项目生产环境中运行所必需依赖的模块：**

|        类别         |      框架/插件      |   版本   |                             作用                             |
| :-----------------: | :-----------------: | :------: | :----------------------------------------------------------: |
|     **UI框架**      |                     |          |                                                              |
|       Vue.js        |         vue         | ^2.5.22  | 用于构建用户界面的渐进式框架，提供了响应式数据绑定和组件化的系统 |
|        Vant         |        vant         | ^2.10.10 |                基于 Vue.js 的移动端 UI 组件库                |
|       Swiper        |       swiper        |  ^6.3.5  |       移动端触摸滑动库，用于实现轮播图、滑动页面等效果       |
|    **状态管理**     |                     |          |                                                              |
|        Vuex         |        vuex         |  ^3.0.1  | Vue.js 的状态管理模式和库，用于集中存储和管理应用的所有组件的状态 |
|  Vuex-Router-Sync   |  vuex-router-sync   |  ^5.0.0  | 同步 Vue Router 和 Vuex 的状态，使得路由变化能够触发状态变化 |
|    **路由管理**     |                     |          |                                                              |
|     Vue Router      |     vue-router      |  ^3.0.1  |           Vue.js 的官方路由库，用于构建单页面应用            |
|     **国际化**      |                     |          |                                                              |
|      Vue I18n       |      vue-i18n       | ^8.15.3  |           Vue.js 的国际化插件，用于实现多语言支持            |
|    **HTTP请求**     |                     |          |                                                              |
|        Axios        |        axios        | ^0.19.0  | 基于 Promise 的 HTTP 客户端，用于浏览器和 node.js 中发送 HTTP 请求 |
|    **数据存储**     |                     |          |                                                              |
|      Firebase       |      firebase       |  7.6.2   |             移动和网页应用的实时数据库和后端服务             |
|      LRU Cache      |      lru-cache      |  ^4.1.1  | 基于 LRU (Least Recently Used) 算法的缓存库，用于在内存中存储数据 |
|     **工具库**      |                     |          |                                                              |
|      Cross-Env      |      cross-env      |  ^5.1.1  |                   跨平台设置和使用环境变量                   |
|       Day.js        |        dayjs        |  ^1.9.3  |      轻量级的日期处理库，用于解析、验证、操作和显示日期      |
|     ES6 Promise     |     es6-promise     |  ^4.1.1  |           提供统一的 Promise API，用于处理异步操作           |
|      JS Cookie      |      js-cookie      |  ^2.2.1  |      用于在浏览器中创建、读取、写入和删除 cookies 的库       |
|     Route Cache     |     route-cache     |  0.4.3   |            用于缓存路由信息的库，提高路由查找效率            |
|    Serve Favicon    |    serve-favicon    |  ^2.4.5  |         用于为 Express 应用提供 favicon 服务的中间件         |
|         XSS         |         xss         |  ^1.0.8  |          用于过滤和转义 HTML 中的 XSS 攻击代码的库           |
|    **视频插件**     |                     |          |                                                              |
|     Vue Youtube     |     vue-youtube     |  ^1.4.0  |               Vue.js 的 YouTube 视频播放器插件               |
|    **性能优化**     |                     |          |                                                              |
|     Compression     |     compression     |  ^1.7.1  | 用于 Express 应用的压缩中间件，提高响应速度和减少网络带宽使用 |
|    **分析工具**     |                     |          |                                                              |
|    Vue Analytics    |    vue-analytics    | ^5.22.1  |           用于 Vue.js 应用的 Google Analytics 插件           |
|  **服务器端渲染**   |                     |          |                                                              |
| Vue Server Renderer | vue-server-renderer | ^2.5.22  |      Vue.js 的服务器端渲染工具，用于在服务器端生成 HTML      |



**`devDependencies` 开发依赖的模块：**

|               类别                | 框架/插件 |                        版本                        | 作用 |
| :-------------------------------: | :-------: | :------------------------------------------------: | :--: |
|         **前端构建工具**          |           |                                                    |      |
|              webpack              | `^4.44.1` |           用于模块打包的前端资源构建工具           |      |
|            webpack-cli            | `^3.3.12` |                webpack的命令行接口                 |      |
|      webpack-dev-middleware       | `^3.7.2`  |           提供实时重载的开发服务器中间件           |      |
|      webpack-hot-middleware       | `^2.25.0` |             提供模块热替换功能的中间件             |      |
|           webpack-merge           | `^4.2.1`  |             用于合并webpack配置的工具              |      |
|      mini-css-extract-plugin      | `^0.11.2` |        从JS中提取CSS到单独文件的webpack插件        |      |
| extract-css-chunks-webpack-plugin | `^4.7.5`  |           提取CSS到单独文件的webpack插件           |      |
|        copy-webpack-plugin        | `^6.2.1`  |      将文件或目录复制到构建目录的webpack插件       |      |
|  fork-ts-checker-webpack-plugin   | `^5.2.0`  |        用于在webpack中检查TypeScript的插件         |      |
|  friendly-errors-webpack-plugin   | `^1.6.1`  |         提供更友好的错误信息的webpack插件          |      |
|    progress-bar-webpack-plugin    | `^2.1.0`  |        在webpack构建过程中显示进度条的插件         |      |
|       terser-webpack-plugin       | `^4.2.0`  |        用于压缩JavaScript代码的webpack插件         |      |
|            css-loader             | `^0.28.7` |         将CSS转换为CommonJS的webpack加载器         |      |
|           style-loader            | `^1.0.0`  |     将JS中的CSS样式注入到DOM中的webpack加载器      |      |
|          postcss-loader           | `^4.0.1`  |         使用PostCSS转换CSS的webpack加载器          |      |
|            sass-loader            | `^7.3.1`  |        将Sass/SCSS转换为CSS的webpack加载器         |      |
|            vue-loader             | `^15.3.0` |        用于加载Vue单文件组件的webpack加载器        |      |
|             ts-loader             | `^8.0.3`  |       用于加载TypeScript文件的webpack加载器        |      |
|            file-loader            | `^1.1.5`  |           将文件输出为url的webpack加载器           |      |
|            url-loader             | `^0.6.2`  |       将文件转换为Base64 URL的webpack加载器        |      |
|           **前端UI库**            |           |                                                    |      |
|        vue-social-sharing         | `^2.4.7`  |               Vue.js的社交分享组件库               |      |
|          **前端工具库**           |           |                                                    |      |
|       vue-template-compiler       | `^2.5.22` |                 Vue.js的模板编译器                 |      |
|              moment               | `^2.26.0` | 用于解析、验证、操作和显示日期和时间的JavaScript库 |      |
|         **Node.js工具库**         |           |                                                    |      |
|               execa               | `^4.0.3`  |               创建子进程的Node.js库                |      |
|            iconv-lite             | `^0.6.2`  |            用于字符编码转换的Node.js库             |      |
|             node-sass             | `^4.13.0` |                Node.js的Sass编译器                 |      |
|               ssh2                | `^0.8.9`  |           Node.js的SSH2客户端和服务端库            |      |
|            xxtea-node             | `^1.1.4`  |             XXTEA加密算法的Node.js实现             |      |
|                s3                 | `^4.4.0`  |              AWS S3的Node.js客户端库               |      |
|             fs-extra              | `^9.0.1`  |            扩展Node.js内置`fs`模块的库             |      |
|              rimraf               | `^2.6.2`  |           用于删除文件和目录的Node.js库            |      |
|               yargs               | `^15.4.1` |      解析命令行参数和生成用户友好帮助输出的库      |      |
|     **前端验证和格式化工具**      |           |                                                    |      |
|              eslint               | `^7.0.0`  |          用于JavaScript代码静态检查的工具          |      |
|           eslint-loader           | `^4.0.2`  |          将ESLint集成到webpack中的加载器           |      |
|      eslint-config-standard       | `^14.1.1` |             ESLint的配置，遵循标准风格             |      |
|        eslint-plugin-html         | `^6.0.2`  |                    ESLint的插件                    |      |



## **项目目录**

![image-20240206144049713](../images/SSG项目目录.png)



## **构建流程**

**构建总流程**



![img](../images/总体流程图.png)

**构建详细流程**



![img](../images/详细流程图.png)



**流程**

1. 获取命令行参数，解析参数；
2. 是否通过 webpack 构建？
   * 是，构建webpack，生成资源目录；
   * 否，进入静态路由判断
3. 是否为静态页面路由？
   * 是，生成静态路由表；
   * 否，生成动态路由表；
4. 生成 `vue-server-render` 对象；
5. 生成 HTML ;
6. 上传静态资源到 S3；
7. HTML 处理，如：AMP 处理、资源页面内容等逻辑处理；
8. 页面发布目录路径处理；
9. 写入文件；

## **构建命令**

| 命令                  | 说明              | api                                                    | S3                                                     |
| --------------------- | ----------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| npm run dev           | 开发              | 测服                                                   | 静态资源不上传 S3，放本地                              |
| npm run start         | 预览打包后的文件  | 根据打包命令为区分(npm run build:test / npm run build) | 根据打包命令为区分(npm run build:test / npm run build) |
| npm run build:test    | 打包生成 dist-ssr | 测服                                                   | 测服(test-cdn-car-static)                              |
| npm run build         | 打包生成 dist-ssr | 正服                                                   | 正服(cdn-car-static)                                   |
| npm run generate:test | 静态化生成 html   | 测服                                                   | 测服(test-cdn-car-static)，自动上传                    |
| npm run generate      | 静态化生成 html   | 正服                                                   | 正服(cdn-car-static)，手动上传                         |

所有构建命令在 `package.json` 文件中的 `script` 字段：

```js
  "scripts": {
    "dev": "node server.js --localDev=true",
    "build:client:test": "node ./build/webpack.client.build.js --env=development",
    "build:server:test": "node ./build/webpack.server.build.js --env=development",
    "build:client": "node ./build/webpack.client.build.js --env=production",
    "build:server": "node ./build/webpack.server.build.js --env=production",
    "lint": "eslint --ext .js --ext .vue src/ build/ public/ static-cli/",
    "lint-fix": "eslint --fix --ext .js --ext .vue src/ build/ public/ static-cli/ script-amp/",
    "static-server": "node static-server.js",
    "generate:test": "cross-env node -r esm generate.js --env=test",
    "generate": "cross-env node -r esm generate.js --env=production",
    "deploy-s3": "node deployS3.js",
    "build-ssr:test": "node ./build/webpack.ssr.build.js --env=development --staticSource=dist",
    "build-ssr": "node ./build/webpack.ssr.build.js --env=production --staticSource=dist",
    "deploy-not-CDN": "node notCDNPublic/deploy.js"
  }
```

通过执行构建命令: `npm run generate  --target=routeName --lang=国家语言标识 --env=test --webpack=true  --seconedLang=一国多语言标识 --params=** ` 后，将执行项目中 `./generate.js` 脚本：

```js
#!/usr/bin/env node

/**
 * #!/usr/bin/env node 为系统环境头，表示使用当前环境 node 的命令行脚本
 * 运行命令
 * 静态路由: node -r esm generate.js --target=index --lang=my-en --env=test --webpack=false
 * 动态路由: node -r esm generate.js --target=newsInfo --params=1234 --lang=my-en  --env=test --webpack=true
 * esm 文档：https://www.npmjs.com/package/esm
 */
// 立即执行函数
(function() {
  // 引入静态化脚手架对象，调用 run 方法开始静态化
  require('./static-cli/cli')
    .run()
    .catch((err) => {
      require('consola').fatal(err)
      require('exit')(2)
    })
})()

```

> 该入口文件使用立即执行函数：引入静态化脚手架，并执行 run 方法，立即执行脚本；

静态化脚手架脚本位于 `./static-cli/cli.js` 中：

```js
const Argv = require('./argv/cli-argv') //处理命令行参数
const Builer = require('./builder/cli-builder') // 静态化构建脚本
const Generator = require('./generator/cli-generator')// 生成静态化页面
const consola = require('consola')

exports.run = async function () {
  try {
    const argvs = await Argv.run(require('yargs').argv) // 命令行参数处理
    consola.info(`>>>> 命令行参数:\n${JSON.stringify(argvs, null, 1)}`)
    if (argvs.webpack) {
      await require('./clean/cli-clean')(argvs) // 删除dist目录
      await Builer.run(argvs) // 执行 npm run build 脚本命令
    }
    await Generator.run(argvs) // 生成静态化页面
    if (argvs.env === 'test') {
      const { uploadToS3 } = require('./s3/cli-s3')
      await uploadToS3(argvs) // 测试服上传静态资源到 s3
    }
    consola.success('>>>> All Finish!')
  } catch (err) {
    return Promise.reject(err)
  }
}

```

> 该脚本主要执行以下逻辑：
>
> 1. **命令行参数梳理**
> 2. **根据参数是否需要执行 webpack 构建，决定是否执行 webpack 流程；**
> 3. **生成静态化页面；**
> 4. **上传到 S3;**

以下将详细分析以上四个步骤。

## **参数处理**

> 参数处理库：[yargs](https://github.com/yargs/yargs)

### **参数格式**

生成静态化站点命令：

```javascript
node -r esm generate.js --target=routeName --lang=国家语言标识 --env=test --webpack=true  --seconedLang=一国多语言标识 --params=**
```

```javascript
s3 测试服链接：
npm run generate -- --target=routeName --lang=***  *--env=** --webpack=true --seconedLang=一国多语言标识  --params=**
```

```javascript
s3 正式服链接：
npm run generate:s3 -- --target=routeName --lang=** --env=** --webpack=true  --seconedLang=一国多语言标识  --params=**
```

【注意格式：*npm run generate –- 参数*】

- `target`：静态化目标路由名称（必填）。
  - 对应 *`src/router/routes.js`* 中的 name 字段（webpackChunkName 不可省略）

- `params`：静态化静态路由（可选）。用于静态化动态路由生成路由表的时候使用。
- `lang`：国家语言标识，默认 `my-en`。格式：国家-语言。
- `seconedLang`： 一国多语言参数，同一国家第二种语言参数。
- `env`：部署环境，test 或者 production，默认 production，用于区别接口请求域名。
- `webpack`：是否执行 webpack 生成 `dist-ssr` 目录。默认 true，不执行 webpack 值为 false 或者 0。
- `groupCount`: 静态化页面打包每次分组数量，并发执行打包数量。
- ~~amp：是否是 amp 页面。默认为 false。~~



### **参数说明**

#### **静态路由参数**

* 字段： `--target` = 静态化目标路由名称
* 作用： 查找路由对象；

* 问题： 不同国家路由模式相同，路由不同；
* 解决方案：
  * 建立国家和路由的map，根据当前打包的国家参数获取路由；

  * 判断路由对象方法：
    * 参数 tartget 对应路由 name 字段；
    * 注意：webpackChunkName 不可省略，并且路由 name 与 webpackChunkName 相同；


#### **动态路由参数**

* 字段：` --params`
* 选项: 
  * all： 静态化所有页面，如 生成所有xx页面 ;
  * 页面自定义参数： 静态化指定页面，如: 静态化 proton X50 特定车系，传入 brandCode, modelCode;
* 静态化静态路由可不传。用于静态化动态路由生成路由表的时候使用。

#### **语言参数**

* 字段：`--lang`
* 作用： 指定静态化国家页面和默认语言文案（静态化默认使用指定国家的默认语言）

#### **一国多语言参数**

* 字段： `--secondLang`

* 作用： 指定国家的第二语言，第二语言参数指定使用文案;

* 问题： 第一语言 lang 指定语言和主题，第二语言 secondLang 仅仅使用在部分路由页面中，如资讯文案 bm 路由使用马来语，zh路由使用中文；seconedLand 不能覆盖 lang 参数 

* 解决方案：

  * 方案一：通过 nodejs 对全局文件变量进行更改，通过读取文件变量设置多语言。

  * 方案二：package.json 变量配置。

    * ```javascript
      // package.json 配置
      "config": {
          "lang": "my-en"
      }
      // 脚本控制
      ;(async function() {
        try {
          const lang = argvs.lang || 'my-en'
          await execCmd(`npm config set wapcar-ssr=th:lang ${lang}`)
        } catch (error) {
          consola.error(`>>>> 多语言 package.json - config - lang 设置失败~ ${error}`)
        }
      })()
      ```

  * 方案三: 配置多个 npm script 命令。

    * ```js
      {
        "scripts": {
          "dev": "node server",
          "dev:my-en": "node server --PAGE_LANG=my-en",
          "dev:th-th": "node server --PAGE_LANG=th-th",
          "start": "cross-env NODE_ENV=production && npm run dev",
          "start:my-en": "cross-env NODE_ENV=production && npm run dev:my-en",
          "start:th-th": "cross-env NODE_ENV=production && npm run dev:th-th",
          "build": "rimraf dist-ssr && npm run build:client && npm run build:server",
          "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js --progress --hide-modules",
          "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --progress --hide-modules",
          "build:my-en": "rimraf dist-ssr && npm run build:client:my-en && npm run build:server:my-en",
          "build:client:my-en": "cross-env NODE_ENV=production PAGE_LANG=my-en webpack --config build/webpack.client.config.js --progress --hide-modules",
          "build:server:my-en": "cross-env NODE_ENV=production PAGE_LANG=my-en webpack --config build/webpack.server.config.js --progress --hide-modules",
          "build:th-th": "rimraf dist-ssr && npm run build:client:th-th && npm run build:server:th-th",
          "build:client:th-th": "cross-env NODE_ENV=production PAGE_LANG=th-th webpack --config build/webpack.client.config.js --progress --hide-modules",
          "build:server:th-th": "cross-env NODE_ENV=production PAGE_LANG=th-th webpack --config build/webpack.server.config.js --progress --hide-modules"
        }
      ```

      

  * 方案四：webpack 使用 nodejs 方式重构，这样各种参数可以使用 nodejs 命令行参数进行传递，而不用通过 cross-env 进行设置。

  * 方案五：

    * 不通过命令行静态化时传参，第二语言参数一般跟路由相互绑定，因此可以在路由中携带第二语言参数
    * 开发模式，需要有第二语言的路由才能访问，通过路由中 meta 来设置第二语言参数
    * 静态化通过 cli-generate context 注入 secondLang，再传到业务代码 entry-server 传参
    * 业务逻辑中通过 this.$route.meta 获取第二语言参数



### **参数处理流程**

* 格式化命令行参数;
* 获取 target参数路由对象;;
* 合并路由对象和参数对象;

参数处理逻辑位于静态化脚手架目录 `./static-cli/argv/cli-argv.js` 文件中：

```js
const { argv } = require('yargs')
const consola = require('consola')

const {
  _ROUTES_NULL, // 路由表为空
  _STATIC_ROUTE, // 静态路由
  _DYNAMIC_ROUTE // 动态路由
} = require('../common/routeState')

// host
const hostMap = require('../../src/api/hostMap')

class Argv {
  /**
   * @param {String} target 静态化目标路由名称，对应 src/router/routes.js 中的 name
   * @param {String} params 参数（构建动态路由或者处理页面发布路径用）
   * @param {String} lang 国家语言标识默认 'my-en'
   * @param {String} secondLang 一国多语言标识，第二语言，默认为空
   * @param {String} env 发布环境，默认 'production', 'test' or 'production'
   * @param {Boolean} webpack 是否执行 webpack 流程
   * @param {*} groupCount 静态化页面打包每次分组数量
   */
  constructor ({ target = '', params = null, lang = 'my-en', secondLang = '', env = 'production', webpack = true, groupCount = 10 }) {
    this._argvs = null

    this.routerName = target //静态化目标路由名称，对应 src/router/routes.js 中的 name
    this.params = params //参数（构建动态路由或者处理页面发布路径用）
    this.lang = lang // 国家语言标识
    this.secondLang = secondLang //一国多语言标识，第二语言，默认为空
    this.env = Array.isArray(env) ? env[env.length - 1] : env //发布环境，默认 'production', 'test' or 'production'
    this.host = hostMap[env === 'production' ? env : 'development'][lang] // 发布站点 url
    this.webpack = webpack != 'false' && webpack != 0 // 是否执行 webpack 流程
    this.groupCount = Number(groupCount) // 静态化页面打包每次分组数量，并发执行打包数量
    this.routes = require('../../src/router/routes')({ lang }) // 静态路由
  }
  // 参数格式化
  static run (options = {}) {
    return Argv.from(options).run()
  }
  // 创建 Argv 单例
  static from (options = {}) {
    if (this._argvs instanceof Argv) {
      return this._argvs
    }
    this._argvs = new Argv(options)
    return this._argvs
  }

  async run () {
    // 获取路由对象和状态
    const routeStateObj = this._getRouteState()
    const cmdOptions = { // 参数选项
      target: this.routerName,
      params: this.params,
      lang: this.lang,
      env: this.env,
      host: this.host,
      webpack: this.webpack,
      secondLang: this.secondLang,
      groupCount: this.groupCount
    }
    switch (routeStateObj.routeState) {
      case _ROUTES_NULL: // 路由表为空
        return Promise.reject('Route List is Null!')
      case _STATIC_ROUTE: // 静态路由，返回参数选项和路由状态对象
        return Promise.resolve({
          ...routeStateObj,
          ...cmdOptions
        })
      case _DYNAMIC_ROUTE:// 动态路由，返回参数选项和路由状态对象
        return Promise.resolve({
          ...routeStateObj,
          ...cmdOptions
        })
      default:
        break
    }
  }

  /**
   * 获取路由对象和状态
   */
  _getRouteState () {
    // 路由对象为空，返回路由状态标识
    if (!this.routes.length) {
      return { routeState: _ROUTES_NULL }
    }
    // 从项目中定义的路由对象中查找参数指定的路由对象，并返回路由状态
    const routeStateObj = this.routes.find(item => {
      if (item.name === this.routerName) {
        const ifDynamicRoute = item.name === this.routerName && item.path.includes(':') // 动态路由
        delete item.component
        item.routeState = ifDynamicRoute ? _DYNAMIC_ROUTE : _STATIC_ROUTE
        return item
      }
    })
    return routeStateObj
  }
}

module.exports = Argv
```

> 以上代码主要逻辑：
>
> 定义一个 Argv 对象，该对象主要作用：
>
> 1. 格式化命令行参数;
> 2. 获取 target参数路由对象;
> 3. 合并路由对象和参数对象;



## **Webpack 构建**

在执行参数处理后，根据命令行参数 `--webpack=true` ,执行 webpack 构建流程。

### **清除静态资源**

执行 webpack 构建之前，会先将构建模板的本地静态资源删除，删除脚本在 `./static-cli/clean/cli-clean.js` 文件中：

```js
const fse = require('fs-extra')
const path = require('path')
const consola = require('consola')

/**
 * 删除 dist-srr/${lang} 目录
 * @param {String} lang
 */
module.exports = function ({
  lang = '',
  staticSource = 's3'
}) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!lang) {
        return resolve(true)
      }
      const distPath = staticSource === 's3' ? 'dist-static' : 'dist-ssr'
      const targetPath = path.resolve(__dirname, `../../${distPath}/${lang}`)
      fse.emptyDirSync(targetPath)
      fse.rmdirSync(targetPath)
      consola.success(`>>>> 删除 /${distPath}/${lang} 目录成功!`)
      return resolve(true)
    } catch (error) {
      return reject(error)
    }
  })
}

```

> 以上删除脚本会根据 国家语言标识作为文件夹名称区分静态资源目录：
>
> 1. 根据命令行参数 `--lang` 获取国家语言标识，获取资源目录；
> 2. 删除目标目录资源；

### **启动构建**

在移除静态资源目录后，开始 webpack 构建。webpack 构建脚本位于 `./static-cli/builder/cli-builder.js` 目录下，详细代码如下：

```js
const { execCmd } = require('../common/util')
const ora = require('ora')
const consola = require('consola')
const path = require('path')

class Builder {
  /**
   *
   * @param {String} lang 语言
   * @param {String} env 环境
   * @param {String} secondLang 第二语言，默认为空
   */
  constructor({ lang = 'my-en', env = 'test', secondLang = '' }) {
    this._builder = null
    this.lang = lang // 国家语言标识
    this.env = env // 发布环境
    this.secondLang = secondLang // 一国多语言，第二语言
  }
  // 参数格式化
  static run(options = {}) {
    return Builder.from(options).run()
  }
  // 创建 builder 单例
  static from(options = {}) {
    if (this._builder instanceof Builder) {
      return this._builder
    }
    this._builder = new Builder(options)
    return this._builder
  }

  async run() {
    let spinnerBuild
    try {
      // shell 输出构建信息
      spinnerBuild = ora(
        `>>>> 正在构建: client \n`
      ).start()
      // 执行 client 脚本构建
      await this.runWebpackBuild('client')
      spinnerBuild.stop()
      // shell 输出构建信息
      spinnerBuild = ora(
        `>>>> 正在构建: server \n`
      ).start()
      // 执行 server 脚本构建
      await this.runWebpackBuild('server')
      spinnerBuild.stop()
      consola.success(`>>>> Build${this.env === 'test' ? ' test ' : ' '}bundles successfully!`)
    } catch (error) {
      spinnerBuild.stop()
      return Promise.reject(error)
    } finally {
      spinnerBuild.stop()
    }
  }

  // 执行 webpack 构建
  async runWebpackBuild(platform = '') {
    return new Promise(async (resolve, reject) => {
      try {
        // 构建脚本路径，根据平台参数获取
        const builderPath = path.resolve(__dirname, `../../build/webpack.${platform}.build.js`)
        // node 脚本参数
        const nodeCmd = `node ${builderPath} --lang=${this.lang} --secondLang=${this.secondLang} --env=${this.env === 'test' ? 'development' : 'production'}`
        // 执行 node 命令
        await execCmd(nodeCmd)
        consola.info(`>>>> 构建完成: ${platform} \n`)
        return resolve(true)
      } catch (error) {
        return reject(error)
      }
    })
  }
}

module.exports = Builder
```

> 以上脚本主要逻辑：
>
> 1. 实例化 Builder 类单例；
> 2. 根据不同平台，对平台脚本使用 node 启动构建；



### **根据平台构建**

webpack 构建会根据不同平台（client 浏览器包和 server 包）进行构建产生不同的包。

SSR 架构如下：

![SSR架构](../images/SSR架构.png)

Vue SSR 框架为同构框架，应用代码编译过程 Vue SSR 提供了两个编译入口，服务端应用和客户端应用，作为抹平由于环境不同的代码差异；

由于用例和平台 API 的差异，当运行在不同环境中时，代码将不会完全相同。

通过 webpack 构建将产生两个包： `Server Bundle`  和 `Client Bundle`。

* `Server Bundle` 用于生成 `vue-ssr-server-bundle.json`， `sourceMap` 和需要在服务端运行的代码列表都在这个产物中。`Server Bundle` 运行在 Node Server。
* `Client Bundle` 用于生成 `vue-ssr-client-manifest.json`，包含所有的静态资源，首次渲染需要加载的 script 标签，以及需要在客户端运行的代码。



**构建文件目录**

构建文件位于 `./build/` 目录下，该目录下包含所有 webpack 构建的脚本：

![image-20240206161117549](../images/SSG-webpack目录.png)



构建入口文件为：

* 浏览器构建： `webpack.client.build.js`
* 服务端构建： `webpack.server.build.js`

这两个文件逻辑相同，只是引入的配置脚本不同，以  `webpack.client.build.js` 讲解：

```js
const { Compiler } = require('./common')
const consola = require('consola')
const clientWebpack = require('./webpack.client.config')

// 立即执行函数
;(async function () {
  try {
    // 获取命令行参数
    const argvs = require('yargs').argv
    // 获取 Client webpack 构建配置
    const clientConfig = clientWebpack(argvs)
    // 创建 webpack 实例
    const ClientCmpiler = new Compiler(clientConfig)
    // 启动 webpack 构建
    await ClientCmpiler.run()
  } catch (error) {
    consola.error(error)
  }
})()
```

> 以上构建主要逻辑：
>
> 1. 获取命令行参数;
> 2.  获取 webpack 构建配置;
> 3. 创建 webpack 实例;
> 4. 启动 webpack 构建;



### **Webpack 实例**

以上通过 `Compiler` 对象为 webpack 构建实例，该实例在 `./build/common.js` 文件中定义：

```js
const webpack = require('webpack')
// const consola = require("consola");
const { COUNTRY_MAP_CDN_HOST } = require('../src/enum')


// Compiler 类，用于执行 webpack 构建
class Compiler {
  constructor(options) {
    // 构建参数
    this.options = options
  }
  // 执行构建
  run() {
    return new Promise((resolve, reject) => {
      // 通过 webpack 对象执行构建
      webpack(this.options).run((err, stat) => {
        if (err || stat.hasErrors()) {
          // 获取构建结果信息
          const info = stat.toJson()
          return reject({
            error: err || info.errors,
            warning: info.warnings
          })
        }
        return resolve(true)
      })
    })
  }
}

/**
 * 获取命令行传入的国家语言标识
 * @param {*} argvLang 1. npm run dev/start: 通过 node 环境获取，--PAGE_LANG=** 传入，require('yargs').argv.PAGE_LANG 获取
 * @param {*} processLang 2. npm run build: 通过 cross-env 设置，PAGE_LANG=** 传入，process.env.PAGE_LANG 获取
 */
function getCmdLang(argvLang = '', processLang = '') {
  return argvLang || processLang
}

/**
 * 获取主题样式标识
 * @param {*} lang
 */
function getStyleVarByLang(lang) {
  switch (lang) {
    case 'th-th':
    case 'id-id':
    case 'ph-en':
      return 'autofun'
    default:
      return 'main'
  }
}

/**
 * 获取 S3 发布域名
 * @param {*} env
 * @param {*} lang
 */
function getPublishPath({ env = 'development', lang = 'my-en' }) {
  const countryCode = lang.split('-')[0]
  return env === 'production'
    ? `${COUNTRY_MAP_CDN_HOST[countryCode]}/${lang}/`
    : `https://xxxx.amazonaws.com/${lang}/`
}

module.exports = {
  getCmdLang,
  getStyleVarByLang,
  getPublishPath,
  Compiler
}

```

> 以上代码定义了 Compiler 类，用于执行 webpack 构建，并对外暴露了几个方法：
>
> * `getCmdLang`: 获取命令行传入的国家语言标识；
> * `getStyleVarByLang`:  获取主题样式标识;
> * `getPublishPath`: 获取 S3 发布域名;

通过以上 webapck 构建实例构建之前，需要获取 webpack 构建配置参数，以下分析不同平台下 webpack 构建配置参数。



### **Webpack 构建配置**

#### **`webpack.base.config.js`**

该文件为 浏览器和服务端 webpack 公共配置项

```js
const path = require('path')// 处理文件路径的Node.js模块。 
const px2rem = require('postcss-px2rem') //一个PostCSS插件，用于将像素值转换为rem。
const TerserPlugin = require('terser-webpack-plugin') //用于优化和压缩JavaScript代码的Webpack插件。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //用于提供更友好的错误输出的Webpack插件。
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //用于将CSS文件提取到单独的文件中的Webpack插件。
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') //用于在Webpack中检查TypeScript代码的Webpack插件。
const CopyPlugin = require('copy-webpack-plugin') //用于在Webpack构建过程中复制文件的插件。
const { VueLoaderPlugin } = require('vue-loader') //用于处理Vue.js文件的Webpack加载器
const commonTool = require('./common')

/**
   * get client webpack config
   * @param {String} lang 主要语言（第一语言），默认为 'my-en'
   * @param {String} env 开发环境，测服/正式服，默认测服
   * @param {Boolean} localDev 本地开发还是静态化打包。本地开发是为 true。默认为 false
   */
module.exports = function ({
  lang = 'my-en',
  env = 'development',
  localDev = false,
  staticSource = 's3'
}) {
  // 获取主题样式标识
  const styleLang = commonTool.getStyleVarByLang(lang)
  // 静态化页面静态资源在s3上，这里和ssr页面做一个区分
  const distPath = staticSource === 's3' ? 'dist-static' : 'dist-ssr'
  return {
    mode: localDev ? 'development' : 'production', // 发布环境
    devtool: localDev ? '#cheap-module-source-map' : false, // 本地开发环境下需要 sourceMap
    output: {
      // 输出文件路径
      path: path.resolve(__dirname, `../${distPath}/${lang}`),
      // 静态资源发布路径
      publicPath: !localDev && staticSource === 's3'
        ? commonTool.getPublishPath({ env, lang: lang })
        : `/${distPath}/${lang}/`,
      // 块文件名
      chunkFilename: 'common/[name].[chunkhash:8].js',
      // 文件名
      filename: 'common/[name].[chunkhash:8].js'
    },
    resolve: {
      // 文件扩展名
      extensions: ['.js', '.json', '.vue', '.scss', '.css'],
      // 别名
      alias: {
        public: path.resolve(__dirname, '../public'),
        '@': path.resolve(__dirname, '..', 'src')
      }
    },
    // 配置 webpack 的 optimization 属性，用于配置 webpack 的优化规则
    optimization: {
      minimize: !localDev,
      minimizer: [
        new TerserPlugin({ //插件用于在生产环境中对打包的 JavaScript 代码进行压缩优化。
          parallel: true,//并发处理,这样可以提高压缩效率。
          sourceMap: localDev, // 如果在生产环境中使用 source-maps，必须设置为 true
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {//配置压缩选项
              warnings: false,
              drop_console: env !== 'development',//在生产环境中删除控制台和调试代码。
              drop_debugger: env !== 'development'//在生产环境中删除控制台和调试代码。
            },
            output: {
              comments: false //禁用输出注释
            }
          },
          extractComments: false //不提取注释到source-maps
        })
      ],
      splitChunks: {//控制代码分
        cacheGroups: {//定义不同的分割规则
          vanUI: {
            name: 'vanUI',//分割后的chunk的名称prefix
            test: /[\\/]node_modules[\\/](.*vant.*)[\\/](lib)[\\/](toast|icon|popup|overlay|info|loading|style)[\\/]/,//正则表达式用于匹配vanUI组件的相关代码
            chunks: 'all',//这个属性表示将匹配到的所有代码都打包成一个chunk。如果设置为'async'，则只会将匹配到的代码打包成一个chunk，但这个chunk会异步加载，并不会影响页面的初始加载速度。
            enforce: true//当没有找到对应的chunk时，强制创建一个chunk
          }
        }
      }
    },
    module: {
      noParse: /es6-promise\.js$/, // avoid webpack shimming process
      rules: [
        {
          test: /\.(vue|js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre',
          options: {
            fix: true
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot|woff2?|ttf|otf)/,
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'static/img/[name].[contenthash:8].[ext]'
          }
        },
        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/] // 为 script 有 lang='ts' 标识的脚本文件添加 ts 后缀
          }
        },

        {
          test: /\.(c|sa|sc)ss$/,
          use: [
            localDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { minimize: !localDev }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    px2rem({
                      remUnit: 100
                    })
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                // data: `@import '~@/assets/index.scss'; @import '~@/assets/scss/variables/${styleLang}.scss';`,
                data: `@import '~@/assets/scss/variables/${styleLang}.scss';`,
                outputStyle: 'expanded' // https://github.com/neilgao000/blog/issues/15
              }
            }
          ]
        }
      ]
    },
    performance: {
      hints: false //关闭 Webpack 的性能提示。
    },
    plugins: !localDev 
      ? [ // 生产环境下 webpack 插件
        new VueLoaderPlugin(), // Vue.js 加载器。
        new MiniCssExtractPlugin({ //使用 MiniCSS 插件来提取 CSS 文件。
          filename: 'common/[name].[contenthash:8].css',
          ignoreOrder: true
        }),
        new CopyPlugin({ //使用 CopyPlugin 插件来复制静态文件
          patterns: [
            {
              from: path.resolve(__dirname, `../public/`),
              to: path.resolve(__dirname, `../${distPath}/${lang}/public`)
            }
          ]
        })
      ]
      : [ // 开发环境下 webpack 插件
        new VueLoaderPlugin(), // Vue.js 加载器。
        new FriendlyErrorsPlugin(), //使用 FriendlyErrors 插件来处理错误。
        new ForkTsCheckerWebpackPlugin() //使用 ForkTsCheckerWebpack 插件来检查 TypeScript 文件。
      ]
  }
}

```



#### **`webpack.client.config.js`**

该文件用于构建 client 文件的 webpack 配置代码，通过 `webpack-merge` 插件，将 webpack 基础配置项和 client 端 webpack 配置项合并：

```js
const webpack = require('webpack')
const merge = require('webpack-merge')
const chalk = require('chalk')
const consola = require('consola')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

/**
 * get client webpack config
 * @param {String} lang 主要语言（第一语言），默认为 'my-en'
 * @param {String} env 开发环境，测服/正式服，默认测服
 * @param {Boolean} localDev 本地开发还是静态化打包。本地开发是为 true。默认为 false
 */
module.exports = function ({
  lang = 'my-en',
  env = 'development',
  localDev = false,
  staticSource = 's3'
}) {
  try {
    // webpack 公共配置项
    const baseConfig = require('./webpack.base.config')({ lang, env, localDev, staticSource })
    // 合并 webpack 配置
    return merge(baseConfig, {
      entry: {
        app: './src/entry-client.js'
      },
      resolve: {
        alias: {
          'create-api': './create-api-client.js'
        }
      },
      plugins: [
        // 进度条插件
        new ProgressBarPlugin({
          format: 'Build Client [:bar] ' + chalk.green.bold(':percent') + ' (:current/:total)',
          clear: false,
          complete: '█',
          incomplete: '░'
        }),
        // 在 process 对象中定义不同的环境变量
        new webpack.DefinePlugin({
          'process.env': {
            LANG: JSON.stringify(lang),
            API_ENV: JSON.stringify(env),
            VUE_ENV: '"client"'
          }
        }),
        // vue 客户端渲染插件
        new VueSSRClientPlugin()
      ]
    })
  } catch (error) {
    consola.error(error)
  }
}

```

使用该 webpack 构建的文件为 `./src/entry-client.js`。

#### **`webpack.server.config.js`**

该文件用于构建 server 文件的 webpack 配置代码，通过 `webpack-merge` 插件，将 webpack 基础配置项和 server 端 webpack 配置项合并：

```js
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const chalk = require('chalk')
const consola = require('consola')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

/**
 * get server webpack config
 * @param {String} lang 主要语言（第一语言），默认为 'my-en'
 * @param {String} env 开发环境，测服/正式服，默认测服
 * @param {Boolean} localDev 本地开发还是静态化打包。本地开发是为 true。默认为 false
 */
module.exports = function ({
  lang = 'my-en',
  env = 'development',
  localDev = false,
  staticSource = 's3'
}) {
  try {
    // webpack 公共配置项
    const baseConfig = require('./webpack.base.config')({ lang, env, localDev, staticSource })
    // 合并 webpack 配置
    return merge(baseConfig, {
      target: 'node', // 指定目标环境，这里设置为Node.js
      devtool: '#source-map', //开发过程中查看源代码maps
      entry: './src/entry-server.js',
      output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        alias: { // 路径别名
          'create-api': './create-api-server.js'
        }
      },
      //使用nodeExternals插件来外部化某些模块，避免在构建过程中包含不必要的依赖
      externals: nodeExternals({
        //whitelist 参数中被指定为忽略CSS文件的外部化，以及vant/lib模块的不外部化。
        whitelist: [/\.css$/, /vant\/lib/]
      }),
      plugins: [
        //添加一个进度条来显示构建过程中的进度。
        new ProgressBarPlugin({
          format: 'Build Server [:bar] ' + chalk.green.bold(':percent') + ' (:current/:total)',
          clear: false,
          complete: '█',
          incomplete: '░'
        }),
        //定义一些环境变量，这些变量在编译时会被替换为实际的值。
        new webpack.DefinePlugin({
          'process.env': {
            LANG: JSON.stringify(lang),
            API_ENV: JSON.stringify(env),
            VUE_ENV: '"server"'
          }
        }),
        //使用VueSSRServerPlugin插件来处理Vue组件的SSR（服务器端渲染）。
        new VueSSRServerPlugin(),
        // 解决 mini-css-extract-plugin 静态化 render route 时 document is not defined 问题
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ]
    })
  } catch (error) {
    consola.error(error)
  }
}

```

使用该 webpack 构建的文件为 `./src/entry-server.js`。



### **构建入口文件**

构建文件是指，通过 webpack 进行构建的代码入口，根据以上 webpack 配置分析可知，在不同平台下构建不同的入口文件：

* `Client`:  构建的文件为 `./src/entry-client.js`;
* `Server`:  构建的文件为 `./src/entry-server.js`。

关于入口文件详细解释，可以参考 [VueSSR原理分析 | Sewen 博客 (sewar-x.github.io)](https://sewar-x.github.io/vue2/VueSSR原理分析/)

#### **`entry-client.js`**

```js
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from '@/app'
import './plugin/index.js' // 登录插件
import lgs from '@/directives/lgs' // 埋点上报插件
import link from '@/directives/link'
import analysis from '@/directives/analysis' // 数据分析插件
import scroll from '@/directives/scroll.js'
import '@/common/firebaseInit.js'
import '@/assets/font/arrow/iconfont.css'
Vue.directive('lgs', lgs)
Vue.directive('link', link)
Vue.directive('analysis', analysis)
Vue.directive('scroll', scroll)

// 全局 mixin：当组件参数发生变化时，调用组件内的 asyncData，用于预获取路由页面客户端渲染数据 
// 此函数会在组件实例化之前调用，所以它无法访问 this
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 等到路由器在钩子和异步组件之前解析了所有的异步
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    // 获取路由匹配的进入和离开的异步组件
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心非预渲染的组件， 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    // 比较进入和离开组件是否相同
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    // 过滤获取激活组件异步获取数据钩子
    const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _)
    // 不存在获取数据钩子，直接进入导航页面
    if (!asyncDataHooks.length) {
      return next()
    }
    //根据 asyncData 获取数据
    Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  //挂载 dom 
  app.$mount('#app')
})

```

> 客户端渲染主要逻辑：
>
> 1. 获取 app、router 和 store 实例；
> 2. 获取 `window.__INITIAL_STATE__` 状态，注入到store 中；（`window.__INITIAL_STATE__` 是通过服务端渲染预先获取的数据，并注入在 HTML 页面中的 `window.__INITIAL_STATE__` 变量中）；
> 3. 全局 mixin：在客户端激活后，当组件参数发生变化时，调用组件内的 asyncData 钩子，用于预获取路由页面客户端渲染的数据；
> 4. 挂载 dom ；
> 5. 监听路由变化，当路由变化时：
>    - 获取路由匹配的进入和离开的异步组件；
>    - 比较进入和离开组件是否相同；
>    - 过滤获取激活组件获取数据 asyncData 钩子；
>    - 根据 asyncData 获取数据；
> 6. 进入路由页面，客户端渲染页面。



#### **`entry-server.js`**

```js
import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// 暴露一个方法用于 bundleRenderer 调用。在服务端渲染时主要执行数据预取，定义应用状态。
// 一旦数据完成同步，该方法将返回一个 Promise app 实例。
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now() // 记录请求时间
    const { app, router, store } = createApp() // 每次请求获取新的 app 、 router、 store  对象
    const { url } = context // 请求 url
    const { fullPath } = router.resolve(url).route // 解析 url 获取路由路径

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // 设置服务器端 router 的位置
    router.push(url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // 获取路由匹配的组件
      const matchedComponents = router.getMatchedComponents()
      // 没有匹配的组件，返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
 
      // 调用路由匹配到的组件的 asyncData 钩子，asyncData 钩子分发 store action，当异步动作完成并 store 同步状态完成则返回 Promise。
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        // 开发环境下控制台输出获取数据时间
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // 在所有预取钩子(preFetch hook) resolve 后，我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文， 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}


```

> 服务端渲染过程主要执行逻辑：
>
> 1. 解析 url 获取路由路径；
> 2. 获取路由匹配的组件；
> 3. 调用路由匹配到的组件的 asyncData 钩子预先获取组件数据；
> 4. 获取异步数据后，将数据填入 store，并自动序列化为 `window.__INITIAL_STATE__`，注入到 HTML。

## **生成路由表**

### **路由表分类**

在Vue.js中，路由是指根据不同的URL地址展示不同的内容或页面。

根据 URL 地址是固定配置还是动态参数生成，将路由分为静态路由和动态路由：

* 静态路由：指的是在路由配置中，提前定义好所有的路由规则，包括路径和对应的组件。
  * 静态路由规则在应用**启动时就已经确定**，不会随着应用的运行而改变；
  * 例如，在Vue Router中，可以通过定义`routes`数组来配置静态路由，每个路由对象都包含`path`和`component`属性，分别表示路径和对应的组件。
* 动态路由：指在应用运行过程中，根据用户的操作或其他条件动态地添加、删除或修改路由规则。
  * 动态路由更加灵活，可以根据不同的需求加载不同的路由，实现不同的页面渲染；
  * 例如，在Vue中，可以使用路由参数用户 id 获取不同用户信息 `user/id` ; 

### **路由表生成规则**

#### **静态路由表**

根据路由文件 `routes.js` 中的 `path` 生成文件目录结构。

- 如某活动页面路由表配置：

  ```js
  // npm run generate:test -- --target=Campaign --lang=my-en --env=test --webpack=0
  // npm run generate:test -- --target=Wheel --lang=my-en --env=test --webpack=0
  const activityLibrary = function (route) {
    return [
      {
        path: `/activity/xxx1`,
        name: 'Campaign',
        component: () => import(/* webpackChunkName: "Campaign" */'@/views/activity/campaign')
      },
      {
        path: `/activity/xxx2`,
        name: 'Wheel',
        component: () => import(/* webpackChunkName: "Wheel" */'@/views/activity/wheel')
      }
  
    ]
  }
  export default activityLibrary
  ```

  

#### **动态路由表**

根据 `/static-addition-config/routeHooks/routeName.js` 中的 `createDynamicRoutes` 函数生成路由表，该函数返回路由表数组。（动态路由必须有该文件，文件名称对应 routes.js 中的 name）

- 输入：{ params: ... }
- 输出：路由表数组。

如某新闻资讯页面的动态路由，路由为 `/news/新闻id` ，通过新闻 id 动态区分资源内容，因此在静态化所有新闻资讯页面的路由时候，需要预先获取所有新闻资讯的 id 和新闻资讯内容，将内容传入组件中进行静态化。

创建新闻资源的方法如下：

```js
  /**
   * 创建动态路由表
   * @param {*} options
   */
  async createDynamicRoutes(options = {}) {
    try {
      // 获取命令行参数
      const { params = '', host = '', lang = '', secondLang = '' } = options
      const languageCode = lang
      const countryCode = lang.split('-')[0]
      const isGenerateSingleRoutes = params !== 'all' && params !== null && params !== ''
      if (isGenerateSingleRoutes) { // 单个路由情况，从输入的参数无法直接得出资讯title，需要先实行一次请求详情
        //  根据新闻资讯 id 获取资讯详细内容
        const detailRes = await getNewsDetail({ host, countryCode, languageCode, id: params })
        const singleParams = {
          title: detailRes.data.data.title,
          id: params
        }
        return [
          // 创建单个路由
          await createSingleNewsRoute({
            languageCode,
            secondLang,
            params: singleParams
          })
        ]
      } else {
        // 创建所有新闻页面路由
        return await createAllNewsRoutes({ host, languageCode, secondLang, countryCode })
      }
    } catch (error) {
      console.log('error :>> ', error)
      return Promise.reject(error)
    }
  }

  /**
   * 创建单个路由
   * @param {*} params carModelCode,brandCode
   */
  async createSingleNewsRoute({ languageCode = '', secondLang = '', params = { title: '', id: '' } }) {
    const useLang = (secondLang && secondLang !== '') ? secondLang : languageCode
    return url[useLang].news(params.title, params.id)
  }

  /**
   * 创建全部路由
   * @param {*} host
   */
  async createAllNewsRoutes({ host = '', languageCode = '', secondLang = '', countryCode }) {
    try {
      const listParams = {
        host,
        countryCode,
        languageCode,
        secondLang: secondLang,
        pageNo: 1,
        pageSize: 99999,
        sortType: 1
      }
      // 获取新闻资讯列表
      const {
        list: newsList = []
      } = await getNewsList(listParams).then(res => handleNewsList(res.data))
      if (!newsList.length) {
        return []
      }
      const routeList = []
      // 遍历新闻资讯列表，获取创建新闻资讯列表路由
      for (let i = 0; i < newsList.length; i += 1) {
        const { title = '', id = '' } = newsList[i]
        const route = await this.createSingleNewsRoute({
          languageCode,
          secondLang,
          params: {
            title,
            id
          }
        })
        routeList.push(route)
      }
      // 返回所有路由列表
      return routeList
    } catch (error) {
      return Promise.reject(error)
    }
  }
```





### **生成路由表**

通过以上方法获取到静态路由和动态路由之后，下一步生成路由。

生成路由脚本在 `./static-cli/generator/cli-generator.js` 中：

```js
// support ECMAScript module loader
require = require('esm')(module/*, options */)

const Server = require('./cli-server')
const fse = require('fs-extra')
const config = require('../common/publishConfig')
const consola = require('consola')
const ora = require('ora')
const path = require('path')
const {
  resolve,
  readFileData,
  writeFileData,
  copyData
} = require('../common/util')
const {
  _ROUTES_NULL, // 路由表为空
  _STATIC_ROUTE, // 静态路由
  _DYNAMIC_ROUTE // 动态路由
} = require('../common/routeState')

class Generator {
  /**
   * @param {String} target 静态化目标路由名称，对应 src/router/routes.js 中的 name
   * @param {String} params 参数（构建动态路由或者处理页面发布路径用）
   * @param {String} lang 默认 'my-en'
   * @param {String} env 默认 'production', 'test' or 'production'
   * @param {Boolean} webpack 是否执行 webpack 流程
   * @param {String} params
   * @param {*} groupCount 静态化页面打包每次分组数量
   */
  constructor({ target = '', params = null, lang = 'my-en', env = 'production', host = '', webpack = true, groupCount = 10, secondLang = '' }) {
    this._generator = null // Generator  实例

    this.options = { ...arguments[0] }
    this.routerName = target // 静态化目标路由名称，对应 src/router/routes.js 中的 name
    this.params = params // 参数（构建动态路由或者处理页面发布路径用）
    this.lang = lang // 国家语言标识
    this.secondLang = secondLang // 国家第二语言标识
    this.env = env // 构建环境
    this.host = host // 发布服务地址
    this.webpack = webpack // 是否需要 webpack 构建
    this.config = config[env] // 发布路径配置等
    this.groupCount = groupCount // 并发构建数量
    this.routeList = require(resolve('../../src/router/routes'))({ lang }) // 所有的路由表
    this.renderRouteList = [] // 当前需要进行 render 的路由表
  }
  // 执行生成
  static run(options = {}) {
    return Generator.from(options).run()
  }
  // 生成 Generator 单例
  static from(options = {}) {
    if (this._generator instanceof Generator) {
      return this._generator
    }
    this._generator = new Generator(options)
    return this._generator
  }
  // 执行静态化生成器
  async run() {
    return new Promise(async (resolve, reject) => {
      try {
        switch (this.options.routeState) {
          case _ROUTES_NULL:  // 路由表为空
            return Promise.reject('Route List is Null!')
          case _STATIC_ROUTE: // 静态路由
            // 获取当前需要进行 render 静态路由表
            this.routeList = await this.getStaticRoutesMap()
            break
          case _DYNAMIC_ROUTE: // 动态路由
            // 获取当前需要进行 render 动态路由表
            this.routeList = await this.getDynamicRoutesMap()
            break
          default:
            break
        }
        // 路由表长度
        const routeLen = this.routeList.length
        if (routeLen) {
          consola.info(`>>>> 总共 ${routeLen} 个静态页面! `)
          const server = await new Server(this.options) // 构建服务对象
          const generatePerCount = this.groupCount // 并发构建数量
          for (let i = 0; i < routeLen; i += generatePerCount) {
            const curRouteGroup = this.routeList.slice(i, i + generatePerCount)
            // 生成路由
            await this.generateGroupRoutes(curRouteGroup, server)
            if (i + generatePerCount >= routeLen) {
              consola.success(`>>>> 静态化页面构建进度: ${routeLen} / ${routeLen}`)
              consola.success(`>>>> 所有静态化页面构建已完成!`)
              return resolve(true)
            } else {
              consola.success(`>>>> 静态化页面构建进度: ${i + generatePerCount} / ${routeLen}`)
            }
          }
        }
      } catch (error) {
        return reject(error)
      }
    })
  }
  // 获取当前需要进行 render 静态路由表
  async getStaticRoutesMap() {
    if (!this.options.target) { // 命令行参数没有生命需要进行 render 的路由 name
      return Promise.reject('>>>> target is null! 【目标路由名不能为空】')
    }
    const routeList = this.routeList.reduce((prev, cur) => {
      const isTargetRoute = cur.name === this.options.target // 是否命中目标路由
      if (isTargetRoute) {
        prev = prev.concat(cur)
      }
      return prev
    }, [])
    return routeList
  }
  // 获取当前需要进行 render 动态路由表
  async getDynamicRoutesMap() {
    return new Promise(async (resolve, reject) => {
      try {
        /** ********** 生成动态路由表，非框架逻辑 start ***********/
        // 调用 createDynamicRoutes 钩子，createDynamicRoutes 钩子通常返回动态路由列表
        let routesList = await this.callRouteHook(this.routerName, 'createDynamicRoutes', this.options)
        /** ********** 生成动态路由表，非框架逻辑 end ***********/

        // 转化数据接口 [] => [{}]
        routesList = routesList.map(item => {
          return {
            path: item,
            routeState: _DYNAMIC_ROUTE
          }
        })
        return resolve(routesList)
      } catch (error) {
        return reject(error)
      }
    })
  }
  // 生成路由表组
  async generateGroupRoutes(routeList = [], server = null) {
    return Promise.all(routeList.map(item => {
      return this.generateSingleRoute({
        route: item,
        payload: {},
        errors: []
      }, server)
    })).catch(err => {
      consola.error(err)
      return Promise.resolve(err)
    })
  }
  // 生成单个路由
  async generateSingleRoute({ route, payload = {}, errors = [] }, server = null) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!server) { return reject('Render Object null!') }
        // render to html, 获取目标路由 html
        let htmlData = await server.renderHtml({ url: route.path })

        /** ********** 非框架层面处理函数调用 start **************/
        htmlData = await this.callRouteHook(this.routerName, 'createHtml', { html: htmlData, routeName: this.options.target, routePath: route.path, ...this.options })
        const targetPagePath = await this.callRouteHook(this.routerName, 'createPublishPath', { route: route.path, params: this.params, ...this.options })
        /** ********** 非框架层面处理函数调用 end **************/

        let routePublishPath // html 目录文件（路由发布路径）
        const lang = this.secondLang || this.lang
        const country = lang.split('-')[0]
        if (this.env === 'production') {
          // 为了打包到旧项目 html 目录的临时处理
          const langMapPrefixPath = {
            'my-en': '',
            'id-id': '/id',
            'th-th': '/th',
            'my-zh': '/my-zh',
            'my-my': '/my-my',
            'ph-en': '/ph'
          }
          routePublishPath = path.join(this.config.publicPath, `${langMapPrefixPath[lang]}${targetPagePath}`)
        } else {
          routePublishPath = path.join(__dirname, '../../', this.config.publicPath, country, targetPagePath) // html 目录文件（路由发布路径）
        }
        fse.ensureDirSync(routePublishPath)
        await writeFileData(path.join(routePublishPath, 'index.html'), htmlData)
        // ora(`>>>> ${targetPagePath} 静态化页面构建完成!`).succeed()
        consola.success(`>>>> ${targetPagePath} 静态化页面构建完成!`)
        return resolve(true)
      } catch (error) {
        consola.error(error)
        return resolve(error)
      }
    })
  }
  // 调用路由钩子
  async callRouteHook(routeName = '', hookName = '', payload = {}) {
    try {
      // 获取路由钩子路径，默认存放在 ../../static-addition-config/routeHooks/ 目录下，通过路由名称定义文件名称，文件对外暴露 hookName 方法
      const hookPath = `../../static-addition-config/routeHooks/${routeName}.js`
      if (fse.existsSync(resolve(hookPath))) { //判断是否存在文件，存在则调用路由钩子
        const lifeCycle = require(`../../static-addition-config/routeHooks/${routeName}.js`)
        const hookObj = lifeCycle.default || lifeCycle
        // 获取文件指定钩子的函数名称
        // eslint-disable-next-line no-prototype-builtins
        if (hookObj.hasOwnProperty(hookName)) {
          switch (hookName) {
            case 'createDynamicRoutes': // 调用 createDynamicRoutes 钩子
              return hookObj.createDynamicRoutes(payload) || []
            case 'createHtml': // 调用 createHtml 钩子
              return hookObj.createHtml(payload) || payload.html
            case 'createPublishPath': // 调用 createPublishPath 钩子
              return hookObj.createPublishPath(payload) || payload.route
            default:
              break
          }
        }
      }
      // 其他情况返回原有数据
      switch (hookName) {
        case 'createDynamicRoutes':
          return []
        case 'createHtml':
          return payload.html
        case 'createPublishPath':
          return payload.route
        default:
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = Generator

```

> 以上代码主要逻辑为：
>
> 1. 定义 Generator 对象，用于生成路由表；
> 2. 调用 `Generator.run`  方法时，执行路由静态化生成器：
> 3. 匹配路由状态，获取当前需要进行 render 路由表；
>    * 动态路由中调用自定义路由方法钩子函数 `createDynamicRoutes` 创建路由表；
>    * 静态路由直接根据路由配置表获取路由；
> 4. 路由表分组，生成页面数据；
> 5. 对路由组切片，调用生成单个路由方法 `generateSingleRoute`；
> 6. 生成单个路由方法时，创建 `Server ` 对象：
>    * 调用自定义 `createHtml` 钩子，生成目标路由的 THML 字符串。
>    * 调用自定义 `createPublishPath` 钩子，生成目标路由的 发布路径。
>    * 获取路由钩子路径，默认存放在 `./static-addition-config/routeHooks/` 目录下，通过路由名称定义文件名称，文件对外暴露 `hookName `方法。
> 7. 创建 HTML 文件，将 THML 字符串写入并将文件写入到发布路径。



## **渲染 HTML 页面**

以上生成路由表时，根据路由表创建 `Server ` 对象，用于生成 HTML 字符串。

### **生成 vue-server-render 对象**

* `vue-server-render`  对象 ` serverRender ` (`static-cli/generator/cli-server`)
* 作用： 用于生成 HTML 字符串。
* 流程：
  * 获取打包生成的 `vue-ssr-server-bundle.json `   和  `vue-ssr-client-manifest.json` 和模板文件；
  * 通过 `dist-ssr/vue-ssr-server-bundle.json `和 `dist-ssr/vue-ssr-client-manifest.json `生成 `serverRender` 对象，同时设置 `preload`、`prefetch` 等配置。

* 注意： 服务端代码静态化时执行，客户端代码浏览器中执行。
  * 静态化生成 HTML 文件时，执行的是服务端入口代码 `entry-server.js` 打包结果；客户端入口代码 `entry-client.js` 被打包后的文件 `app.js` 不会执行，而是在浏览器请求到 html  doc 文件后加载后浏览器执行。


 `Server ` 对象实际为 `vue-server-render` 对象，位于 `static-cli/generator/cli-server` 目录下:

```js
const { resolve } = require('../common/util')
const fse = require('fs-extra')
const { createBundleRenderer } = require('vue-server-renderer')
const consola = require('consola')
const getDefaultTDK = require('../common/getDefaultTDK')

class Server {
  /**
   *
   * @param {String} lang 语言
   */
  constructor({ lang = 'my-en', env = 'production', secondLang = '' }) {
    // this.app = express() 
    this._server = null // node 服务器对象
    this.lang = lang // 国家语言标识
    this.serverBundle = null // 使用 webpack 构建 entry-server 获取的服务端资源
    this.clientManifest = null // 使用 webpack 构建 entry-client 获取的客户端清单资源
    this.renderer = null // 渲染器对象
    this.secondLang = secondLang // 国家语言第二语言参数
    this.isProd = env === 'production' // 是否为生产环境
    this._init() // 开始初始化
  }

  async _init() {
    try {
      // 使用 webpack 构建 entry-server 获取的服务端资源 vue-ssr-server-bundle.json
      this.serverBundle = require(resolve(`../../dist-static/${this.lang}/vue-ssr-server-bundle.json`))
      // 使用 webpack 构建 entry-client 获取的客户端清单资源 vue-ssr-client-manifest.json
      this.clientManifest = require(resolve(`../../dist-static/${this.lang}/vue-ssr-client-manifest.json`))
      // HTML 模板资源
      const templatePath = resolve('../../src/index.template.html')
      // 创建渲染器实例
      this.renderer = this._createRenderer(this.serverBundle, {
        template: fse.readFileSync(templatePath, 'utf-8'),
        clientManifest: this.clientManifest,
        shouldPreload: (file, type) => {
          // https://fetch.spec.whatwg.org/#concept-request-destination
          return false
        },
        shouldPrefetch: (file, type) => {
          return false
        },
        runInNewContext: 'once'
      })
    } catch (error) {
      consola.error(error)
    }
  }
  // 渲染组件成 HTML 字符串
  renderHtml({ url = '' }) {
    return new Promise((resolve, reject) => {
      if (!url) { // 没有路由 url 时报错
        return reject('Not router render url!')
      }
      // 获取渲染上下文
      const context = {
        ...getDefaultTDK(this.lang, this.isProd), // 获取 TDK, SEO 三大关键： title、discription、 key
        lang: this.lang.split('-')[1],
        secondLang: this.secondLang,
        url
      }
      // 调用渲染器对象 renderToString 方法将组件渲染成 HTML 字符串
      this.renderer.renderToString(context, (err, html) => {
        if (err) {
          return reject(err)
        }
        // 返回 HTML 字符串
        return resolve(html)
      })
    })
  }
  // 创建渲染器对象
  _createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {}))
  }
}

module.exports = Server

```

> 以上 `Server` 对象主要逻辑:
>
> 1. 初始化参数；
> 2. 获取使用 webpack 构建 `entry-server.js `获取的服务端资源 `vue-ssr-server-bundle.json` 文件；
> 3. 获取使用 webpack 构建 `entry-client.js` 获取的客户端清单资源 ` vue-ssr-client-manifest.json` 文件；
> 4. 获取HTML 模板；
> 5. 创建渲染器实例；
> 6. 获取渲染上下文，调用渲染器对象 `renderToString` 方法将组件渲染成 HTML 字符串；
> 7.  返回 HTML 字符串;



## **HTML 处理**

* **HTML 处理时机**：
  * 在以上生成路由表过程中，生成单个路由方法时，调用自定义 `createHtml` 钩子中，在该钩子中开发者自定义对 HTML 进行特殊处理。

* **` createHtml `钩子**：
  * 钩子` createHtml ` 位于`/static-addition-config/routeHooks/routeName.js` 目录中;
  * 输入` { html: ... } `；
  * 输出 `html` 字符串数据
  * 文件名称对应 `routes.js` 中的 name



**` createHtml `钩子使用示例：**

假如在生成 HTML 页面时，同时需要生成 APM 页面，则将 HTML 转化为 APM 时需要删除 `script` 外链和脚本并添加默认配置；

因此在生成  HTML 页面时，可以在 `/static-addition-config/routeHooks/routeName.js` 目录中 自定义 `createHtml` 钩子，钩子如下：

```js
// 钩子函数
createHtml({ html = '', routeName = '', routePath }) {
   return convertHtmlToAMP({ html, routeName, ampCustomEleScripts: NewsAmp, routePath })
}

/**
 * 将 html 转化为 amp（删除 script 外链和脚本，添加默认配置）
 * @param {*} html
 */
const convertHtmlToAMP = async function ({ html = '', routeName = '', removeScriptLink = true, inlineCss = false, ampCustomEleScripts = [], routePath, hostType = 'main' }) {
  // console.trace('-----convertHtmlToAMP', routeName, isProd, inlineCss)
  if (!html) {
    return ''
  }
  const allCss = getAllCss(html, inlineCss) || ''

  // 【注意，在计算散列时包括前导和后导空白，并且必须与内联脚本中使用的空白精确匹配。】
  // https://www.npmjs.com/package/@ampproject/toolbox-script-csp
  // 生成脚本 meta hash 值
  let { metaHash = '', html: newHtml = '' } = await generateMetaHash(routeName, html)
  const genHtmlByRoute = replaceAmpHtmlByRoute[routeName]
  if (genHtmlByRoute) {
    newHtml = genHtmlByRoute(newHtml)
  }
  newHtml = newHtml
    .replace(/<(html[\s\S]+?)>/g, ($1, $2) => `<${$2} amp>`) // 添加 amp 标志
    .replace(/<style[\s\S]+?<\/style>/g, '') // 删除 style 标签
    .replace(/<link\s*rel="stylesheet"\s*href="([\s\S]*?)">/g, '') // 删除 link css 标签
    .replace(/<link\s+?rel="preload"[\s\S]+?>/g, '') // 删除 preload
    .replace(/<link\s+?rel="prefetch"[\s\S]+?>/g, '') // 删除 prefetch
    .replace(/amp\-template/g, 'template')
    .replace(
      /<\/head>/, // 添加 amp 所需内容
      `${ampCustomEleScripts.reduce((a, s) => a + s, '')}<script async src="https://cdn.ampproject.org/v0.js"></script>
    <meta name="amp-script-src" content="${metaHash}">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
    <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom type="text/css">${allCss}</style></head>`
    )
    .replace(/\!important/g, '') // 删除 !important
  if (removeScriptLink) { // 只有生产环境才执行的逻辑
    newHtml = newHtml
      .replace(/<script\s+?src[\s\S]*?<\/script>/g, '') // 开发环境不处理外链，生产环境删除外链
      // .replace(/<script>window\.__INITIAL_STATE__[\s\S]+?<\/script>/, '') // 删除window.__INITIAL_STATE__的内容
      .replace(/\<img(.*?)src\=\"(.*?)\"(.*?)\>/g, ($0, $1, $2, $3) => { // 把img标签转为amp-img
        if ($0.match(/layout/g)) {
          return `<amp-img${$1}src="${$2}"${$3}></amp-img>`
        }
        return `<amp-img${$1}src="${$2}" layout="fixed" ${$3}></amp-img>`// 如果img标签没有指定layout的话主动加上一个layout
      })
      .replace(/<script>[\s\S]*?<\/script>/g, '') // 删除内嵌 script，包括window.__INITIAL_STATE__的内容
    // await ampValidator(newHtml, routePath, hostType)
  }
  return newHtml
}
```



## **页面发布路径处理**

* **页面发布路径处理时机**：
  * 在以上生成路由表过程中，生成单个路由方法时，调用自定义 `createPublishPath` 钩子中，在该钩子中开发者自定义对 发布路径进行特殊处理。

* **` createPublishPath `钩子**：
  * 钩子` createHtml ` 位于 `/static-addition-config/routeHooks/routeName.js` 目录中;
  * 输入` { route: ... } `；
  * 输出新路由 url；
  * 文件名称对应 `routes.js` 中的 name；
  * 处理页面发布路径，默认根据路由生成页面发布目录结构。



**` createPublishPath `钩子使用示例：**

如： 资讯页面路由`"/news/how-is-this-possible-proton-x50-is-cheaper-than-taxfree-honda-hrv-7508"`，需要将发布路径替换为` "/news/7508"`并将文件写入到发布路径。

```js
  async createPublishPath({ route }) {
    // route: "/news/how-is-this-possible-proton-x50-is-cheaper-than-taxfree-honda-hrv-7508"
    const getNewRouteRes = route.match(/(\/[^\/]*\/).*-(\d+)$/)
    if (getNewRouteRes && getNewRouteRes[1] && getNewRouteRes[2]) {
      // newRoute: "/news/7508"
      return `${getNewRouteRes[1]}${getNewRouteRes[2]}`
    }
    return route
  }
```



## **写进文件**

* 写进根目录下的 `/html` 文件中。

## **打包后的 html 目录结构**

```
html        
|───page1
|     └───index.html
|───page2
|      └───index.html
|───...
```



## **上传静态资源到 S3**

完成页面渲染后，最后一步将静态资源上传到 S3。

根据 S3 标志，将打包的静态资源上传到对应的 S3 Bucket。

> * S3 是什么？
>
> Amazon S3（Simple Storage Service）是亚马逊Web Services（AWS）提供的一项云存储服务。它是一个高度可扩展的对象存储服务，用于在互联网上存储和检索任意数量的数据。
>
> Amazon S3的主要用途和解决的问题包括：
>
> 1. **数据存储和备份**：S3为各种应用程序提供了一种可靠、安全和可扩展的数据存储解决方案。无论是用于存档、备份还是主存储，S3都能满足需求。
> 2. **内容分发**：S3与Amazon CloudFront集成，可以提供快速、高效的内容分发，适用于网站、移动应用程序和其他数字内容分发场景。
> 3. **数据共享和协作**：通过S3的访问控制和预签名URL功能，可以轻松地在团队或组织之间共享数据，同时保持对数据的精细控制。
> 4. **数据保护和恢复**：S3提供了数据冗余、加密、版本控制等功能，以确保数据的安全性和可恢复性。
>
> 在此处主要使用 S3 的内容分发 CDN 服务。
>
> * 内容分发网络（CDN）是一种网络架构，用于将网站的内容（如HTML页面、图片、JavaScript文件、CSS文件等）分发到全球各地的服务器上。当用户访问网站时，他们会从离自己最近的服务器上获取内容，从而加快网站的加载速度，提高用户体验。



上传到 S3 的脚本位于 `./static-cli/s3/cli-s3.js` 目录下，该文件对外暴露 `uploadToS3` 方法，调用该方法将指定目录静态资源上传到 S3：

```js
const s3 = require('s3')
const path = require('path')
const consola = require('consola')
const ora = require('ora')

// https://www.npmjs.com/package/s3
const client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  s3Options: {
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    region: 'region'
  }
})

function uploadToS3Handle({ lang = 'my-en', s3 = 'test' }) {
  return new Promise((resolve, reject) => {
    const params = {
      deleteRemoved: false, // default false, whether to remove s3 objects that have no corresponding local file.
      localDir: path.resolve(__dirname, `../../dist-static/${lang}/`), // 本地资源路径
      s3Params: { 
        Bucket: s3 === 'test' ? 'test-cdn-car-static' : 'cdn-car-static',  // S3 文件目录
        Prefix: `${lang}/`, // 文件前缀
        ACL: 'public-read'
      }
    }

    const uploader = client.uploadDir(params)
    uploader.on('error', function (err) {
      return reject(err)
    })

    uploader.on('end', function () {
      return resolve(true)
    })
  })
}

module.exports = {
  async uploadToS3({ lang = 'my-en', s3 = 'test' }) {
    const spinnerBuild = ora('>>>> S3 uploading...\n').start()
    try {
      await uploadToS3Handle({ lang, s3 })
      spinnerBuild.stop()
      consola.success('>>>> 静态资源上传到 s3 完成!')
      return Promise.resolve(true)
    } catch (error) {
      spinnerBuild.stop()
      return Promise.reject(error)
    } finally {
      spinnerBuild.stop()
    }
  }
}

```



## **TypeScript 支持**

* 项目支持 typescript，基于[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator#readme)。

## **AMP**

### **本地开发**

本地服务器访问链接携带 `?ampRouteName=***`参数，`#development=1` 忽略以下 AMP 报错：

- `CSS syntax error in tag 'style amp-custom'`
- `Custom JavaScript is not allowed.`

在` /static-addition-config/routeHooks/routeName.js`*中的钩子 `createHtml`进行处理，将 HTML 数据转化为 AMP。

## **其他**

- 接口请求：跟登录态相关的接口请求，放 mounted 处理。
- vscode 配置：安装 ESLint 插件，保存自动格式化。

## **开发**

### **接口**

- 跟登录态相关的接口请求，放 mounted 处理；

- 在 `src/api` 下新建文件，管理接口。

### **多语言**

默认 my-en。

当需要新增多语言时，在 package.json 下添加脚本命令，如添加 th-th:

```json
{ 
    "build:th-th:test": "rimraf dist-ssr && npm run build:th-th:client:test && npm run build:th-th:server:test",
    "build:th-th:client:test": "cross-env NODE_ENV=development PAGE_LANG=th-th webpack --config build/webpack.client.config.js --progress --hide-modules",
    "build:th-th:server:test": "cross-env NODE_ENV=development PAGE_LANG=th-th webpack --config build/webpack.server.config.js --progress --hide-modules",
    "build:th-th": "rimraf dist-ssr && npm run build:th-th:client && npm run build:th-th:server",
    "build:th-th:client": "cross-env NODE_ENV=production PAGE_LANG=th-th webpack --config build/webpack.client.config.js --progress --hide-modules",
    "build:th-th:server": "cross-env NODE_ENV=production PAGE_LANG=th-th webpack --config build/webpack.server.config.js --progress --hide-modules",
    "dev:th-th": "cross-env WEBPACK_TYPE=LOCAL_DEV node server --PAGE_LANG=th-th",
    "start:th-th": "cross-env NODE_ENV=production node server --PAGE_LANG=th-th",
}
```

### **AMP**

1. 在 `/static-addition-config/routeHooks/routeName.js`  中的钩子 `createHtml` 进行处理，调用 `/static-addition-config/common/convertHtmlToAMP.js` 将 HTML 数据转化为 AMP。该函数输入 `{ html: ... }` ，输出 html 数据。（文件名称对应 routes.js 中的 name）

2. 本地服务器访问链接携带 `?ampRouteName=**` 参数，`#development=1` 忽略以下 AMP 报错：

- `CSS syntax error in tag 'style amp-custom'`

- `Custom JavaScript is not allowed.`

3. AMP 的自定义脚本在 `/script-amp/`  目录中。目录结构为：

```
routeName
|───script01.js
|───script03js
|───...
```

### **规范**

- 组件命名：大驼峰

- 使用 typescript。如果是 vue 组件或者页面`<script lang="ts"></script>`，添加` lang="ts" `标签属性；

- 减少使用魔术数字，用常量或者枚举类型替代。

### **其他**

- vscode 配置：安装 ESLint 插件，保存自动格式化。

### **静态化**

### **命令**

S3 测试服链接：`npm run generate -- --target=routeName --params=** --lang=** --env=** --webpack=true`

S3 正式服链接：`npm run generate:s3 -- --target=routeName --params=** --lang=** --env=** --webpack=true`

【注意格式：`npm run generate -- 参数`】

- target：静态化目标路由名称，对应 `src/router/routes.js` 中的 name 字段（webpackChunkName 不可省略）

- params：静态化静态路由可不传。用于静态化动态路由生成路由表的时候使用。

- lang：语言，默认 my-en。格式：国家-语言。

- env：环境，test 或者 production，默认 production，用于区别接口请求域名。

- webpack：是否执行 webpack 生成 dist-ssr 目录。默认 true，不执行 webpack 值为 false 或者 0。

### **生成路由表**

- 静态路由表：根据路由文件 routes.js 中的 path 生成文件目录结构。

- 动态路由表：根据 `/static-addition-config/routeHooks/routeName.js` 中的钩子  createDynamicRoutes 进行更改。输入：{  params: ... }，输出：路由表数组。【动态路由的接口请求统一使用全局唯一的接口管理 src/api 目录下的接口】

### **AMP**

在 `/static-addition-config/routeHooks/routeName.js`  中的钩子 createHtml 进行处理，调用 `/static-addition-config/common/convertHtmlToAMP.js` 将 HTML 数据转化为 AMP。该函数输入 `{ html: ... }` ，输出 html 数据。（文件名称对应 routes.js 中的 name）

### **页面发布路径处理**

处理页面发布路径，默认根据路由生成页面发布目录结构。如果需要更改，在 `/static-addition-config/routeHooks/routeName.js` 中的钩子 createPublishPath 进行处理，该函数输入`{ route: ... }` ，输出新路由 url。（文件名称对应 routes.js 中的 name）

### **上传静态资源到 S3**

`npm run deploy-s3` 或者 `node deployS3.js`

参数说明：

- `--lang`：语言
- `--env`：S3 正测服对应的 Bucket



## **说明**

* 项目思想参照 nuxt 思想和 ssr 项目思想

### **参考资料** 

[Sewar-x/SSG-Demo: 《从零到一搭建移动端SSG项目实践》| Sewen 博客 示例项目，项目仅作学习使用 (github.com)](https://github.com/Sewar-x/SSG-Demo)

[Nuxt源码](https://github.com/nuxt/nuxt.js/blob/dev/packages/generator/src/generator.js)

[SSR 源码](https://github.com/vuejs/vue-hackernews-2.0)
