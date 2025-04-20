import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection('master') private readonly masterConnection: Knex,
    @InjectConnection('slave') private readonly slaveConnection: Knex,
  ) {}
  async getHello() {
    for (let index = 0; index < 1e9; index++) {
      console.time(`master connection ${index}`);
      const data = await this.masterConnection.select('*').from('users');
      console.log(data.length, 'master connection');
      console.timeEnd(`master connection ${index}`);
    }

    return 'Hello World!';
  }
}
