## Typescript - Koa - Starter
使用 Typescript 构建 Koa 项目实践

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
│   ├── config              ---  配置信息
│   ├── entity              ---  数据实体，数据库模型文件
│   ├── utils               ---  工具集
│   ├── app.ts              ---  应用配置
│   └── server.ts           ---  创建服务
├── nodemon                 ---  自动重启模块
├── package                 ---  包管理
├── tsconfig                ---  TS 配置
└── tslint                  ---  TS 检查
```

## 项目特性

- Typescript 强类型

- typeorm 对象关系映射器

- mysql 数据库

- routing-controllers 使用装饰器的方式来进行koa-router的开发

- nodemon 代码变动自动重启

- winston 记录日志

## 完善计划

- Authentication

- CORS

- Docker

- ...