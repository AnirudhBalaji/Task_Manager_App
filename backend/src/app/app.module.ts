import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { ElasticsearchModule } from '../elasticsearch/search-module';
import { UsersModule } from '../users/users.module';
import { NanoModule } from '../nano/nano.module';

@Module({
  imports: [
    TasksModule,
    ElasticsearchModule,
    UsersModule,
    NanoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}