# CLI Todo App

一个基于 Node.js 的命令行待办清单工具，支持 SQLite 持久化和彩色输出，适合 Node.js 新手练习。

## 功能特性

-   命令行交互式菜单
-   添加、查看、删除待办事项
-   标记完成/未完成状态
-   数据持久化到 SQLite 数据库
-   彩色输出（chalk）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行主程序

```bash
node todo.js
```

### 3. 菜单说明

```
1. 查看待办
2. 添加待办
3. 删除待办
4. 标记完成/未完成
0. 退出
```

### 4. 查看数据库内容

-   推荐使用 VS Code 插件 “SQLite Viewer” 或 “SQLite” 打开 `todos.db` 文件。
-   也可运行 `node view.js` 查看所有数据。

## 进阶扩展

-   支持命令行参数快速添加/删除
-   支持关键字搜索、编辑待办内容
-   支持按完成状态筛选

## 依赖说明

-   [chalk](https://www.npmjs.com/package/chalk) 彩色输出
-   [sqlite3](https://www.npmjs.com/package/sqlite3) 数据库持久化

## 相关学习资源

-   [Node.js 官方文档](https://nodejs.org/zh-cn/docs/)
-   [SQLite 官方文档](https://www.sqlite.org/index.html)
-   [sqlite3 Node.js 文档](https://github.com/TryGhost/node-sqlite3/wiki/API)

---

如有问题或建议，欢迎提 issue 或 PR。
