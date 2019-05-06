import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
  type: 'mysql',
  host: '',
  port: 3306,
  username: 'root',
  password: '',
  database: 'attence',
  entities: [
    `${parentDir}/**/*.entity.ts`,
  ],
  synchronize: false, // 是否同步表结构及数据
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;