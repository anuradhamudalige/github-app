import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { CommonDataService } from '../application-core/services/common-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('GithubService', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CommonDataService]
      });
    }
  );

  it('should be created', () => {
    const service: GithubService = TestBed.get(GithubService);
    expect(service).toBeTruthy();
  });

  it('should call get() method when each method is called', () => {
    const service: GithubService = TestBed.get(GithubService);
    const commonDataService: CommonDataService = TestBed.get(CommonDataService);
    spyOn(commonDataService, 'get').and.returnValue(of([]));
    service.getUserRepositories('random-user');
    service.getReadMeLink('random-readme');
    expect(commonDataService.get).toHaveBeenCalledTimes(2);
  });

  it('should return only the expected values when getUserRepositories() method is called', () => {
    const service: GithubService = TestBed.get(GithubService);
    const commonDataService: CommonDataService = TestBed.get(CommonDataService);

    spyOn(commonDataService, 'get').and.returnValue(of(repoStub));

    service.getUserRepositories('random-user').subscribe(result => {
      expect(result.length).toBe(2);
      expect(result[0]['node_id']).not.toBeDefined();
      expect(result[0].name).toContain('first-neural-network');
    });
  });

  it('should return only the expected values when getReadMeLink() method is called', () => {
    const service: GithubService = TestBed.get(GithubService);
    const commonDataService: CommonDataService = TestBed.get(CommonDataService);

    spyOn(commonDataService, 'get').and.returnValue(of(readMeStub));

    service.getReadMeLink('random-user').subscribe((result: any) => {
      expect(result['name']).not.toBeDefined();
      expect(result.download_url).toContain('https://raw.githubusercontent.com/anuradhamudalige/github-app/master/README.md');
    });
  });
});

const repoStub = [
  {
    node_id: 'MDEwOlJlcG9zaXRvcnkxMTM4NDQzNjQ=',
    name: 'first-neural-network',
    full_name: 'anuradhamudalige/first-neural-network'
  },
  {
    node_id: 'MDEwOlJlcG9zaXRvcnkxMTM4NDQzNjQ=2',
    name: 'first-neural-network2',
    full_name: 'anuradhamudalige/first-neural-network2'
  }
];

const readMeStub = {
  'name': 'README.md',
  'download_url': 'https://raw.githubusercontent.com/anuradhamudalige/github-app/master/README.md'
};
