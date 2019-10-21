import { Injectable } from '@angular/core';
import { CommonDataService } from '../application-core/services/common-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from '../models/repository';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private commonDataService: CommonDataService) {
  }

  /**
   * function will return the list of {@class Repository} which contains
   * name as the repository name and appendedUrl as the relevant repo link
   * @param user GitHub username
   */
  getUserRepositories(user: string): Observable<Repository[]> {
    return this.commonDataService.get('users/' + user + '/repos').pipe(map((result: any[]) => result.map(
      item => ({ name: item.name, appendedUrl: item.full_name })
    )));
  }

  /**
   * function will return the url for the selected repository provided by the {@param appender}
   * @param appender appendedUrl which you retrieved by #getUserRepositories method
   */
  getReadMeLink(appender: string): Observable<{}> {
    return this.commonDataService.get('repos/' + appender + '/readme').pipe(map((result: any) => {
      return { download_url: result.download_url };
    }));
  }
}
