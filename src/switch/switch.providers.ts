import { Connection } from 'mongoose';
import { SwitchUserSchema } from 'src/schemas/switch-user.schema';
import { SwitchSchema } from 'src/schemas/switch.schema';

export const switchProvider = [
  {
    provide: 'SWITCH_USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('SwitchUser', SwitchUserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'SWITCH_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Switch', SwitchSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
