import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/models/estado';
import { Pais } from 'src/app/models/pais';
import { EstadosService } from 'src/app/services/estados.service';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-estados-view',
  templateUrl: './estados-view.component.html',
  styleUrls: ['./estados-view.component.css']
})
export class EstadosViewComponent implements OnInit {

  estados = new Array<Estado>();
  paises = new Array<Pais>();

  constructor(
    private service: EstadosService,
    private paisesService: PaisesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.paisesService.get().subscribe(
      result => { 
        this.paises = result; 
        this.service.get().subscribe(
          result => {
            this.estados = result; 
            this.estados.forEach(
              e => e.paisNome = this.paises.find(p => p.id == e.pais)?.descricao ?? ''
            )
          }
        )
      }
    )    
  }

  create(): void {
    this.router.navigate(["/estados/create"]);
  }

}
