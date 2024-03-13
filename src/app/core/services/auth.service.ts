import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router
  ) {
    this.setUserToken();
  }

  setUserToken() {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.userToken.next(token);
    }
  }

  signUp(formData: UserData): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}signUp`, formData);
  }
  signIn(formData: UserData): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}signIn`, formData);
  }
  signOut() {
    localStorage.removeItem('token');
    this.userToken.next(null);
    this._Router.navigate(['signin']);
  }
}
