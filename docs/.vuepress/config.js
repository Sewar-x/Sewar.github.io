import { defineUserConfig } from "vuepress";
import { webpackBundler } from '@vuepress/bundler-webpack'
import theme from "./theme.js";

export default defineUserConfig({
  title: 'Sewen 博客',
  base: `/myblog/`,
  description: '记录分享 Sewen 的前端学习笔记、前端基础总结、技术深度剖析、项目过程总结.',
  head: [
    ['link', { rel: 'icon', href: './mylogo.png' }],
  ],
  themeConfig: {
    logo: './mylogo.png',  // 左上角logo
    hostname: 'https://sewar-x.github.io/',
    pageInfo: {
      author: true,
      time: true,
      category: true,
      tag: true,
      'reading-time': true,
      word: true,
      visitor: true
    },
    serviceWorker: {
      // 如果设置为 true, 默认的文本配置将是: 
      updatePopup: {
        message: "博客有新的内容啦！.",
        buttonText: "刷新看看"
      }
    }
  },

  // 这和 `theme: hopeTheme({/* 你的配置 */})` 是等价的
  theme,
  bundler: webpackBundler({
    postcss: {},
    vue: {},
  }),
})