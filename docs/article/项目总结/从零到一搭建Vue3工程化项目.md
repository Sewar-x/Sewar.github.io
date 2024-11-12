---
star: false
category:
  - 项目总结
tag:
  - 搭建 Vue3 项目
---
# 从零到一搭建 Vue3 单页面应用

## 框架技术栈

| 框架/插件    | 功能           |      |
| ------------ | -------------- | ---- |
| vue3         |                |      |
| typescript   |                |      |
| pinia        |                |      |
| vue-router   |                |      |
| vue-i18n     |                |      |
| element-plus |                |      |
| axios        |                |      |
| eslint       | js 规范        |      |
| less         | css 处理器     |      |
| commitlint   | git 提交规范   |      |
| husky        | git 钩子触发器 |      |



## 框架功能介绍

实现具备

* 代码代码规范
* git提交规范
* 前端自动化部署

## 初始化框架

1. 安装`Vue`

   ```shell
   npm init vue@latest
   ```

2. 初始化`Vite.config.ts`

   ```ts
   import { fileURLToPath, URL } from "node:url";
   
   import { defineConfig } from "vite";
   import vue from "@vitejs/plugin-vue";
   // 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
   import path from "path";
   // https://vitejs.dev/config/
   export default defineConfig({
     // 需要用到的插件数组
     plugins: [vue()],
     // 解析
     resolve: {
       alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
       },
     },
     // 开发或生产环境服务的公共基础路径
     base: "./",
     // 服务器选项
     server: {
       // 指定开发服务器端口
       port: 4000,
       // 在开发服务器启动时自动在浏览器中打开应用程序
       open: true,
       // 为开发服务器配置 CORS
       cors: true,
     },
   });
   ```

3. 初始化目录

   ```
   PROJECT
   ├─ .vscode
   │  └─ extensions.json
   ├─ bulid			# 打包配置模块
   ├─ public			# 公共资源模块
   │  └─ favicon.ico
   ├─ src
   │  ├─ api			# 接口管理模块
   │  ├─ assets		# 静态资源模块
   │  │  └─ logo.png
   │  ├─ common		# 自定义通用模块
   │  ├─ components	# 公共组件模块
   │  │  └─ HelloWorld.vue
   │  ├─ layouts		# 公共自定义布局
   │  ├─ router		# 路由
   │  ├─ stores		# pinia状态库
   │  ├─ style			# 样式资源模块
   │  ├─ utils			# 公共方法模块
   │  ├─ views			# 视图模块
   │  ├─ App.vue
   │  ├─ env.d.ts
   │  └─ main.ts		# 入口文件
   ├─ tests
   ├─ types			# 声明文件
   ├─ .gitignore
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ README.md
   ├─ tsconfig.json
   └─ vite.config.ts
   ```

## 初始化路由

1. 安装`Vue-Router`

   ```shell
   npm install vue-router@4
   ```

