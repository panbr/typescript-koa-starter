## typescript - koa - starter
typescript - koa - typeorm web app

## 快速开始

- 安装依赖

```bash
$ yarn install
```

- 启动工程

```bash
$ npm run start
```

## 项目目录

```
├── src
│   ├── controllers         ---  路由控制器
│   ├── db                  ---  数据库连接配置
│   ├── entity              ---  数据实体，数据库模型文件
│   ├── db                  ---  数据库连接配置
│   ├── utils               ---  工具集
│   ├── app.ts              ---  应用配置
│   └── server.ts           ---  创建服务
├── nodemon                 ---  自动重启模块
├── package                 ---  包管理
├── tsconfig                ---  TS 配置
└── tslint                  ---  TS 检查
```

## 特性

- Typescript 强类型

- typeorm 对象关系映射器

- mysql 数据库

- routing-controllers 使用装饰器的方式来进行koa-router的开发

- nodemon 守护进程