
import { createConnections } from 'typeorm';
import { Contact } from '../models/contact';

export const connect = async () => {
  return await createConnections([
    {
      entities: [Contact],
      type: 'postgres',
      migrationsRun: true,
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: "fluxkart_db",
      logging: true,
    }
  ]).catch((error: Error) => {
    console.log('connection error', error);
    throw error;
  });
};
