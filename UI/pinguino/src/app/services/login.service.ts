import { Login } from 'src/app/models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  save(login: Login): Observable<string> {
    return this.http.post<string>(this.baseUrl, login, this.httpOptions );
  }
}
