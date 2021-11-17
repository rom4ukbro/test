import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CommitController } from './commit.controller';
import { CommitService } from './commit.service';

@Module({
  imports: [HttpModule],
  controllers: [CommitController],
  providers: [CommitService],
  exports: [CommitService],
})
export class CommitModule {}
