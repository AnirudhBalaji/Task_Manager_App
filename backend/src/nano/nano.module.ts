import { Module, Global } from '@nestjs/common';
import Nano from 'nano';

export const NANO_CLIENT = 'NANO_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: NANO_CLIENT,
      useFactory: () => {
        const couchUrl = process.env.COUCHDB_URL || 'http://admin:password@couchdb_task_manager:5984';
        const couch = Nano(couchUrl);
        return couch;
      },
    },
  ],
  exports: [NANO_CLIENT],
})
export class NanoModule {}