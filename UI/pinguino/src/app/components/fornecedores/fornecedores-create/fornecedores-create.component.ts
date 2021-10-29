import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { Endereco } from 'src/app/models/endereco';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { Fornecedor } from 'src/app/models/fornecedor';

@Component({
  selector: 'app-fornecedores-create',
  templateUrl: './fornecedores-create.component.html',
  styleUrls: ['./fornecedores-create.component.css']
})

export class FornecedoresCreateComponent implements OnInit {

  title = "Novo Fornecedor";
  isUpdate: boolean = false;

  fornecedor = new Fornecedor();
  enderecos = new Array<Endereco>();

  constructor(
    private service: FornecedoresService,
    private enderecosService: EnderecosService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {

    this.carregarEnderecos();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isUpdate = true;
      this.get(id);
      this.title = "Editar Fornecedor";
    }
  }

  carregarEnderecos(): void {

    this.enderecosService.get().subscribe(
      result => { 
        this.enderecos = result;
      }
    )
  }

  get(id: string): void {

    this.enderecosService.get().subscribe(
      result => {
        this.enderecos = result;
        this.service.getOne(id).subscribe(
          result => {
            this.fornecedor = result;
            this.fornecedor.enderecoLogradouro= this.enderecos.find(e => e.id == this.fornecedor.endereco)?.logradouro ?? ''
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
    this.service.createOne(this.fornecedor).subscribe(
      result => {
        this.message.show("Fornecedor incluído com sucesso.");
        this.router.navigate(['/fornecedores']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.fornecedor).subscribe(
      result => {
        this.message.show("Fornecedor atualizado com sucesso.");
        this.router.navigate(['/fornecedores']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }

}