2. 配置路由文件，实现动态路由

   > 参考[权限管理-动态路由](https://sewar-x.github.io/projectsSummary/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%96%B9%E6%A1%88/#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)

3. 挂载路由

   ```ts
   import { createApp } from "vue";
   import App from "./App.vue";
   import router from "@/router/index";
   
   const app = createApp(App);
   
   app.use(router);
   
   app.mount("#app");
   ```

## 初始化状态仓库

1. 安装`Pinia`

   ```shell
   npm install pinia
   ```

2. 配置状态仓库

   `store -> index.ts`

   ```ts
   import type { App } from "vue";
   import { createPinia } from "pinia";
   
   const store = createPinia();
   
   export function setupStore(app: App<Element>) {
     app.use(store);
   }
   
   export { store };
   ```

   `store -> modules`：配置具体仓库，如`userStore`

   ```ts
   import { store } from "@/store";
   import { defineStore } from "pinia";
   
   export const useUserStore = defineStore({
     id: "user-store",
   
     state: () => ({}),
   
     getters: {},
       
     actions: {},
     
   });
   
   export function useUserStoreWithOut() {
     return useUserStore(store);
   }
   ```

3. 挂载状态仓库

   ```ts
   import { createApp } from "vue";
   import App from "./App.vue";
   import { setupStore } from "@/store";
   
   const app = createApp(App);
   
   // 配置状态仓库
   setupStore(app);
   
   app.mount("#app");
   ```

## 集成`element-plus`组件库

1. 安装`element-plus`组件库

   ```shell
   npm install element-plus --save
   ```

2. 导入方式选择

   - 完全导入——`packages/element-plus/fullLoad.ts`

     ```ts
     import type { App } from "vue";
     
     /**
      * 完整导入 element-plus 组件
      * @param app {App}
      */
     import ElementPlus from "element-plus";
     import "element-plus/dist/index.css";
     import "@/style/element-plus.css";
     import Modal from "@/components/Dialog";
     
     /**
      * 完整导入 element-plus 图标
      * @param app {App}
      */
     import * as ElementPlusIconsVue from "@element-plus/icons-vue";
     
     export default function fullLoadEl(app: App, params: Object) {
       app.use(ElementPlus, params);
       for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
         app.component(key, component);
       }
       Modal._context = app._context;
       return app;
     }
     ```

   - 按需导入——`packages/element-plus/loadOnDemand.ts`

     ```ts
     import type { App } from "vue";
     
     /**
      * 按需导入 element-plus 组件
      * @param app {App}
      */
     import "element-plus/dist/index.css";
     import { ElIcon, ElButton, ElInput, ElCheckbox } from "element-plus";
     import "@/style/element-plus.css";
     
     /**
      * 按需导入 element-plus 图标
      * @param app {App}
      */
     import { Edit, Tools, Location, Setting } from "@element-plus/icons-vue";
     
     export default function loadOnDemandEl(app: App) {
       [ElButton, ElIcon, ElInput, ElCheckbox].forEach((v) => {
         app.use(v);
       });
       [Edit, Tools, Location, Setting].forEach((v) => {
         app.component(v.name, v);
       });
       return app;
     }
     ```

3. 挂载`element-plus`

   - 依据项目配置`settings/projectSetting.ts -> loadOnDemandEl`判断`element-plus`加载方式——`packages/element-plus/el-import.ts`

     ```ts
     import type { ProjectSetting } from "#/setting"
     
     const setting: ProjectSetting = {
       // 项目名
       projectName: "PDP",
       // 按需加载Element-plus
       loadOnDemandEl: false,
       // element ui size
       elementSize: "mini",
     };
     
     export default setting;
     ```
   
     ```ts
     import type { App } from "vue";
     
     import setting from "@/settings/projectSetting";
     
     import fullLoadEl from "./fullLoad";
     import loadOnRemand from "./loadOnDemand";
     
     export default function setupElementPlus(app: App) {
       if (setting.loadOnDemandEl) {
         loadOnRemand(app);
       } else {
         fullLoadEl(app, { size: setting.elementSize });
       }
     }
     ```
   
   - 加载`element-plus`
   
     ```ts
     import { createApp } from "vue";
     import App from "./App.vue";
     import setupElementPlus from "@/packages/element-plus/el-import";
     
     const app = createApp(App);
     
     // 按需加载Element-Plus组件及图标
     setupElementPlus(app);
     
     app.mount("#app");
     ```

## 集成`axios`

1. 安装`axios`

   ```shell
   npm install axios
   ```

2. 封装`axios`——参考`vben-admin`对`axios`的封装

   - `packages/http/axios/index.ts`：入口文件，调用封装的`axios`类`VAxios`，传自设参数和项目预设参数的合并对象为参，生成`VAxios`实例对象

     ```ts
     import type { AxiosResponse } from "axios";
     import type { RequestOptions, Result } from "#/axios";
     /*
       export type ErrorMessageMode = "none" | "modal" | "message" | undefined;
       export type SuccessMessageMode = "none" | "message";
     
       export interface RequestOptions {
         // Format request parameter time
         formatDate?: boolean;
         // Whether to process the request result
         isTransformResponse?: boolean;
         // Whether to return native response headers
         // For example: use this attribute when you need to get the response headers
         isReturnNativeResponse?: boolean;
         // Error message prompt type
         errorMessageMode?: ErrorMessageMode;
         // Successful request message prompt
         successMessageMode?: SuccessMessageMode;
         // Whether to add a timestamp
         joinTime?: boolean;
         ignoreCancelToken?: boolean;
         // Whether to send token in header
         withToken?: boolean;
         // 请求重试机制
         retryRequest?: RetryRequest;
       }
     
       export interface Result<T = any> {
         code: number | string;
         type: "success" | "error" | "warning";
         msg: string;
         data: T;
       }
     
       // multipart/form-data: upload file
       export interface UploadFileParams {
         // Other parameters
         data?: Recordable;
         // File parameter interface field name
         name?: string;
         // file name
         file: File | Blob;
         // file name
         filename?: string;
         [key: string]: any;
       }
     */
     import type { AxiosTransform, CreateAxiosOptions } from "@/packages/http/axios/axiosTransform";
     import axios from "axios";
     import { clone } from "lodash-es";
     import { VAxios } from "@/packages/http/axios/Axios";
     import { checkStatus } from "@/packages/http/axios/checkStatus";
     import { AxiosRetry } from "@/packages/http/axios/axiosRetry";
     import { joinTimestamp, formatRequestDate } from "@/packages/http/axios/helper";
     import { RequestEnum, ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";
     /*
     
       // @description: Request result set
       export enum ResultEnum {
         SUCCESS = 200,
         ERROR = -1,
         TIMEOUT = 401,
         TYPE = "success",
       }
     
       // @description: request method
       export enum RequestEnum {
         GET = "GET",
         POST = "POST",
         PUT = "PUT",
         DELETE = "DELETE",
       }
     
       // @description:  contentType
       export enum ContentTypeEnum {
         // json
         JSON = "application/json;charset=UTF-8",
         // form-data qs
         FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
         // form-data  upload
         FORM_DATA = "multipart/form-data;charset=UTF-8",
       }
     */
     import { deepMerge } from "@/utils";
     /*
       export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
         let key: string;
         for (key in target) {
           src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
         }
         return src;
       }
     */
     import { getAppEnvConfig } from "@/utils/env";
     /* 
       // build/getConfigFileName.ts
       export const getConfigFileName = (env: Record<string, any>) => {
         return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || "__APP"}__CONF__`
           .toUpperCase()
           .replace(/\s/g, "");
       };
     
       export function getAppEnvConfig() {
         const ENV_NAME = getConfigFileName(import.meta.env);
           
         const ENV = (import.meta.env.DEV
           ? // Get the global configuration (the configuration will be extracted independently when packaging)
             (import.meta.env as unknown as GlobEnvConfig)
           : window[ENV_NAME as any]) as unknown as GlobEnvConfig;
     
         const { VITE_GLOB_API_URL } = ENV;
     
         return {
           VITE_GLOB_API_URL,
         };
      }
     */
     import { removeToken，getToken } from "@/utils/token";
     /*
       import Cookies from "js-cookie";
     
       const TokenKey = "Token";
     
       export function getToken() {
         return Cookies.get(TokenKey);
       }
     
       export function setToken(token: string) {
         return Cookies.set(TokenKey, token);
       }
     
       export function removeToken() {
         return Cookies.remove(TokenKey);
       }
     */
     import { isString } from "@/utils/is";
     /*
       const toString = Object.prototype.toString;
     
       export function is(val: unknown, type: string) {
         return toString.call(val) === `[object ${type}]`;
       }
       
       export function isString(val: unknown): val is string {
         return is(val, "String");
       }
     */
     import { useUserStoreWithOut } from "$store/user";
     import { ElMessage, ElMessageBox } from "element-plus";
     import { s } from "$locale";
     
     const { VITE_GLOB_API_URL } = getAppEnvConfig();
     
     const transform: AxiosTransform = {
       /**
        * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
        */
       transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
         const { isTransformResponse, isReturnNativeResponse, successMessageMode } = options;
         // 是否返回原生响应头 比如：需要获取响应头时使用该属性
         if (isReturnNativeResponse) {
           return res;
         }
         // 不进行任何处理，直接返回
         // 用于页面代码可能需要直接获取code，data，message这些信息时开启
         if (!isTransformResponse) {
           return res.data;
         }
         // 错误的时候返回
         const result = res.data;
         if (!result) {
           // return '[HTTP] Request has no return value';
           throw new Error(s("请求出错，请稍后重试"));
         }
         //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
         const { code, data, msg } = result;
     
         // 这里逻辑可以根据项目进行修改
         const hasSuccess = result && Reflect.has(result, "code") && code === ResultEnum.SUCCESS;
         if (hasSuccess) {
           if (successMessageMode === "message") {
             ElMessage({
               message: result.msg,
               type: "success",
             });
           }
           return data;
         }
     
         // 在此处根据自己项目的实际情况对不同的code执行不同的操作
         // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
         let timeoutMsg = "";
         switch (code) {
           case ResultEnum.TIMEOUT:
             timeoutMsg = s("登录超时，请重新登录！");
             const userStore = useUserStoreWithOut();
             removeToken();
             userStore.Logout(true);
             break;
           default:
             if (msg) {
               timeoutMsg = msg;
             }
         }
     
         // token过期的操作
         if (timeoutMsg === "登录过期，请重新登录!") {
           ElMessageBox({
             type: "error",
             title: s("错误提示"),
             message: timeoutMsg,
             confirmButtonText: s("确认"),
             callback: function (action: string) {
               if (action === "confirm") {
                 removeToken();
                 const userStore = useUserStoreWithOut();
                 userStore.Logout(true);
               }
             },
           });
           return;
         }
     
         // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
         // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
         if (options.errorMessageMode === "modal") {
           if (timeoutMsg === "登录过期，请重新登录!") {
             ElMessageBox({
               type: "error",
               title: s("错误提示"),
               message: timeoutMsg,
               confirmButtonText: s("确认"),
               callback: function (action: string) {
                 if (action === "confirm") {
                   removeToken();
                   const userStore = useUserStoreWithOut();
                   userStore.Logout(true);
                 }
               },
             });
           } else {
             ElMessageBox({
               type: "error",
               title: s("错误提示"),
               message: timeoutMsg,
               confirmButtonText: s("确认"),
             });
           }
         } else if (options.errorMessageMode === "message") {
           if (timeoutMsg === "登录过期，请重新登录!") {
             ElMessageBox({
               type: "error",
               title: s("错误提示"),
               message: timeoutMsg,
               confirmButtonText: s("确认"),
               callback: function (action: string) {
                 if (action === "confirm") {
                   removeToken();
                   const userStore = useUserStoreWithOut();
                   userStore.Logout(true);
                 }
               },
             });
           } else {
             ElMessage.error(timeoutMsg);
           }
         }
     
         throw new Error(timeoutMsg || s("请求出错，请稍后重试"));
       },
     
       // 请求之前处理config
       beforeRequestHook: (config, options) => {
         const { formatDate, joinTime = true } = options;
     
         const params = config.params || {};
         const data = config.data || false;
         formatDate && data && !isString(data) && formatRequestDate(data);
         if (config.method?.toUpperCase() === RequestEnum.GET) {
           if (!isString(params)) {
             // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
             config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
           } else {
             // 兼容restful风格
             config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
             config.params = undefined;
           }
         } else {
           if (!isString(params)) {
             formatDate && formatRequestDate(params);
             if (
               Reflect.has(config, "data") &&
               config.data &&
               (Object.keys(config.data).length > 0 || config.data instanceof FormData)
             ) {
               config.data = data;
               config.params = params;
             } else {
               // 非GET请求如果没有提供data，则将params视为data
               config.data = params;
               config.params = undefined;
             }
           } else {
             // 兼容restful风格
             config.url = config.url + params;
             config.params = undefined;
           }
         }
         return config;
       },
     
       /**
        * @description: 请求拦截器处理
        */
       requestInterceptors: (config, options) => {
         // 请求之前处理config
         const token = getToken();
         if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
           // jwt token
           (config as Recordable).headers.Authorization = options.authenticationScheme
             ? `${options.authenticationScheme} ${token}`
             : token;
         }
         return config;
       },
     
       /**
        * @description: 响应拦截器处理
        */
       responseInterceptors: (res: AxiosResponse<any>) => {
         return res;
       },
     
       /**
        * @description: 响应错误处理
        */
       responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
         const { response, code, message, config } = error || {};
         const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
         const msg: string = response?.data?.error?.message ?? "";
         const err: string = error?.toString?.() ?? "";
         let errMessage = "";
     
         if (axios.isCancel(error)) {
           return Promise.reject(error);
         }
     
         try {
           if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
             errMessage = s("接口请求超时，请刷新页面重试！");
           }
           if (err?.includes("Network Error")) {
             errMessage = s("网络异常，请检查您的网络连接是否正常！");
           }
     
           if (errMessage) {
             if (errorMessageMode === "modal") {
               ElMessageBox({
                 type: "error",
                 title: s("错误提示"),
                 message: errMessage,
                 confirmButtonText: s("确认"),
               });
             } else if (errorMessageMode === "message") {
               ElMessage.error(errMessage);
             }
             return Promise.reject(error);
           }
         } catch (error) {
           throw new Error(error as unknown as string);
         }
     
         checkStatus(error?.response?.status, msg, errorMessageMode);
     
         // 添加自动重试机制 保险起见 只针对GET请求
         const retryRequest = new AxiosRetry();
         const { isOpenRetry } = config.requestOptions.retryRequest;
         config.method?.toUpperCase() === RequestEnum.GET &&
           isOpenRetry &&
           // @ts-ignore
           retryRequest.retry(axiosInstance, error);
         return Promise.reject(error);
       },
     };
     
     function createAxios(opt?: Partial<CreateAxiosOptions>) {
       return new VAxios(
         deepMerge(
           {
             authenticationScheme: "Bearer",
             timeout: 10 * 1000,
             // 基础接口地址
             baseURL: "basic-api",
             headers: { "Content-Type": ContentTypeEnum.JSON },
             // 数据处理方式 clone——克隆，对象的深拷贝
             transform: clone(transform),
     
             requestOptions: {
               // 是否返回原生响应头 比如：需要获取响应头时使用该属性
               isReturnNativeResponse: false,
               // 需要对返回数据进行处理
               isTransformResponse: true,
               // 格式化提交参数时间
               formatDate: true,
               // 消息提示类型
               errorMessageMode: "message",
               // 成功请求消息提示
               successMessageMode: "message",
               //  是否加入时间戳
               joinTime: true,
               // 忽略重复请求
               ignoreCancelToken: true,
               // 是否携带token
               withToken: true,
               retryRequest: {
                 isOpenRetry: true,
                 count: 5,
                 waitTime: 100,
               },
             },
           },
           opt || {},
         ),
       );
     }
     export const defHttp = createAxios();
     ```

   - `packages/http/axios/Axios.ts`：将`axios`封装成一个类

     ```ts
     import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from "axios";
     import type { RequestOptions, Result, UploadFileParams } from "#/axios";
     import type { CreateAxiosOptions } from "./axiosTransform";
     import axios from "axios";
     // import qs from 'qs';
     import { AxiosCanceler } from "./axiosCancel";
     import { isFunction } from "@/utils/is";
     /*
       export function isFunction(val: unknown): val is Function {
         return typeof val === "function";
       }
     */
     import { cloneDeep } from "lodash-es";
     import { ContentTypeEnum } from "@/enums/httpEnum";
     // import { RequestEnum } from "@/enums/httpEnum";
     
     export * from "./axiosTransform";
     
     export class VAxios {
       private axiosInstance: AxiosInstance;
       private readonly options: CreateAxiosOptions;
     
       constructor(options: CreateAxiosOptions) {
         this.options = options;
         this.axiosInstance = axios.create(options);
         this.setupInterceptors();
       }
     
       /**
        * @description:  Create axios instance
        */
       private createAxios(config: CreateAxiosOptions): void {
         this.axiosInstance = axios.create(config);
       }
     
       private getTransform() {
         const { transform } = this.options;
         return transform;
       }
     
       getAxios(): AxiosInstance {
         return this.axiosInstance;
       }
     
       /**
        * @description: Reconfigure axios  重新配置axios
        */
       configAxios(config: CreateAxiosOptions) {
         if (!this.axiosInstance) {
           return;
         }
         this.createAxios(config);
       }
     
       /**
        * @description: Set general header 设置通用请求头
        */
       setHeader(headers: any): void {
         if (!this.axiosInstance) {
           return;
         }
         Object.assign(this.axiosInstance.defaults.headers, headers);
       }
     
       /**
        * @description: Interceptor configuration 拦截器配置
        */
       private setupInterceptors() {
         const transform = this.getTransform();
     
         if (!transform) {
           return;
         }
         const {
           requestInterceptors,
           requestInterceptorsCatch,
           responseInterceptors,
           responseInterceptorsCatch,
         } = transform;
     
         const axiosCanceler = new AxiosCanceler();
     
         // Request interceptor configuration processing
         this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
           // If cancel repeat request is turned on, then cancel repeat request is prohibited
           // @ts-ignore
           const { ignoreCancelToken } = config.requestOptions;
           const ignoreCancel =
             ignoreCancelToken !== undefined
               ? ignoreCancelToken
               : this.options.requestOptions?.ignoreCancelToken;
     
           !ignoreCancel && axiosCanceler.addPending(config);
           if (requestInterceptors && isFunction(requestInterceptors)) {
             config = requestInterceptors(config, this.options);
           }
           return config;
         }, undefined);
     
         // Request interceptor error capture
         requestInterceptorsCatch &&
           isFunction(requestInterceptorsCatch) &&
           this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);
     
         // Response result interceptor processing
         this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
           res && axiosCanceler.removePending(res.config);
           if (responseInterceptors && isFunction(responseInterceptors)) {
             res = responseInterceptors(res);
           }
           return res;
         }, undefined);
     
         // Response result interceptor error capture
         responseInterceptorsCatch &&
           isFunction(responseInterceptorsCatch) &&
           this.axiosInstance.interceptors.response.use(undefined, (error) => {
             // @ts-ignore
             return responseInterceptorsCatch(this.axiosInstance, error);
           });
       }
     
       /**
        * @description:  File Upload
        */
       uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
         const formData = new window.FormData();
         const customFilename = params.name || "file";
     
         if (params.filename) {
           formData.append(customFilename, params.file, params.filename);
         } else {
           formData.append(customFilename, params.file);
         }
     
         if (params.data) {
           Object.keys(params.data).forEach((key) => {
             const value = params.data![key];
             if (Array.isArray(value)) {
               value.forEach((item) => {
                 formData.append(`${key}[]`, item);
               });
               return;
             }
     
             formData.append(key, params.data![key]);
           });
         }
     
         return this.axiosInstance.request<T>({
           ...config,
           method: "POST",
           data: formData,
           headers: {
             "Content-type": ContentTypeEnum.FORM_DATA,
             // @ts-ignore
             ignoreCancelToken: true,
           },
         });
       }
     
       get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
         return this.request({ ...config, method: "GET" }, options);
       }
     
       post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
         return this.request({ ...config, method: "POST" }, options);
       }
     
       put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
         return this.request({ ...config, method: "PUT" }, options);
       }
     
       delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
         return this.request({ ...config, method: "DELETE" }, options);
       }
     
       request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
         let conf: CreateAxiosOptions = cloneDeep(config);
         const transform = this.getTransform();
     
         const { requestOptions } = this.options;
     
         const opt: RequestOptions = Object.assign({}, requestOptions, options);
     
         const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};
         if (beforeRequestHook && isFunction(beforeRequestHook)) {
           conf = beforeRequestHook(conf, opt);
         }
         conf.requestOptions = opt;
     
         return new Promise((resolve, reject) => {
           this.axiosInstance
             .request<any, AxiosResponse<Result>>(conf)
             .then((res: AxiosResponse<Result>) => {
               if (transformResponseHook && isFunction(transformResponseHook)) {
                 try {
                   const ret = transformResponseHook(res, opt);
                   resolve(ret);
                 } catch (err) {
                   reject(err || new Error("request error!"));
                 }
                 return;
               }
               resolve(res as unknown as Promise<T>);
             })
             .catch((e: Error | AxiosError) => {
               if (requestCatchHook && isFunction(requestCatchHook)) {
                 reject(requestCatchHook(e, opt));
                 return;
               }
               if (axios.isAxiosError(e)) {
                 // rewrite error message from axios in here
               }
               reject(e);
             });
         });
       }
     }
     ```

   - `packages/http/axios/checkStatus.ts`：依据请求返回状态码显示提醒信息

     ```ts
     import type { ErrorMessageMode } from "#/axios";
     import { s } from "$locale";
     import { ElMessage, ElMessageBox } from "element-plus";
     import { removeToken } from "@/utils/token";
     import { useUserStoreWithOut } from "$store/user";
     
     export function checkStatus(
       status: number,
       msg: string,
       errorMessageMode: ErrorMessageMode = "message",
     ): void {
       let errMessage = "";
     
       switch (status) {
         case 400:
           errMessage = `${msg}`;
           break;
         // 401: Not logged in
         // Jump to the login page if not logged in, and carry the path of the current page  如果未登录，则跳转到登录页面，并携带当前页面的路径
         // Return to the current page after successful login. This step needs to be operated on the login page. 登录成功后返回当前界面。该步骤需要在登录页面进行操作。
         case 401:
           removeToken();
           errMessage = msg || s("用户没有权限（令牌、用户名、密码错误）!");
           const userStore = useUserStoreWithOut();
           userStore.Logout(true);
           break;
         case 403:
           errMessage = s("用户得到授权，但是访问是被禁止的。!");
           break;
         // 404请求不存在
         case 404:
           errMessage = s("网络请求错误,未找到该资源!");
           break;
         case 405:
           errMessage = s("网络请求错误,请求方法未允许!");
           break;
         case 408:
           errMessage = s("网络请求超时!");
           break;
         case 500:
           errMessage = s("服务器错误,请联系管理员!");
           break;
         case 501:
           errMessage = s("网络未实现!");
           break;
         case 502:
           errMessage = s("网络错误!");
           break;
         case 503:
           errMessage = s("服务不可用，服务器暂时过载或维护!");
           break;
         case 504:
           errMessage = s("网络超时!");
           break;
         case 505:
           errMessage = s("http版本不支持该请求!");
           break;
         default:
       }
     
       if (errMessage) {
         if (errorMessageMode === "modal") {
           ElMessageBox({
             type: "error",
             title: s("错误提示"),
             message: errMessage,
             confirmButtonText: s("确认"),
           });
         } else if (errorMessageMode === "message") {
           ElMessage.error({
             message: errMessage,
           });
         }
       }
     }
     ```

   - `packages/http/axios/helper.ts`

     ```ts
     import { isObject, isString } from "@/utils/is";
     
     const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
     
     export function joinTimestamp<T extends boolean>(
       join: boolean,
       restful: T,
     ): T extends true ? string : object;
     
     export function joinTimestamp(join: boolean, restful = false): string | object {
       if (!join) {
         return restful ? "" : {};
       }
       const now = new Date().getTime();
       if (restful) {
         return `?_t=${now}`;
       }
       return { _t: now };
     }
     
     /**
      * @description: Format request parameter time  格式化请求参数时间
      */
     export function formatRequestDate(params: Recordable) {
       if (Object.prototype.toString.call(params) !== "[object Object]") {
         return;
       }
     
       for (const key in params) {
         const format = params[key]?.format ?? null;
         if (format && typeof format === "function") {
           params[key] = params[key].format(DATE_TIME_FORMAT);
         }
         if (isString(key)) {
           const value = params[key];
           if (value) {
             try {
               params[key] = isString(value) ? value.trim() : value;
             } catch (error: any) {
               throw new Error(error);
             }
           }
         }
         if (isObject(params[key])) {
           formatRequestDate(params[key]);
         }
       }
     }
     ```

   - `packages/http/axios/axiosCancel.ts`：避免因网络问题多次请求，即请求时判断该请求是否存在请求列表，是则删除之前的请求

     ```ts
     import type { AxiosRequestConfig, Canceler } from "axios";
     import axios from "axios";
     import { isFunction } from "@/utils/is";
     
     // Used to store the identification and cancellation function of each request
     let pendingMap = new Map<string, Canceler>();
     
     export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join("&");
     
     export class AxiosCanceler {
       /**
        * Add request
        * @param {Object} config
        */
       addPending(config: AxiosRequestConfig) {
         this.removePending(config);
         const url = getPendingUrl(config);
         config.cancelToken =
           config.cancelToken ||
           new axios.CancelToken((cancel) => {
             if (!pendingMap.has(url)) {
               // If there is no current request in pending, add it
               pendingMap.set(url, cancel);
             }
           });
       }
     
       /**
        * @description: Clear all pending
        */
       removeAllPending() {
         pendingMap.forEach((cancel) => {
           cancel && isFunction(cancel) && cancel();
         });
         pendingMap.clear();
       }
     
       /**
        * Removal request
        * @param {Object} config
        */
       removePending(config: AxiosRequestConfig) {
         const url = getPendingUrl(config);
     
         if (pendingMap.has(url)) {
           // If there is a current request identifier in pending,
           // the current request needs to be cancelled and removed
           const cancel = pendingMap.get(url);
           cancel && cancel(url);
           pendingMap.delete(url);
         }
       }
     
       /**
        * @description: reset
        */
       reset(): void {
         pendingMap = new Map<string, Canceler>();
       }
     }
     ```

   - `packages/http/axios/axiosRetry.ts`：请求失败时发起重试请求

     ```ts
     import type { AxiosError, AxiosInstance } from "axios";
     /**
      *  请求重试机制
      */
     
     export class AxiosRetry {
       /**
        * 重试
        */
       retry(AxiosInstance: AxiosInstance, error: AxiosError) {
         // @ts-ignore
         const { config } = error.response;
         const { waitTime, count } = config?.requestOptions?.retryRequest;
         config.__retryCount = config.__retryCount || 0;
         if (config.__retryCount >= count) {
           return Promise.reject(error);
         }
         config.__retryCount += 1;
         return this.delay(waitTime).then(() => AxiosInstance(config));
       }
     
       /**
        * 延迟
        */
       private delay(waitTime: number) {
         return new Promise((resolve) => setTimeout(resolve, waitTime));
       }
     }
     ```

   - `packages/http/axios/axiosTransform.ts`

     ```ts
     /**
      * Data processing class, can be configured according to the project
      */
     import type { AxiosRequestConfig, AxiosResponse } from "axios";
     import type { RequestOptions, Result } from "#/axios";
     
     export interface CreateAxiosOptions extends AxiosRequestConfig {
       authenticationScheme?: string;
       transform?: AxiosTransform;
       requestOptions?: RequestOptions;
     }
     
     export abstract class AxiosTransform {
       /**
        * @description: Process configuration before request
        * @description: Process configuration before request
        */
       beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
     
       /**
        * @description: 处理响应数据
        */
       transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;
     
       /**
        * @description: 请求失败处理
        */
       requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
     
       /**
        * @description: 请求之前的拦截器
        */
       requestInterceptors?: (
         config: AxiosRequestConfig,
         options: CreateAxiosOptions,
       ) => AxiosRequestConfig;
     
       /**
        * @description: 请求之后的拦截器
        */
       responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
     
       /**
        * @description: 请求之前的拦截器错误处理
        */
       requestInterceptorsCatch?: (error: Error) => void;
     
       /**
        * @description: 请求之后的拦截器错误处理
        */
       responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;
     }
     ```

3. 示例

   ```ts
   import { defHttp } from "@/packages/http/axios";
   
   import type { ErrorMessageMode } from "#/axios";
   /* export type ErrorMessageMode = "none" | "modal" | "message" | undefined; */
   
   // 登录
   export function login(params = {}, mode: ErrorMessageMode = "modal") {
     return defHttp.post(
       {
         url: "/login/login",
         params,
       },
       {
         errorMessageMode: mode,
       },
     );
   }
   ```

   

## 集成CSS预编译器——Stylus/Sass/Less

1. 安装CSS预编译器（Vite 本身对 CSS（Sass/Scss、Less 和 Stylus）各种预处理器语言做了内置支持，可以直接安装使用，Vite 底层会调 用 CSS 预处理器的官方库进行编译）

   ```shell
   npm i stylus -D
   # or
   npm i sass -D
   npm i scss -D
   npm i less -D
   ```

2. 解决浏览器兼容性问题，为不同的目标浏览器添加样式前缀

   - 安装`autoprefixer`

     ```ts
     npm i autoprefixer -D
     ```

   - 在根目录创建`postcss.config.js`文件

     ```ts
     module.exports = {
       plugins: {
         autoprefixer: {},
       },
     };
     ```

## 集成`Prettier`——代码格式化工具

1. 安装`Prettier`

   ```shell
   npm i prettier -D
   ```

2. 在根目录创建`.prettierrc.json`文件、`.prettierignore`文件

   ```json
   // .prettierrc.json——Prettier配置文件
   {
     "printWidth": 100,
     "semi": true,
     "vueIndentScriptAndStyle": true,
     "singleQuote": true,
     "trailingComma": "all",
     "proseWrap": "never",
     "htmlWhitespaceSensitivity": "strict",
     "endOfLine": "auto"
   }
   ```

   ```json
   // .prettierignore文件——Prettier忽略的文件配置
   /dist/*
   .local
   .output.js
   /node_modules/**
   
   **/*.svg
   **/*.sh
   
   /public/*
   ```

## 集成`ESLint`——代码质量校验工具

1. 安装`ESLint`

   ```shell
   npm i eslint -D
   ```

2. 在根目录创建`.eslintrc.cjs`文件、`.eslintignore`文件

   ```js
   // .eslintrc.cjs——ESLint配置文件
   /* eslint-env node */
   require("@rushstack/eslint-patch/modern-module-resolution");
   
   module.exports = {
     /*
       默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有   "root": true，它就会停止在父级目录中寻找。
     */
     root: true,
     env: {
       // 浏览器环境中的全局变量
       browser: true,
       // Node.js 全局变量和 Node.js 作用域
       node: true,
       // 启用除了 modules 以外的所有 ECMAScript 6 特性
       es6: true,
     },
     /*
     	指定npm模块自定义为项目的解析器，默认ESpree
     	注意，在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 parserOptions 仍然是必须的。解析器会被传入 			parserOptions，但是不一定会使用它们来决定功能特性的开关。
     */
     parser: "vue-eslint-parser",
     parserOptions: {
       parser: "@typescript-eslint/parser",
       // 指定想要使用的 ECMAScript 版本
       ecmaVersion: "latest",
       // "script" (默认) 或 "module"（如果代码是 ECMAScript 模块)。
       sourceType: "module",
       ecmaFeatures: {
         // 启用 JSX
         jsx: true,
         /*
         	globalReturn - 允许在全局作用域下使用 return 语句
   		impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
         */
       },
     },
     extends: [
       "plugin:vue/vue3-recommended",
       "plugin:@typescript-eslint/recommended",
       "plugin:prettier/recommended",
     ],
     rules: {	// 校验规则
       /*
         "off" or 0 - 关闭规则
   	  "warn" or 1 - 将规则视为一个警告（不会影响退出码）
   	  "error" or 2 - 将规则视为一个错误 (退出码为1)
       */
       "vue/script-setup-uses-vars": "error",
       "@typescript-eslint/ban-ts-ignore": "off",
       "@typescript-eslint/explicit-function-return-type": "off",
       "@typescript-eslint/no-explicit-any": "off",
       "@typescript-eslint/no-var-requires": "off",
       "@typescript-eslint/no-empty-function": "off",
       "vue/custom-event-name-casing": "off",
       "no-use-before-define": "off",
       "@typescript-eslint/no-use-before-define": "off",
       "@typescript-eslint/ban-ts-comment": "off",
       "@typescript-eslint/ban-types": "off",
       "@typescript-eslint/no-non-null-assertion": "off",
       "@typescript-eslint/explicit-module-boundary-types": "off",
       "@typescript-eslint/no-unused-vars": [
         "error",
         {
           argsIgnorePattern: "^_",
           varsIgnorePattern: "^_",
         },
       ],
       "no-unused-vars": [
         "error",
         {
           argsIgnorePattern: "^_",
           varsIgnorePattern: "^_",
         },
       ],
       "space-before-function-paren": "off",
   
       "vue/attributes-order": "off",
       "vue/one-component-per-file": "off",
       "vue/html-closing-bracket-newline": "off",
       "vue/max-attributes-per-line": "off",
       "vue/multiline-html-element-content-newline": "off",
       "vue/singleline-html-element-content-newline": "off",
       "vue/attribute-hyphenation": "off",
       "vue/require-default-prop": "off",
       "vue/require-explicit-emits": "off",
       "vue/html-self-closing": [
         "error",
         {
           html: {
             void: "always",
             normal: "never",
             component: "always",
           },
           svg: "always",
           math: "always",
         },
       ],
       "vue/multi-word-component-names": "off",
     },
   };
   ```

   ```js
   // .eslintignore——ESLint忽略的文件配置
   *.sh
   node_modules
   *.md
   *.woff
   *.ttf
   .vscode
   .idea
   dist
   /public
   /docs
   .husky
   .local
   /bin
   Dockerfile
   ```

## 集成`Stylelint`——规范CSS代码

1. 安装`Stylelint`

   ```shell
   npm install stylelint -D	# 安装stylelint
   npm install stylelint-config-standard -D	# stylelint基本配置规则
   npm install stylelint-order -D	# 一个检测stylelint规则的插件包，每个规则都支持自动修复。
   npm install stylelint-config-prettier -D	# 关闭所有不必要的或可能与prettier冲突的规则。这样可以使用自己最喜欢的可共享配置规则，而不会让它的												风格选择在使用Prettier时成为阻碍。
   npm install stylelint-config-recommended -D		# 打开所有帮助避免错误的Stylelint规则。按原样使用或作为Stylelint配置的基础。
   npm install stylelint-config-recommended-vue -D		# 扩展stylesent -config-recommended共享配置，并为Vue配置其规则
   ```

2. 在根目录创建`stylelint.config.js`文件、`.stylelintignore`文件

   ```js
   // stylelint.config.js——stylelint配置文件
   module.exports = {
     root: true,
     plugins: ["stylelint-order"],
     extends: ["stylelint-config-standard", "stylelint-config-prettier"],
     customSyntax: "postcss-html",
     rules: {
       "function-no-unknown": null,
       "selector-class-pattern": null,
       "selector-pseudo-class-no-unknown": [
         true,
         {
           ignorePseudoClasses: ["global"],
         },
       ],
       "selector-pseudo-element-no-unknown": [
         true,
         {
           ignorePseudoElements: ["v-deep"],
         },
       ],
       "at-rule-no-unknown": [
         true,
         {
           ignoreAtRules: [
             "tailwind",
             "apply",
             "variants",
             "responsive",
             "screen",
             "function",
             "if",
             "each",
             "include",
             "mixin",
           ],
         },
       ],
       "no-empty-source": null,
       "string-quotes": null,
       "named-grid-areas-no-invalid": null,
       "unicode-bom": "never",
       "no-descending-specificity": null,
       "font-family-no-missing-generic-family-keyword": null,
       "declaration-colon-space-after": "always-single-line",
       "declaration-colon-space-before": "never",
       // 'declaration-block-trailing-semicolon': 'always',
       "rule-empty-line-before": [
         "always",
         {
           ignore: ["after-comment", "first-nested"],
         },
       ],
       "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
       "order/order": [
         [
           "dollar-variables",
           "custom-properties",
           "at-rules",
           "declarations",
           {
             type: "at-rule",
             name: "supports",
           },
           {
             type: "at-rule",
             name: "media",
           },
           "rules",
         ],
         { severity: "warning" },
       ],
     },
     ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
     overrides: [
       {
         files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
         extends: ["stylelint-config-recommended"],
         rules: {
           "keyframes-name-pattern": null,
           "selector-pseudo-class-no-unknown": [
             true,
             {
               ignorePseudoClasses: ["deep", "global"],
             },
           ],
           "selector-pseudo-element-no-unknown": [
             true,
             {
               ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
             },
           ],
         },
       },
       {
         files: ["*.less", "**/*.less"],
         customSyntax: "postcss-less",
         extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
       },
     ],
   };
   ```

   ```
   // .stylelintignore——stylelint忽略的文件配置
   /dist/*
   /public/*
   public/*
   /doc/*
   ```

## 集成`commitlint`——`git`提交规范

1. 安装`commitlint`

   ```
   npm i @commitlint/config-conventional @commitlint/cli -D
   ```

2. 在根目录创建`commitlint.config.js`文件

   ```js
   /**
    * Commitlint 检测提交信息是否规范；
    */
   
   const fs = require("fs");
   const path = require("path");
   const { execSync } = require("child_process");
   
   const scopes = fs
     .readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
     .filter((dirent) => dirent.isDirectory())
     .map((dirent) => dirent.name.replace(/s$/, ""));
   
   // precomputed scope
   const scopeComplete = execSync("git status --porcelain || true")
     .toString()
     .trim()
     .split("\n")
     .find((r) => ~r.indexOf("M  src"))
     ?.replace(/(\/)/g, "%%")
     ?.match(/src%%((\w|-)*)/)?.[1]
     ?.replace(/s$/, "");
   
   module.exports = {
     ignores: [(commit) => commit.includes("init")],
     extends: ["@commitlint/config-conventional"],
     rules: {
       "body-leading-blank": [2, "always"],
       "footer-leading-blank": [1, "always"],
       "header-max-length": [2, "always", 108],
       "subject-empty": [2, "never"],
       "type-empty": [2, "never"],
       "subject-case": [0],
       "type-enum": [
         2,
         "always",
         [
           "feat",
           "fix",
           "perf",
           "style",
           "docs",
           "test",
           "refactor",
           "build",
           "ci",
           "chore",
           "revert",
           "wip",
           "workflow",
           "types",
           "release",
         ],
       ],
     },
     prompt: {
       /** @use `yarn commit :f` */
       alias: {
         f: "docs: fix typos",
         r: "docs: update README",
         s: "style: update code format",
         b: "build: bump dependencies",
         c: "chore: update config",
       },
       customScopesAlign: !scopeComplete ? "top" : "bottom",
       defaultScope: scopeComplete,
       scopes: [...scopes, "mock"],
       allowEmptyIssuePrefixs: false,
       allowCustomIssuePrefixs: false,
   
       // English
       typesAppend: [
         { value: "wip", name: "wip:      work in process" },
         { value: "workflow", name: "workflow: workflow improvements" },
         { value: "types", name: "types:    type definition file changes" },
       ],
   
       // 中英文对照版
       // messages: {
       //   type: '选择你要提交的类型 :',
       //   scope: '选择一个提交范围 (可选):',
       //   customScope: '请输入自定义的提交范围 :',
       //   subject: '填写简短精炼的变更描述 :\n',
       //   body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
       //   breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
       //   footerPrefixsSelect: '选择关联issue前缀 (可选):',
       //   customFooterPrefixs: '输入自定义issue前缀 :',
       //   footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
       //   confirmCommit: '是否提交或修改commit ?',
       // },
       // types: [
       //   { value: 'feat', name: 'feat:     新增功能' },
       //   { value: 'fix', name: 'fix:      修复缺陷' },
       //   { value: 'docs', name: 'docs:     文档变更' },
       //   { value: 'style', name: 'style:    代码格式' },
       //   { value: 'refactor', name: 'refactor: 代码重构' },
       //   { value: 'perf', name: 'perf:     性能优化' },
       //   { value: 'test', name: 'test:     添加疏漏测试或已有测试改动' },
       //   { value: 'build', name: 'build:    构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)' },
       //   { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
       //   { value: 'revert', name: 'revert:   回滚 commit' },
       //   { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)' },
       //   { value: 'wip', name: 'wip:      正在开发中' },
       //   { value: 'workflow', name: 'workflow: 工作流程改进' },
       //   { value: 'types', name: 'types:    类型定义文件修改' },
       // ],
       // emptyScopesAlias: 'empty:      不填写',
       // customScopesAlias: 'custom:     自定义',
     },
   };
   ```

## 集成`husky`和`lint-staged`——`git`命令钩子函数

1. `husky`

   - 安装`husky`，使用 `husky-init` 命令快速在项目初始化一个 husky 配置

     ```shell
     npx husky-init ; npm install
     
     # 1.安装 husky 到开发依赖
     # 2.在项目根目录下创建 .husky 目录
     # 3.在 .husky 目录创建 pre-commit hook，并初始化 pre-commit 命令为 npm test
     # 4.修改 package.json 的 scripts，增加 "prepare": "husky install"
     ```

     husky 包含很多 `hook`（钩子），常用有：`pre-commit`、`commit-msg`、`pre-push`。

     学习链接：[GitHook 工具 —— husky介绍及使用 ](https://www.cnblogs.com/jiaoshou/p/12222665.html)

   - 修改`package.json`

     ```json
     {
       "scipts": {
       },
       "husky": {
         "hooks": {
           "...": "..."
         }
       }
     }
     ```

2. `lint-staged`

   - lint-staged 是一个在git暂存文件上运行linters的工具，它一般结合 husky 来使用，它可以让 husky 的 `hook` 触发的命令只作用于 `git add`那些文件（即 git 暂存区的文件），而不会影响到其他文件，对git暂存区的文件执行一次lint检查

     学习链接：[lint-staged 使用教程](https://www.cnblogs.com/jiaoshou/p/12250278.html)

   - 修改`package.json`

     ```json
     {
       "lint-staged": {
         "*.{js,jsx,ts,tsx}": [
           "eslint --fix",
           "prettier --write"
         ],
         "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
           "prettier --write--parser json"
         ],
         "package.json": [
           "prettier --write"
         ],
         "*.vue": [
           "eslint --fix",
           "prettier --write",
           "stylelint --fix"
         ],
         "*.{scss,less,styl,html}": [
           "stylelint --fix",
           "prettier --write"
         ],
         "*.md": [
           "prettier --write"
         ]
       },
     }
     ```

## 实现前端自动化部署

实现思路：在`git push`命令设置一个钩子函数，即`/.husky/pre-push`，获取当前分支，依据当前分支执行对应的`npm 脚本`，先进行项目打包构建，再用`ftp-deploy`库推送打包后的文件到指定的服务器，最后才将项目上传到远程仓库

1. 利用`ftp-deploy`库，实现上传函数

   - `/deploy/index.ts`——上传函数

     ```ts
     const FtpDeploy = require("ftp-deploy");
     const ftpDeploy = new FtpDeploy();
     const DeployConfig = require("./config.ts")
     
     const config = DeployConfig.getFtpDeployConfig()
     
     ftpDeploy
       .deploy(config)
       .then((res) => console.log("finished:", res))
       .catch((err) => console.log(err));
     ```

   - `/deploy/config.ts`——上传配置

     ```ts
     const deployConfig = require("./serverConfig.ts")
     
     const getNODE_ENV = function() {
       const script = process.env.npm_lifecycle_script;
       const reg = new RegExp('NODE_ENV=([a-z_\\d]+)');
       const result = reg.exec(script);
       return result[1]
     }
     
     module.exports.getFtpDeployConfig = function getFtpDeployConfig() {
       return {
         user: deployConfig.user,                    // 服务器登录账号
         password: deployConfig.password,            // 服务器密码
         host: deployConfig.host,                    // 服务器地址
         port: deployConfig.port.get(getNODE_ENV()), // ftp的服务器端口
         localRoot: deployConfig.localRoot,          // 上传的文件
         remoteRoot: "",                             // 远程服务器文件存储路径
         include: [".*"],                            // 这将上传除了点文件之外的所有文件
         // 排除sourcemaps和node_modules中的所有文件
         exclude: [
             "dist/**/*.map",
             "node_modules/**",
             "node_modules/**/.*",
             ".git/**",
         ],
         deleteRemote: false,                         // 如果为true，则在上传前删除目的地的所有现有文件
         forcePasv: true,                             // 主动模式/被动模式
         sftp: false,                                 // 使用 sftp协议 或 ftp协议
       }
     }
     ```

   - `/deploy/serverConfig.ts`——个人服务器配置，不上传到远程仓库，保障个人服务器安全

     ```ts
     module.exports = {
       user: "user",
       password: "password",
       host: "ftp.someserver.com",
       port: new Map([
         ["test", 8080],
         ["production", 80]
       ]),
       localRoot: __dirname + "/dist",
     }
     ```

2. 设置`npm`脚本命令

   - 安装`cross-env`

     ```shell
     npm i cross-env -D
     ```

   - 修改`package.json`

     ```json
     {
       "scripts": {
         "deploy:test": "cross-env NODE_ENV=test run-p build && node ./deploy/index.ts",
         "deploy:prod": "cross-env NODE_ENV=production run-p build && node ./deploy/index.ts",
       },
     }
     ```

3. 实现`git-push`钩子函数——`/.husky/pre-push`

   ```shell
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
   
   # 代码推送前依据当前分支进行打包构建并上传（仅对 master 分支 和 test 分支进行构建）
   function current_branch() {
     branch=""
     testBranch="test"
     masterBranch="master"
     cd $PWD
     if [ -d '.git' ]; then
       output=`sh -c 'git branch --no-color 2> /dev/null' | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/' -e 's/\//\_/g'`
       if [ "$output" ]; then
         branch="${output}"
       fi
     fi
   
     if [ $branch == $testBranch ]
     then
       echo "自动构建并上传 test 分支代码"
       npm run deploy:test
     elif [ $branch == $masterBranch ]
     then
       echo "自动构建并上传 master 分支代码"
       npm run deploy:prod
     fi
   }
   
   current_branch
   ```

# 框架配置管理

## 项目`TypeScript`配置——`tsconfig.ts`

```json
{
  "compileOnSave": true, //设置保存文件的时候自动编译
  "extends": "@vue/tsconfig/tsconfig.web.json", //引入其他配置文件，继承配置
  "exclude": ["node_modules", "dist"], //指定编译器需要排除的文件或文件夹
  "include": [
    //指定编译需要编译的文件或目录
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "types/**/*.ts",
    "build/**/*.ts",
    "build/**/*.d.ts",
    "vite.config.*"
  ],
  "compilerOptions": {
    //配置编译选项
    "diagnostics": true, // 打印诊断信息
    "removeComments": true, //移除代码中注释
    "strictNullChecks": true, //开启null、undefined检测
    "baseUrl": ".", // 解析非相对模块的基地址，默认是当前目录
    "target": "ES2015", // 目标语言的版本
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "allowJs": false, // 允许编译器编译JS，JSX文件
    "checkJs": false, // 允许在JS文件中报错，通常与allowJS一起使用
    "sourceMap": true, // 生成目标文件的sourceMap文件
    "strict": true, // 开启所有严格的类型检查
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "paths": {
      // 路径映射，相对于baseUrl
      "@/*": ["./src/*"],
      "#/*": ["./types/*"],
      "$locale": ["./src/locales/setupLocale.ts"],
      "$store/*": ["./src/store/modules/*"],
    },
    "suppressImplicitAnyIndexErrors": true,
    "jsx": "preserve",
    "types": ["node", "vite/client"]  //默认所有可见的”@types“包会在编译过程中被包含进来。 node_modules/@types文件夹下以及它们子文件夹下的所有									   包都是可见的；如果指定了types，只有被列出来的包才会被包含进来
  }
}
```

## 环境配置文件

`/.env`——环境基本配置

```shell
# port
VITE_PORT = 3001

