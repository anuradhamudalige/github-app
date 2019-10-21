import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  username = '';
  _repoDetails: Array<Repository> = [];
  _selectedRepo: Repository;
  constructor(private route: ActivatedRoute) {
    // retrieve data passed by the router (from SearchComponent)
    this.username = this.route.snapshot.queryParams.user;
    this._repoDetails = JSON.parse(this.route.snapshot.queryParams.repoDetail);
  }

  ngOnInit() {
  }

}
