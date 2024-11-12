# GitLab CICD

> [GitLab CICD 官方文档](https://docs.gitlab.com/ee/ci/index.html)



## 基础概念

| 术语/概念                   | 描述                                                         |
| --------------------------- | ------------------------------------------------------------ |
| CI/CD                       | CI/CD是持续集成（Continuous Integration）、持续交付（Continuous Delivery）和/或持续部署（Continuous Deployment）的缩写，是一种通过自动化频繁向客户交付应用的方法。 |
| 持续集成（CI）              | 在代码构建过程中持续地进行代码的集成、构建、以及自动化测试等。成功的CI意味着应用代码的新更改会定期构建、测试并合并到共享存储库中。 |
| 持续交付（CD）              | 开发人员对应用的更改会自动进行错误测试并上传到存储库（如GitLab或容器注册表），然后由运维团队将其部署到实时生产环境中。 |
| 持续部署（CD）              | 自动将开发人员的更改从存储库发布到生产环境，以供客户使用。   |
| GitLab CI/CD                | GitLab内置的CI/CD工具，允许开发人员通过`.gitlab-ci.yml`文件配置CI/CD流程，实现自动化测试、构建和部署。 |
| .gitlab-ci.yml              | CI/CD管道的配置文件，位于项目根目录下，定义了CI/CD流程中的任务、阶段、依赖和脚本等。 |
| Pipeline                    | 流水线，可以像流水线一样执行多个Job。在代码提交或合并请求（Merge Request）被合并时，GitLab会在最新生成的commit上建立一个pipeline。 |
| Job任务                     | 是GitLab CI系统中可以独立控制并运行的最小单位。一个pipeline可以包含多个job，每个job执行特定的任务，如测试、构建或部署。 |
| Stage阶段                   | pipeline中的多个任务可以划分在多个阶段中。一般只有当前一阶段的所有任务都执行成功后，下一阶段的任务才可被执行。 |
| GitLab Runner               | 执行CI/CD任务的工具，由Go语言编写，最终打包成单文件。GitLab Runner负责根据`.gitlab-ci.yml`文件中的配置执行相应的任务。 |
| Variables变量               | 可以在`.gitlab-ci.yml`文件中定义自定义变量，用于在CI/CD任务中传递参数或配置信息。 |
| Artifacts制品               | 在CI/CD过程中生成的文件或数据，可以在不同的任务或阶段之间传递和共享。 |
| Script脚本                  | 在`.gitlab-ci.yml`文件中定义，用于指定CI/CD任务需要执行的命令或脚本。 |
| Before_script               | 在每个job执行之前运行的脚本，通常用于设置环境变量、安装依赖等准备工作。 |
| Only/Except                 | 控制何时将作业添加到pipeline的关键词。only用于定义作业何时运行，except用于定义作业何时不运行。 |
| Tags标签                    | 用于指定job将在具有特定标签的GitLab Runner上运行。           |
| Cache缓存                   | 用于存储和重用CI/CD任务中的某些数据或文件，以减少构建时间和提高构建效率。 |
| CI/CD管道（CI/CD Pipeline） | CI/CD管道是CI/CD流程的图形化表示，展示了从代码提交到生产部署的整个流程。 |





## GitLab CICD 工作流

![](../images/aad80f47873d5e252f8c99069f8eda28.png)

GitLab CI/CD（持续集成/持续部署）的工作流程：

1. **Create new branch**: 创建一个新的分支，用于开发新功能或修复问题。这有助于隔离开发中的更改，避免影响主分支。
2. **Push code changes**: 开发者提交代码后，将更改推送到代码仓库。这是CI/CD流程的起点。
3. **Automated build and test**: 一旦代码被推送到仓库，GitLab CI/CD的自动化流程会触发构建和测试。这个过程是自动的，无需人工干预。
4. **Push code fixes**: 开发者修复代码后，将更改推送到代码仓库。这是CI/CD流程的起点。
5. **Automated build and test**: 修改代码被推送到仓库，GitLab CI/CD的自动化流程会触发构建和测试。
6. **Review and approve**: 代码提交后，其他团队成员会进行代码审查，确保代码质量和符合项目标准。审查通过后，代码会被批准合并。
7. **Merge**: 代码审查和测试通过后，更改会被合并到主分支。这是确保主分支始终保持稳定和可部署状态的关键步骤。
8. **Deploy Review App**: 部署到一个审查应用环境。这通常是一个临时环境，用于进一步测试更改在实际部署之前的效果。
9. **Automated build, test, deploy**: 代码在主分支上合并后，会触发另一个自动化流程，包括构建、测试和部署。这确保了主分支的代码始终是可部署的。
10. **Deploy to production**: 经过自动化测试和审查应用部署的验证后，代码最终会被部署到生产环境。这是CI/CD流程的最终目标，确保新更改能够安全、快速地发布给最终用户。

整个GitLab CI/CD流程是自动化的，从代码提交到最终部署，旨在提高开发效率，减少人为错误，并确保软件质量。通过这种方式，团队可以快速响应需求变化，持续交付高质量的软件。



## GitLab 流程节点功能

![ ](../images/d0b5c51b5285f99c72a2136ec8ad5019.png)





| 阶段                               | 功能                                                         | 说明                                                         |
| :--------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **Verify - 验证**                  | **Continuous Integration (CI) - 持续集成过程**<br />进行更深入的代码和应用验证，可能包括代码审查、安全性检查等，确保代码符合项目标准和安全要求。 |                                                              |
|                                    | **Code Quality - 代码质量**                                  | 这个阶段包括了代码质量的检查，例如使用静态代码分析工具来检测潜在的错误和代码风格问题。 |
|                                    | **Performance testing - 性能测试**                           | 对应用进行性能测试，评估其在高负载下的表现，确保应用的性能满足要求。 |
|                                    | **JUnit Tests - JUnit 测试**                                 | 使用 JUnit 框架进行单元测试，确保代码的各个部分按预期工作。  |
|                                    | **Container Scanning - 容器扫描**                            | 扫描容器镜像，检测安全漏洞和配置问题，确保部署的容器是安全的。 |
|                                    | **Dependency Scanning - 依赖项扫描**                         | 分析项目的依赖项，检查是否有已知的安全漏洞或许可证问题。     |
|                                    |                                                              |                                                              |
| **Package - 打包**                 | 将应用打包成可部署的格式，例如 Docker 镜像、NPM 包或 Maven 包。 |                                                              |
|                                    | **Container Registry - 容器注册表**                          | 存储和管理 Docker 容器镜像，便于版本控制和部署。             |
|                                    | **NPM Registry - NPM 注册表**                                | 用于存储和管理 JavaScript 项目的包。                         |
|                                    | **Maven Repository - Maven 仓库**                            | 存储和管理 Java 项目的依赖项。                               |
|                                    |                                                              |                                                              |
| **Release - 发布**                 | **Continuous Deployment - 持续部署过程**<br />               | 自动将代码部署到生产环境，无需人工干预。<br />  管理应用的发布版本，包括版本号、发布说明等。 |
|                                    | **GitLab Pages - GitLab 页面**                               | 用于托管静态网站，可以直接从 GitLab 仓库部署。               |
|                                    | **Canary - 金丝雀部署**                                      | 一种渐进式的部署策略，先向一小部分用户部署新版本，以测试新版本的稳定性和性能。 |
|                                    | **Feature Flags - 特性开关**                                 | 允许在不部署新代码的情况下控制功能的发布，可以快速开启或关闭特定功能。 |
|                                    |                                                              |                                                              |
| **Continuous Delivery - 持续交付** | 点击部署到生产环境，实现从开发到生产的无缝过渡。             |                                                              |
|                                    | **Deploy Boards - 部署看板**                                 | 提供部署流程的可视化，帮助团队监控和协调部署活动。           |
|                                    | **Auto Deploy - 自动部署**                                   | 实现自动化的部署流程，减少人为错误。                         |







## GitLab Runner











**参考资料**

[CI/CD系列 | 一步上手Gitlab CI/CD - 掘金 (juejin.cn)](https://juejin.cn/post/7135282389076934687)

[CI/CD 系列 | 一文让你掌握 Gitlab Runner - 掘金 (juejin.cn)](https://juejin.cn/post/7134644436192985095)

[YAML 语言教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2016/07/yaml.html)