# spa-title (spa——单页应用程序)
VITE_GLOB_APP_TITLE = 

# spa shortname
VITE_GLOB_APP_SHORT_NAME = 
```

`/.env.development`——开发环境配置

```shell
# public path
VITE_PUBLIC_PATH = /

# 跨域代理，可配置多个
VITE_PROXY = [["basic-api","http://192.168.1.103/PDP/public/index.php/"]]

# Delete console
VITE_DROP_CONSOLE = false

# Basic interface address SPA
VITE_GLOB_API_URL=/basic-api

# Whether to enable multiple languages
VITE_MULTIPLE_LANGUAGES = true
```

`/.env.production`——生产环境配置

```shell
# public path
VITE_PUBLIC_PATH = /

# Delete console
VITE_DROP_CONSOLE = true

# Whether to enable gzip or brotli compression  是否启用gzip或brotli压缩
# Optional: gzip | brotli | none
# If you need multiple forms, you can use `,` to separate  如果你需要多个形式，你可以用'，'来分隔
VITE_BUILD_COMPRESS = 'none'

# Whether to delete origin files when using compress, default false 使用压缩时是否删除源文件，默认为false
VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE = false

# Basic interface address SPA8
VITE_GLOB_API_URL=/basic-api

# Is it compatible with older browsers 是否兼容旧浏览器
VITE_LEGACY = false

