import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { Endereco } from 'src/app/models/endereco';
import { EnderecosService } from 'src/app/services/enderecos.service';

@Component({
  selector: 'app-enderecos-view',
  templateUrl: './enderecos-view.component.html',
  styleUrls: ['./enderecos-view.component.css']
})

export class EnderecosViewComponent implements OnInit {

  enderecos = new Array<Endereco>();
  municipios = new Array<Municipio>();

  constructor(
    private service: EnderecosService,
    private municipiosService: MunicipiosService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.municipiosService.get().subscribe(
      result => { 
        this.municipios = result; 
        this.service.get().subscribe(
          result => {
            this.enderecos = result; 
            this.enderecos.forEach(
              e => e.municipioDescricao = this.municipios.find(m => m.id == e.municipio)?.descricao ?? ''              
            )
          }
        )
      }
    )    
  }

  get(): void {
    this.service.get().subscribe(
      result => {
        this.enderecos = result;
      }
    );
  }

  create(): void{
    this.router.navigate(['/enderecos/create']);
  }
}
