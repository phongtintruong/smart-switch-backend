import { Connection } from 'mongoose';
import { HistorySchema } from 'src/schemas/history.schema';
export const historyProvider = [
  {
    provide: 'HISTORY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('History', HistorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
