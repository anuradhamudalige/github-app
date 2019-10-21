import { TestBed } from '@angular/core/testing';

import { CommonDataService } from './common-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CommonDataService', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      httpMock = TestBed.get(HttpTestingController);
    }
  );

  it('should be created', () => {
    const service: CommonDataService = TestBed.get(CommonDataService);
    expect(service).toBeTruthy();
  });

  it('should return users when relevant params passed', () => {
    const service: CommonDataService = TestBed.get(CommonDataService);

    const randomUsers = [
      { randomName: 'randomName' },
      { randomName: 'randomName' }
    ];

    service.get('users/random').subscribe(users => {
      expect(users).toEqual(randomUsers);
    });

    const req = httpMock.expectOne(`${service.baseUrl}users/random`);
    expect(req.request.method).toBe('GET');
    req.flush(randomUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
