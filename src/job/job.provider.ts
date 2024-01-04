import { Connection } from 'mongoose';
import { JobSchema } from 'src/schemas/job.schema';
export const jobProvider = [
  {
    provide: 'JOB_MODEL',
    useFactory: (connection: Connection) => connection.model('Job', JobSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
