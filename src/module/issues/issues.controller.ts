import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IssuesService } from './issues.service';

@ApiTags('Issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get issues',
  })
  @ApiQuery({ required: false, name: 'page', description: 'page number' })
  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'limit of records on one page',
  })
  @Get()
  async getIssues(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<Array<{}>> {
    return await this.issuesService.getIssues(page, limit);
  }
}