# Whether to enable image compression 是否压缩图片
VITE_USE_IMAGEMIN= true

# Whether to enable multiple languages
VITE_MULTIPLE_LANGUAGES = false
```

`.env.test`——测试环境配置

```shell
NODE_ENV=production

# public path
VITE_PUBLIC_PATH = /

# Delete console
VITE_DROP_CONSOLE = true

# Whether to enable gzip or brotli compression
# Optional: gzip | brotli | none
# If you need multiple forms, you can use `,` to separate
VITE_BUILD_COMPRESS = 'none'

# Whether to delete origin files when using compress, default false
VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE = false


# Is it compatible with older browsers
VITE_LEGACY = false

# Whether to enable image compression 是否压缩图片
VITE_USE_IMAGEMIN= true

# Whether to enable multiple languages
VITE_MULTIPLE_LANGUAGES = true
```

## `.gitignore`

```
node_modules
dist

# Editor directories and files
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
./deploy/serverConfig.ts
```

## `Vite.config.ts`代理服务器配置化、插件模块单独管理及设置打包配置

### 代理服务器配置化

- 在`/build/vite/proxy.ts`创建函数`createProxy`，实现代理服务器由环境配置`VITE_PROXY`创建

  ```ts
  import type { ProxyOptions } from "vite";
  
  type ProxyItem = [string, string];
  
  type ProxyList = ProxyItem[];
  
  type ProxyTargetList = Record<string, ProxyOptions>;
  
  const httpsRE = /^http:\/\//;
  
  /**
   * Generate proxy
   * @param list
   */
  export function createProxy(list: ProxyList = []) {
    const ret: ProxyTargetList = {};
    for (const [prefix, target] of list) {
      const isHttps = httpsRE.test(target);
  
      ret["^/" + prefix] = {
        target: target,
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^\/${prefix}`), ""),
        ...(isHttps ? { secure: false } : {}),
      };
    }
    return ret;
  }
  ```

- 修改`Vite.config.ts`

  ```json
  import { fileURLToPath, URL } from "node:url";
  import { resolve } from "node:path";
  import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
  import { wrapperEnv } from "./build/utils";
  /*
    export function wrapperEnv(envConf: Recordable): ViteEnv {
      const ret: any = {};
  
      for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, "\n");
        realName = realName === "true" ? true : realName === "false" ? false : realName;
  
        if (envName === "VITE_PORT") {
          realName = Number(realName);
        }
        if (envName === "VITE_PROXY" && realName) {
          try {
            realName = JSON.parse(realName.replace(/'/g, '"'));
          } catch (error) {
            realName = "";
          }
        }
        ret[envName] = realName;
        if (typeof realName === "string") {
          process.env[envName] = realName;
        } else if (typeof realName === "object") {
          process.env[envName] = JSON.stringify(realName);
        }
      }
      return ret;
    }
  */
  import { createProxy } from "./build/vite/proxy";
  
  // https://vitejs.dev/config/
  export default ({ command, mode }: ConfigEnv): UserConfig => {
    const url = import.meta.url;
      
    // process.cwd()方法返回Node.js进程的当前工作目录。
    const root = process.cwd();
  
    // 加载 root 中的 .env 文件。
    const env = loadEnv(mode, root);
  
    // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
    const viteEnv = wrapperEnv(env);
  
    const { VITE_PORT, VITE_PROXY } = viteEnv;
  
    return {
      // 需要用到的插件数组
      plugins: [vue()],
      // 解析
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      // 开发或生产环境服务的公共基础路径
      base: "./",
  
      // 设置代理服务器
      server: {
        host: true,
        port: VITE_PORT,
        open: true,
        cors: true,
        proxy: createProxy(VITE_PROXY),
      },
    };
  };
  ```

### 插件模块单独管理

- 在`/build/vite/plugin/index.ts`创建函数`createVitePlugin`，实现`Vite`插件模块`plugin`单独管理

  ```ts
  import type { PluginOption } from "vite";
  import vue from "@vitejs/plugin-vue";
  import vueJsx from "@vitejs/plugin-vue-jsx";
  import legacy from "@vitejs/plugin-legacy";
  import setting from "../../../src/settings/projectSetting";
  import { configElementPlugin } from "./element";
  /*
    import Components from "unplugin-vue-components/vite";
    import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
  
    export function configElementPlugin() {
      const elementPlugin = Components({
        dts: false,
        resolvers: [ElementPlusResolver()],
      });
      return elementPlugin;
    }
  */
  import { configAutoImportPlugin } from "./autoImport";
  /*
    import AutoImport from "unplugin-auto-import/vite";
    import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
  
    export function configAutoImportPlugin() {
      const autoImportPlugin = AutoImport({
        dts: false,
        resolvers: [ElementPlusResolver()],
      });
      return autoImportPlugin;
    }
  */
  import { configSvgIconsPlugin } from "./svgSprite";
  /*
    import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
    import path from "path";
  
    export function configSvgIconsPlugin(isBuild: boolean) {
      const svgIconPlugin = createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        svgoOptions: isBuild,
        // default
        symbolId: "icon-[dir]-[name]",
      });
      return svgIconPlugin;
    }
  */
  import { configImageminPlugin } from "./imagemin";
  /*
    import viteImagemin from "vite-plugin-imagemin";
  
    export function configImageminPlugin() {
      const plugin = viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      });
      return plugin;
    }
  */
  import { configCompressPlugin } from "./compress";
  /*
    import type { Plugin } from "vite";
    import compressPlugin from "vite-plugin-compression";
  
    export function configCompressPlugin(
      compress: "gzip" | "brotli" | "none",
      deleteOriginFile = false,
    ): Plugin | Plugin[] {
      const compressList = compress.split(",");
  
      const plugins: Plugin[] = [];
  
      if (compressList.includes("gzip")) {
        plugins.push(
          compressPlugin({
            ext: ".gz",
            deleteOriginFile,
          }),
        );
      }
  
      if (compressList.includes("brotli")) {
        plugins.push(
          compressPlugin({
            ext: ".br",
            algorithm: "brotliCompress",
            deleteOriginFile,
          }),
        );
      }
      return plugins;
    }
  */
  import { configHtmlPlugin } from "./html";
  /*
    import type { PluginOption } from "vite";
    import { createHtmlPlugin } from "vite-plugin-html";
    import pkg from "../../../package.json";
    const GLOB_CONFIG_FILE_NAME = require("../../constant.ts").GLOB_CONFIG_FILE_NAME;
  
    export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
      const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;
  
      const path = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  
      const getAppConfigSrc = () => {
        return `${path || "/"}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
      };
  
      const htmlPlugin: PluginOption[] = createHtmlPlugin({
        minify: isBuild,
        inject: {
          // Inject data into ejs template
          data: {
            title: VITE_GLOB_APP_TITLE,
          },
          // Embed the generated app.config.js file
          tags: isBuild
            ? [
                {
                  tag: "script",
                  attrs: {
                    src: getAppConfigSrc(),
                  },
                },
              ]
            : [],
        },
      });
      return htmlPlugin;
    }
  */
  
  export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
    const {
      VITE_LEGACY,
      VITE_USE_IMAGEMIN,
      VITE_BUILD_COMPRESS,
      VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    } = viteEnv;
  
    const vitePlugins: (PluginOption | PluginOption[])[] = [
      // have to
      vue(),
      // have to
      vueJsx(),
    ];
  
    // @vitejs/plugin-legacy 兼容旧浏览器
    VITE_LEGACY && vitePlugins.push(legacy());
  
    // unplugin-vue-components 按需自动引入element-plus
    setting.loadOnDemandEl && vitePlugins.push(configElementPlugin());
    setting.loadOnDemandEl && vitePlugins.push(configAutoImportPlugin());
  
    // vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isBuild));
  
    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  
    if (isBuild) {
      // vite-plugin-imagemin 图片压缩
      VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
  
      // rollup-plugin-gzip 文件压缩
      vitePlugins.push(
        configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
      );
    }
  
    return vitePlugins;
  }
  ```

- 修改`Vite.config.ts`

  ```ts
  import { fileURLToPath, URL } from "node:url";
  import { resolve } from "node:path";
  import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
  import { wrapperEnv } from "./build/utils";
  import { createVitePlugin } from "./build/vite/plugin";
  
  // https://vitejs.dev/config/
  export default ({ command, mode }: ConfigEnv): UserConfig => {
    const url = import.meta.url;
  
    // process.cwd()方法返回Node.js进程的当前工作目录。
    const root = process.cwd();
  
    // 加载 root 中的 .env 文件。
    const env = loadEnv(mode, root);
  
    // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
    const viteEnv = wrapperEnv(env);
  
    const isBuild = command === "build";
  
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  
    return {
      base: VITE_PUBLIC_PATH,
  
      root,
  
      plugins: createVitePlugin(viteEnv, isBuild),
  
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", url)),
        },
      },
    };
  };
  ```

### 设置打包配置

`Vite.config.ts`

```ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { buildAssetsFile, buildChunkFile } from "./build/utils";
/*
  import type { PreRenderedAsset, PreRenderedChunk } from "rollup";
  const ASSETS_DIR = require("./constant.ts").ASSETS_DIR;
  // contant.ts
  module.exports = {
 	OUTPUT_DIR: "dist",
    ASSETS_DIR: "assets",
  }
  
  export function buildAssetsFile(chunkInfo: PreRenderedAsset) {
    if (chunkInfo.name?.match(/\.(png|svg|jpg|jpeg|gif)$/i) !== null) {
      return ASSETS_DIR + "/images/[name]-[hash].[ext]";
    } else {
      return ASSETS_DIR + "/[ext]/[name]-[hash].[ext]";
    }
  }

  export function buildChunkFile(chunkInfo: PreRenderedChunk) {
    let fileName = chunkInfo.name?.replace("-legacy", "");
    return ASSETS_DIR + "/js/" + fileName + "/[name]-[hash].js";
  }
*/
const OUTPUT_DIR = require("./build/constant.ts").OUTPUT_DIR;

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const url = import.meta.url;

  return {
    // 需要用到的插件数组
  	plugins: [vue()],
  	// 解析
 	 resolve: {
    	alias: {
    	  "@": fileURLToPath(new URL("./src", import.meta.url)),
   	 	},
  	},
  	// 开发或生产环境服务的公共基础路径
  	base: "./",

    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        // 设置项目打包入口文件
        input: {
          index: resolve(__dirname, "index.html"),
        },
        // 设置项目打包资源输出文件，包括JS、CSS、图片
        output: {
          chunkFileNames: (chunkInfo) => buildChunkFile(chunkInfo),
          entryFileNames: "[name]-[hash].js",
          assetFileNames: (chunkInfo) => buildAssetsFile(chunkInfo),
        },
      },
    },
  };
};
```

# 项目最终目录结构

```
PROJECT
├─ .husky
│  ├─ -
│  │  ├─ .gitnore
│  │  └─ husky.sh
│  ├─ commit-msg
│  ├─ common.sh
│  └─ pre-push
├─ .vscode
│  ├─ settings.json	# VSCode设置			
│  └─ extensions.json
├─ bulid			# 打包配置模块
│  ├─ vite
│  │  ├─ plugin		# 插件模块单独管理
│  │  │  ├─ index.ts
│  │  │  ├─ autoImport.ts
│  │  │  ├─ compress.ts
│  │  │  ├─ element.ts
│  │  │  ├─ html.ts
│  │  │  ├─ imagemin.ts
│  │  │  └─ svgSprite.ts
│  │  └─ proxy.ts	# 配置化代理服务器
│  ├─ constant.ts
│  ├─ getConfigFileName.ts
│  └─ utils.ts
├─ deploy			# 服务器上传脚本
│  ├─ index.ts
│  ├─ config.ts
│  └─ serverConfig.ts
├─ public			# 公共资源模块
│  └─ favicon.ico
├─ src
│  ├─ api			# 接口管理模块
│  ├─ assets		# 静态资源模块
│  │  └─ logo.png
│  ├─ common		# 自定义通用模块
│  ├─ components	# 公共组件模块
│  │  └─ HelloWorld.vue
│  ├─ enums			# 项目元组
│  ├─ layouts		# 公共自定义布局
│  ├─ locales		# 多语言配置模块
│  ├─ packages		# 项目包管理模块
│  ├─ router		# 路由
│  ├─ store			# pinia状态库
│  ├─ style			# 样式资源模块
│  ├─ utils			# 公共方法模块
│  ├─ views			# 视图模块
│  ├─ App.vue
│  ├─ env.d.ts
│  └─ main.ts		# 入口文件
├─ tests
├─ types			# 声明文件
├─ .env
├─ .env.development
├─ .env.production
├─ .env.test
├─ .eslintignore
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.json
├─ .stylelintignore
├─ stylelint.config.js
├─ commitlint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tsconfig.json
└─ vite.config.ts
```

`.vscode/settings.json`

```json
{
  "i18n-ally.localesPaths": ["src/locales", "src/locales/lang"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "vue"],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": true,
      "printWidth": 100,
      "singleQuote": false,
      "trailingComma": "none",
      "arrowParens": "avoid"
    },
    "prettyhtml": {
      "semi": true,
      "printWidth": 100,
      "singleQuote": false,
      "trailingComma": "none",
      "arrowParens": "avoid"
    }
  },
  "prettier.semi": true,
  "prettier.printWidth": 100,
  "prettier.trailingComma": "none",
  "prettier.singleQuote": false,
  "prettier.arrowParens": "avoid",
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/doc": true,
    "**/.git": true,
    "**/.gitignore": true,
    "**/.vscode": false,
    "**/yarn.lock": true,
    "dist": true,
    "node_modules": true,
    "yarn-error.log": true,
    "**/.yarn": true
  }
}
```

`.husky`

```shell
# husky.sh
#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi

  exit $exitCode
