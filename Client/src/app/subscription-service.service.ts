import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Users } from './users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable()
export class SubscriptionServiceService {

  constructor(private http:HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  addSubscriber(users: Users): Observable<any>{
    console.log('Inside addSubscriber');
    console.log(users);
    var body = 'emailId='+users.emailId+'&city='+users.city;
    return this.http.post('http://localhost:3000/users',body,httpOptions)
      .pipe(map(data => console.log(data)))
  }

  /*
  private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

  private handleError(error: any){
    let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
  }*/


}
