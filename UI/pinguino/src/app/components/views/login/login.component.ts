import { Component, OnInit } from '@angular/core';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  codigo = 'Código Criado';

  constructor(
    private message: MessageBoxService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.message.show(this.codigo);
  }

}