fi
# ===========================================================
# commit-msg
#!/bin/sh

# shellcheck source=./_/husky.sh
. "$(dirname "$0")/_/husky.sh"


npx --no-install commitlint --edit "$1"
# ===========================================================
# common.sh
#!/bin/sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```



# `Vite.config.ts`最终配置

```ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { wrapperEnv, buildAssetsFile, buildChunkFile } from "./build/utils";
import { createVitePlugin } from "./build/vite/plugin";
import { createProxy } from "./build/vite/proxy";
const OUTPUT_DIR = require("./build/constant.ts").OUTPUT_DIR;

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const url = import.meta.url;

  // process.cwd()方法返回Node.js进程的当前工作目录。
  const root = process.cwd();

  // 加载 root 中的 .env 文件。
  const env = loadEnv(mode, root);

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);

  const isBuild = command === "build";

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,

    root,

    plugins: createVitePlugin(viteEnv, isBuild),

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", url)),
        "#": fileURLToPath(new URL("./types", url)),
        $locale: fileURLToPath(new URL("./src/locales/setupLocale.ts", url)),
        $store: fileURLToPath(new URL("./src/store/modules", url)),
      },
    },

    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      cors: true,
      proxy: createProxy(VITE_PROXY),
    },

    esbuild: {
      // 删除对控制台API方法(如console.log)的所有调用
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },

    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        // 设置项目打包入口文件
        input: {
          index: resolve(__dirname, "index.html"),
        },
        // 设置项目打包资源输出文件，包括JS、CSS、图片
        output: {
          chunkFileNames: (chunkInfo) => buildChunkFile(chunkInfo),
          entryFileNames: "[name]-[hash].js",
          assetFileNames: (chunkInfo) => buildAssetsFile(chunkInfo),
        },
      },
    },
  };
};
```









