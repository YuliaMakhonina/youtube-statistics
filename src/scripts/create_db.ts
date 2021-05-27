import { Client } from 'pg';
import * as config from 'config';

(async () => {
  const client = new Client({
    connectionString: `${config.get('db.connectionString')}:${config.get('db.port')}`,
    ssl: false
  });
console.log()
  await client.connect();
  await client.query(`CREATE DATABASE "${config.get('db.database')}"`);
  await client.end();
})().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
});
