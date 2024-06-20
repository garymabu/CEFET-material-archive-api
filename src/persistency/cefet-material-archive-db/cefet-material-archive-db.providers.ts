import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      console.log(
        'env',
        process.env.DATABASE_HOST,
        Number(process.env.DATABASE_PORT),
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        process.env.DATABASE_DATABASE,
      );
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
