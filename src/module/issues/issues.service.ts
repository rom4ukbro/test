import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IssuesService {
  constructor(private readonly httpService: HttpService) {}
  async getIssues(page, limit) {
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
          `https://api.github.com/search/issues?page=${page}&per_page=${limit}&q=repo:nodejs/node&sort=number&order=desc`,
        )
        .toPromise()
    ).data.items;

    return data.map((i) => {
      return {
        title: i['title'],
        number: i['number'],
        link: i['html_url'],
      };
    });
  }
}
