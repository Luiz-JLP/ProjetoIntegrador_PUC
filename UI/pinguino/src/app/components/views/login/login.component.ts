import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = { login: '', senha: ''};

  constructor(
    private message: MessageBoxService,
    private service: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.service.save(this.login).subscribe(
      retorno => {  }
    )
  }

  // this.router.navigate("/");

}
