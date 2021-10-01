import { UsuarioService } from './usuario/usuario.service';
import { Login } from 'src/app/models/login';
import { LogadoSucesso } from 'src/app/models/logado-sucesso';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "https://app-pinguino.herokuapp.com/v1/account/login";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  logar(login: Login): Observable<HttpResponse<any>> {
    return this.http.post(this.baseUrl, login, 
      {observe: 'response'}).pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.usuarioService.salvaToken(authToken);
        })
        );
  }
 
}
