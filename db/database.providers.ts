import { Sequelize } from 'sequelize-typescript';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307;
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST ?? 'localhost',
        port,
        username: process.env.DB_USER ?? 'appuser3',
        password: process.env.DB_PASSWORD ?? 'apppass3',
        database: process.env.DB_NAME ?? 'management_db',
      });
      sequelize.addModels([User, Shift, Assignment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
