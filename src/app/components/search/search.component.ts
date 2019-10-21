import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  userName = new FormControl();
  errorMessage = '';
  disabled = false;

  constructor(private gitHubService: GithubService,
              private router: Router) {
  }

  ngOnInit() {
  }

  getUserDetails() {
    this.disabled = true;
    this.gitHubService.getUserRepositories(this.userName.value).subscribe((result: Repository[]) => {
      this.disabled = false;
      // navigate to the UserDetailComponent when Array<Repository> is received, pass the data using `queryParams`
      this.router.navigate(['/user-detail'],
        {
          queryParams: {
            user: this.userName.value,
            repoDetail: JSON.stringify(result)
          },
          skipLocationChange: true
        });
      // browser URL change was disabled
    }, error => {
      // set error when no user has found with the name provided
      this.disabled = false;
      this.userName.setErrors(['Invalid username']);
      this.errorMessage = 'Invalid username';
    });
  }

  // clear the error when user modifies his input
  onChange() {
    this.errorMessage = null;
    this.userName.setErrors(null);
  }

}
