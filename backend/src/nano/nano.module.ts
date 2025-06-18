import { Module, Global } from '@nestjs/common';
import Nano from 'nano';

export const NANO_CLIENT = 'NANO_CLIENT'; 
@Global() 
@Module({
  providers: [
    {
      provide: NANO_CLIENT,
      useFactory: () => {
        
        const couch = Nano('http://admin:password@localhost:5984'); 
        return couch;
      },
    },
  ],
  exports: [NANO_CLIENT], 
})
export class NanoModule {}