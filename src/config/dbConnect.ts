import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
  type: 'mysql',
  host: 'domain',
  port: 3306,
  username: 'root',
  password: '123456@abc',
  database: 'attence',
  entities: [
    `${parentDir}/**/*.entity.ts`,
  ],
  synchronize: false, // 是否同步表结构及数据
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;