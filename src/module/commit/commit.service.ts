import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommitService {
  constructor(private readonly httpService: HttpService) {}
  async getCommit(page, limit, filter) {
    const totalCount = (
      await this.httpService
        .get(
          `https://api.github.com/search/commits?page=1&q=repo:nodejs/node%20name:&sort=committer-date&order=desc`,
        )
        .toPromise()
    ).data.total_count;

    totalCount < limit ? (limit = totalCount) : 0;

    Math.floor(totalCount / limit) < page
      ? Math.floor((page = totalCount / limit))
      : 0;

    const data = (
      await this.httpService
        .get(
          `https://api.github.com/search/commits?page=${page}&per_page=${limit}&q=repo:nodejs/node%20name:&sort=committer-date&order=desc`,
        )
        .toPromise()
    ).data.items;

    if (filter == 'message')
      return data.map((i) => {
        return { message: i['commit'][filter] };
      });
    return data.map((i) => {
      return { hash: i[filter] };
    });
  }
}
