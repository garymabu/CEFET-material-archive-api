import { User } from './entities/user.entity';
import { UserService } from './user.service';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection) => connection.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  UserService,
];
