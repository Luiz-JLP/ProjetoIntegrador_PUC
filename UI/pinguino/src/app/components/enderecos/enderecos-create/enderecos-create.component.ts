import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { Endereco } from 'src/app/models/endereco';

@Component({
  selector: 'app-enderecos-create',
  templateUrl: './enderecos-create.component.html',
  styleUrls: ['./enderecos-create.component.css']
})
export class EnderecosCreateComponent implements OnInit {

  title = "Novo Endereco";
  isUpdate: boolean = false;

  endereco = new Endereco();
  municipios = new Array<Municipio>();

  constructor(
    private service: EnderecosService,
    private municipiosService: MunicipiosService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {

    this.carregarMunicipios();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isUpdate = true;
      this.get(id);
      this.title = "Editar Endereço";
    }
  }

  carregarMunicipios(): void {

    this.municipiosService.get().subscribe(
      result => {
        this.municipios = result;
      }
    )
  }

  get(id: string): void {

    this.municipiosService.get().subscribe(
      result => {
        this.municipios = result;
        this.service.getOne(id).subscribe(
          result => {
            this.endereco = result;
            this.endereco.municipioDescricao = this.municipios.find(m => m.id == this.endereco.municipio)?.descricao ?? ' '
          } 
        )
      }
    )
  }

  save(): void {
    if (this.isUpdate)
      this.updateOne();
    else
      this.create();
  }

  create(): void {
    this.service.createOne(this.endereco).subscribe(
      result => {
        this.message.show("Endereco incluído com sucesso.");
        this.router.navigate(['/enderecos']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.endereco).subscribe(
      result => {
        this.message.show("Endereco atualizado com sucesso.");
        this.router.navigate(['/enderecos']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/enderecos']);
  }

}
