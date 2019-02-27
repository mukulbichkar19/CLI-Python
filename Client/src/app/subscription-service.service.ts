import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Users } from './users';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable()
export class SubscriptionServiceService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  addSubscriber(users: Users): Observable<any> {
    var body = 'emailId=' + users.emailId + '&city=' + users.city;
    return this.http.post('http://localhost:3000/users', body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

}
