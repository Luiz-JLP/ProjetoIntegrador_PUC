import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { Endereco } from 'src/app/models/endereco';
import { EstadosService } from 'src/app/services/estados.service';
import { Estado } from 'src/app/models/estado';
import { Pais } from 'src/app/models/pais';
import { PaisesService } from 'src/app/services/paises.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enderecos-create',
  templateUrl: './enderecos-create.component.html',
  styleUrls: ['./enderecos-create.component.css']
})
export class EnderecosCreateComponent implements OnInit {

  title = "Novo Endereco";
  isUpdate: boolean = false;

  endereco = new Endereco();

  municipios_all = new Array<Municipio>();
  estados_all = new Array<Estado>();
  paises_all = new Array<Pais>();

  municipios = new Array<Municipio>();
  estados = new Array<Estado>();
  paises = new Array<Pais>();

  formGroup = new FormGroup({});

  constructor(
    private service: EnderecosService,
    private municipiosService: MunicipiosService,
    private estadosService: EstadosService,
    private paisesService: PaisesService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {
    this.load();
    this.buildGroup();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isUpdate = true;
      this.get(id);
      this.title = "Editar Endereço";
    }
  }

  buildGroup(): void {
    this.formGroup.addControl("id", new FormControl());    
    this.formGroup.addControl("cep", new FormControl('', Validators.required));
    this.formGroup.addControl("logradouro", new FormControl('', Validators.required));
    this.formGroup.addControl("numero", new FormControl('', Validators.required));
    this.formGroup.addControl("complemento", new FormControl());
    this.formGroup.addControl("municipio", new FormControl('', Validators.required));
    this.formGroup.addControl("estado", new FormControl());
    this.formGroup.addControl("pais", new FormControl());

    this.formGroup.controls["pais"].setValue("1");
  }

  buildObject(): void {
    this.endereco.cep = this.formGroup.controls["cep"].value;
    this.endereco.logradouro = this.formGroup.controls["logradouro"].value;
    this.endereco.numero = this.formGroup.controls["numero"].value;
    this.endereco.complemento = this.formGroup.controls["complemento"].value;
    this.endereco.municipio = this.formGroup.controls["municipio"].value;
  }

  loadValues(): void {
    this.formGroup.controls["id"].setValue(this.endereco.id);
    this.formGroup.controls["cep"].setValue(this.endereco.cep);
    this.formGroup.controls["logradouro"].setValue(this.endereco.logradouro);
    this.formGroup.controls["numero"].setValue(this.endereco.numero);
    this.formGroup.controls["complemento"].setValue(this.endereco.complemento);
    this.formGroup.controls["municipio"].setValue(this.endereco.municipio);
    this.formGroup.controls["estado"].setValue("26");
    this.formGroup.controls["pais"].setValue("1");
  }

  load(): void {  
    this.paisesService.get().subscribe(
      result => { 
        this.paises_all = result; 
        this.paises = result;
        this.estadosService.get().subscribe(
          result => {
            this.estados_all = result; 
            this.estados = this.estados_all.filter(e => e.pais.id == 1);
            this.municipiosService.get().subscribe(
              result => { 
                this.municipios_all = result; 
                this.municipios = result;
            });
        });
    });       
  }

  get(id: string): void {

    this.municipiosService.get().subscribe(
      result => {
        this.municipios = result;
        this.service.getOne(id).subscribe(
          result => {
            this.endereco = result;
            this.endereco.municipioDescricao = this.municipios.find(m => m.id == this.endereco.municipio)?.descricao ?? ' '
            this.loadValues();
          } 
        )
      }
    )
  }

  save(): void {
    this.buildObject();
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

  paisSelectionChange(event: MatOptionSelectionChange): void {
    if (event.isUserInput)
    {
      console.log("Evento")
      this.estados = new Array<Estado>();
      this.estados = this.estados_all.filter(e => e.pais.id == parseInt(event.source.value));

      this.formGroup.controls["estado"].setValue('');
      this.formGroup.controls["municipio"].setValue('');
    }
  }

}
