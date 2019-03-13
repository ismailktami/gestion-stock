import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  authenticated = true;
  constructor() { }
  authenticate(credentials: any, callback: any) {
    this.authenticated = true;
    if (credentials.username === 'user' && credentials.password === 'pass' ) {
      this.authenticated = true;
      console.log(this.authenticated);

    } else {
      console.log(this.authenticated);
    }
    return callback && callback();
  }




}
