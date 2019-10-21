import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  readonly baseUrl = 'https://api.github.com/';
  constructor(private http: HttpClient) { }

  get(param: string) {
    return this.http.get(this.baseUrl + param);
  }
}
