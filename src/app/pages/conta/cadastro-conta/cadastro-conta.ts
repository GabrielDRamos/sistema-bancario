import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../shared/models/cliente';
import { Conta } from '../../../shared/models/conta';
import { ClienteService } from '../../../shared/services/cliente/cliente-service';
import { ContaService } from '../../../shared/services/conta/conta-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-cadastro-conta',
  imports: [MatInputModule, MatFormFieldModule, MatRadioModule, MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-conta.html',
  styleUrl: './cadastro-conta.scss'
})
export class CadastroConta {
   editar;
  formGroup: FormGroup;
  clientes: Cliente[]




  constructor(private clienteService: ClienteService, private contaService: ContaService, private router: Router, private route: ActivatedRoute){
    this.editar = false
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero: new FormControl('', Validators.required),
      agencia: new FormControl('', Validators.required),
      saldo: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required)
    });
    this.clientes = []
  }




  ngOnInit(): void {
    if (this.route.snapshot.params["id"]){
      this.editar = true
      this.contaService.pesquisarPorId(this.route.snapshot.params["id"]).subscribe(
        cliente => {
          this.formGroup.patchValue(cliente)
        }
      )
    }
    this.listarClientes()
  }




  listarClientes(): void{
    this.clienteService.listar().subscribe(values => {
      this.clientes = values
    })
  }








  cadastrar() {
    const conta: Conta = this.formGroup.value;
    if (this.editar) {
      this.contaService.atualizar(conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta atualizada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar conta!',
          });
        }
      });
    } else {
      // Modo de criação
      this.contaService.inserir(conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta cadastrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar conta!',
          });
        }
      });
    }
  }


}
