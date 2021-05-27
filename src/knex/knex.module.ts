import {knex} from 'knex';
import * as config from 'config';
import { Module } from '@nestjs/common';

const knexFactory = {
  provide: 'knex',
  useFactory: () => {
    return knex({
      client: 'postgresql',
      connection: {
        connectionString: `${config.get('db.connectionString')}:${config.get('db.port')}/${config.get('db.database')}`,
      },
      pool: {
        min: 2,
        max: 10,
      },
    });
  },
};

@Module({
  providers: [knexFactory],
  exports: [knexFactory],
})
export class KnexModule {}
