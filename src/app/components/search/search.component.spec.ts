import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ApplicationCoreModule } from '../../application-core/application-core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GithubService } from '../../services/github.service';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserDetailComponent } from '../user-detail/user-detail.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, UserDetailComponent ],
      imports: [ ApplicationCoreModule, NoopAnimationsModule,
        RouterTestingModule.withRoutes([{ path: 'user-detail', component: UserDetailComponent }])]
    });
    router = TestBed.get(Router);
    TestBed.compileComponents().then(() => {
      router.initialNavigation();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain provided place holder', () => {
    expect(fixture.debugElement.nativeElement.querySelector('input').placeholder).toContain('GitHub user name');
  });

  it('should clear error messages when onChange method is called', () => {
    component.errorMessage = 'some random error';
    component.onChange();
    expect(component.errorMessage).toBe(null);
  });

  it('should clear errors on form controller when onChange method is called', () => {
    component.userName.setErrors(['some random error']);
    component.onChange();
    expect(component.userName.errors).toBe(null);
  });

  it('should not display the send button when no value is entered', () => {
    expect(fixture.debugElement.nativeElement.querySelector('button')).toBe(null);
  });

  it('should display the send button when any value is entered', () => {
    component.userName.patchValue('some');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').textContent).toContain('send');
  });

  it('should call the getUserDetails method when user clicks on the send button', () => {
    spyOn(component, 'getUserDetails');
    component.userName.patchValue('some');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('[name=btn-send]')).triggerEventHandler('click', null);
    expect(component.getUserDetails).toHaveBeenCalled();
  });

  it('should navigate to the \'/user-detail\' router path when getUserDetails method is called', () => {
    spyOn(fixture.debugElement.injector.get(GithubService), 'getUserRepositories').and.callFake((user: string) => {
      return of([
        {
          'name': 'somename',
          'full_name': 'somename/random-repo'
        }
      ]);
    });
    component.userName.patchValue('some');
    fixture.detectChanges();
    component.getUserDetails();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.url.split('?')[0]).toBe('/user-detail');
    });
  });

  it('should set error message when no repo is found', () => {
    spyOn(fixture.debugElement.injector.get(GithubService), 'getUserRepositories').and.callFake(() => {
      return throwError('fake error');
    });
    component.userName.patchValue('some');
    fixture.detectChanges();
    component.getUserDetails();
    expect(component.errorMessage).toContain('Invalid username');
  });
});
