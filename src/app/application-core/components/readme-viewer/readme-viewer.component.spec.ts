import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmeViewerComponent } from './readme-viewer.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { GithubService } from '../../../services/github.service';
import { of, throwError } from 'rxjs';

describe('ReadmeViewerComponent', () => {
  let component: ReadmeViewerComponent;
  let fixture: ComponentFixture<ReadmeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadmeViewerComponent ],
      imports: [
        MarkdownModule.forChild(),
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update() method when set the input', () => {
    spyOn(component, 'update');
    component.appender = 'random-append';
    expect(component.update).toHaveBeenCalled();
  });

  it('should set url when service return the data', () => {
    spyOn(fixture.debugElement.injector.get(GithubService), 'getReadMeLink').and.callFake(appender => {
      return of({
        download_url: 'some-random-url'
      });
    });
    component.update();
    expect(component.hasErrors).toBeFalsy();
  });

  it('should set error when service return the no data', () => {
    spyOn(fixture.debugElement.injector.get(GithubService), 'getReadMeLink').and.callFake(appender => {
      return throwError('some-random-error');
    });
    component.update();
    expect(component.hasErrors).toBeTruthy();
  });
});
