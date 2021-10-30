import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { Fornecedor } from 'src/app/models/fornecedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from 'src/app/services/message-box.service';


@Component({
  selector: 'app-produtos-create',
  templateUrl: './produtos-create.component.html',
  styleUrls: ['./produtos-create.component.css']
})
export class ProdutosCreateComponent implements OnInit {

  title = "Novo Produto";
  isUpdate: boolean = false;

  produto = new Produto();
  fornecedores = new Array<Fornecedor>();

  constructor(
    private service: ProdutoService,
    private fornecedoresService: FornecedoresService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {

    this.carregarFornecedores();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isUpdate = true;
      this.get(parseInt(id)); 
      this.title = "Editar Município";
    }
  }

  carregarFornecedores(): void {

    this.fornecedoresService.get().subscribe(
      result => {
        this.fornecedores = result;
      }
    )
  }

  get(id: number): void {

    this.fornecedoresService.get().subscribe(
      result => {
        this.fornecedores = result;
        this.service.getOne(id).subscribe(
          result => {
            this.produto = result;
            this.produto.fornecedorNome = this.fornecedores.find(f => f.id == this.produto.fornecedor)?.nome ?? ' '
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
    this.service.createOne(this.produto).subscribe(
      result => {
        this.message.show("Produto incluído com sucesso.");
        this.router.navigate(['/produtos']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.produto).subscribe(
      result => {
        this.message.show("Produto atualizado com sucesso.");
        this.router.navigate(['/produtos']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

}
 