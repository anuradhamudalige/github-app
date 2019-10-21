import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'app-readme-viewer',
  templateUrl: './readme-viewer.component.html'
})
export class ReadmeViewerComponent implements OnInit {
  /**
   * set input to download the ReadMe.md
   * @param value same value set as appendedUrl when you retrieve data for the user
   */
  @Input() set appender(value) {
    this._appender = value;
    this.update();
  }

  private _appender;
  // _url$;
  _url = '';
  hasErrors = true;

  constructor(private githubService: GithubService) {
  }

  ngOnInit() {
  }

  /**
   * method will retrieve ReadMe.md URL for the given repository.
   */
  update() {
    const that = this;
    // this._url$ = this.githubService.getReadMeLink(this._appender);
    this.githubService.getReadMeLink(this._appender).subscribe(
      (result: any) => {
        that.hasErrors = false;
        that._url = result.download_url;
      },
      error => {
        that.hasErrors = true;
      });
  }
}
