import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommitModule } from './module/commit/commit.module';
import { IssuesModule } from './module/issues/issues.module';

@Module({
  imports: [HttpModule, IssuesModule, CommitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
