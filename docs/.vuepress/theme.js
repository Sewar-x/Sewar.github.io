/**
 * 使用 vuepress-theme-hope 主题插件
 * docs: https://theme-hope.vuejs.press/zh/
 */
import { hopeTheme } from "vuepress-theme-hope";
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import navbar from "./navbar.js";
// 我们默认导出了主题对象
export default hopeTheme({
    darkmode: "switch",
    hostname: "https://github.com/Sewar-x/myblog/",
    author: {
        name: "Sewen",
        url: "https://github.com/Sewar-x",
        email: "596777598@qq.com",
    },
    navbar,
    sidebar: "structure",
    navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: ["Language", "Repo", "Outlook", "Search"],
    },
    plugins: {
        copyCodePlugin: {
            showInMobile: true
        },
        shiki: {
            // 你想要使用的主题
            themes: {
                light: "one-light",
                dark: "one-dark-pro",
            },
        },
        blog: true,
        prismjs: {
            theme: {
                light: 'ghcolors',
                dark: 'coldark-dark'
            },
            notationDiff: true,
            notationErrorLevel: true,
            notationWordHighlight: true
        },
        search: true,
        watermark: true,
        mdEnhance: {
            // 你想使用的组件
            components: [
                "Badge",
                "CodePen",
                "PDF",
                "Share",
                "SiteInfo",
                "StackBlitz",
                "VPBanner",
                "VPCard",
                "XiGua",
            ],
            // 启用下角标功能
            sub: false,
            // 启用上角标
            sup: false,
            tasklist: false,
            // 启用 figure
            figure: false,
            // 启用图片懒加载
            imgLazyload: true,
            // 启用图片标记
            imgMark: true,
            // 启用图片大小
            imgSize: false,
            //启用 导入文件：https://theme-hope.vuejs.press/zh/guide/markdown/content/include.html#%E9%85%8D%E7%BD%AE
            include: false,
            // 启用 幻灯片：https://theme-hope.vuejs.press/zh/guide/markdown/content/revealjs.html
            revealJs: false,
            //脚注: https://theme-hope.vuejs.press/zh/guide/markdown/content/footnote.html
            footnote: true,
            //选项卡：https://theme-hope.vuejs.press/zh/guide/markdown/content/tabs.html
            tabs: false,
            // 启用 GFM 警告：https://theme-hope.vuejs.press/zh/guide/markdown/stylize/alert.html#%E6%BC%94%E7%A4%BA
            alert: false,
            // 属性支持: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/attrs.html#%E9%85%8D%E7%BD%AE
            attrs: false,
            // 提示容器:https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html#%E6%BC%94%E7%A4%BA
            hint: false,
            //标记: 使用 == == 进行标记。请注意两边需要有空格。
            mark: false,
            //对齐方式
            align: false,
            //Chart.js: https://theme-hope.vuejs.press/zh/guide/markdown/chart/chartjs.html
            chart: false,
            //启用 echart: https://theme-hope.vuejs.press/zh/guide/markdown/chart/echarts.html
            echarts: false,
            //Mermaid: https://theme-hope.vuejs.press/zh/guide/markdown/chart/mermaid.html
            mermaid: false,
            //思维导图：https://theme-hope.vuejs.press/zh/guide/markdown/chart/markmap.html#settings
            markmap: false,
            //流程图：https://theme-hope.vuejs.press/zh/guide/markdown/chart/flowchart.html#%E9%85%8D%E7%BD%AE
            flowchart: false,
            //Vue 交互演示: https://theme-hope.vuejs.press/zh/guide/markdown/code/vue-playground.html
            vuePlayground: false,
            //代码块分组: https://theme-hope.vuejs.press/zh/guide/markdown/code/code-tabs.html
            codetabs: false,
            // !代码演示: https://theme-hope.vuejs.press/zh/guide/markdown/code/demo.html
            demo: false
        },
        copyright: {
            global: true,
            author: "Sewen",
            license: "MIT"
        },
        comment: {
            provider: "Giscus",
            repo: "Sewar-x/myblog",
            repoId: "MDEwOlJlcG9zaXRvcnkzODAyOTIzOTU=",
            category: "Announcements",
            categoryId: "DIC_kwDOFqrNK84Ceik1",
        },
    },
    blog: {
        avatar: './mylogo.png',
        name: 'Sewen',
        description: '前端开发者, 热爱前端,喜欢探索',
        roundAvatar: true,
        intro: 'https://github.com/Sewar-x',
        medias: {
            GitHub: "https://github.com/Sewar-x",
            Wechat: "15679109097"
        },
    },
    markdown: {
        headers: {
            level: [4, 5]
        },
        toc: {
            level: [4, 5]
        },
        anchor: {
            level: [4, 5]
        },
    },
    repo: 'https://github.com/Sewar-x',
    // 自定义仓库链接文字。默认从 `repo` 中自动推断为
    // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "GitHub",
    // 是否在导航栏内显示仓库链接，默认为 `true`
    repoDisplay: true,
    iconAssets: "fontawesome-with-brands",
    print: true,
    fullscreen: true,
});
