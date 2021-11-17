import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommitService } from './commit.service';

@ApiTags('Commit')
@Controller('commits')
export class CommitController {
  constructor(private readonly commitService: CommitService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get commits',
  })
  @ApiQuery({ required: false, name: 'page', description: 'page number' })
  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'limit of records on one page',
  })
  @ApiQuery({
    required: false,
    name: 'filter',
    description: 'sha|message',
  })
  @Get()
  async getIssues(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('filter') filter: string = 'sha',
  ): Promise<Array<{}>> {
    if (filter != 'sha' && filter != 'message') filter = 'sha';
    return await this.commitService.getCommit(page, limit, filter);
  }
}
