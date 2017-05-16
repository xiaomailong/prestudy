# 快速入门

Electron 可以让你使用纯 JavaScript 调用丰富的原生 APIs 来创造桌面应用。你可以把它看作一个专注于桌面应用的 Node.js 的变体，而不是 Web 服务器。

这不意味着 Electron 是绑定了 GUI 库的 JavaScript。相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

## 主进程

在 Electron 里，运行 `package.json` 里 `main` 脚本的进程被称为**主进程**。在主进程运行的脚本可以以创建 web 页面的形式展示 GUI。

## 渲染进程

由于 Electron 使用 Chromium 来展示页面，所以 Chromium 的多进程结构也被充分利用。每个 Electron 的页面都在运行着自己的进程，这样的进程我们称之为**渲染进程**。

在一般浏览器中，网页通常会在沙盒环境下运行，并且不允许访问原生资源。然而，Electron 用户拥有在网页中调用 Node.js 的 APIs 的能力，可以与底层操作系统直接交互。

## 主进程与渲染进程的区别

主进程使用 `BrowserWindow` 实例创建页面。每个 `BrowserWindow` 实例都在自己的渲染进程里运行页面。当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有页面和与之对应的渲染进程。每个渲染进程都是相互独立的，并且只关心他们自己的页面。

由于在页面里管理原生 GUI 资源是非常危险而且容易造成资源泄露，所以在页面调用 GUI 相关的 APIs 是不被允许的。如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。

在 Electron，我们提供几种方法用于主进程和渲染进程之间的通讯。像 [`ipcRenderer`](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/ipc-renderer.md) 和 [`ipcMain`](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/ipc-main.md) 模块用于发送消息， [remote](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/remote.md) 模块用于 RPC 方式通讯。这些内容都可以在一个 FAQ 中查看 [how to share data between web pages](https://github.com/electron/electron/blob/master/docs-translations/zh-CN/faq.md#how-to-share-data-between-web-pages)。



[Electron中文文档](https://github.com/electron/electron/tree/master/docs-translations/zh-CN)

