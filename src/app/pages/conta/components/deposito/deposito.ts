import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { SaqueDeposito } from '../../../../shared/models/saqueDeposito';
import { ContaService } from '../../../../shared/services/conta/conta-service';
import { Conta } from '../../../../shared/models/conta';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../shared/services/cliente/cliente-service';

@Component({
  selector: 'app-deposito',
  imports: [MatInputModule, MatFormFieldModule, MatRadioModule, MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.scss'
})
export class Deposito {
  formGroup: FormGroup;
  contas: Conta[]

  constructor(private contaService: ContaService, private router: Router, private clienteService: ClienteService){

    this.formGroup = new FormGroup({
      valor: new FormControl('', Validators.required),
      conta: new FormControl('', Validators.required)
    });
    this.contas = []
  }
  ngOnInit(): void {
    this.listarContas()
  }

  listarContas(): void{
    this.contaService.listar().subscribe((contas: any[]) => {
      this.clienteService.listar().subscribe((clientes: any[]) => {
        const contasComNomesDeClientes = contas.map(conta => {
          const cliente = clientes.find(cliente => cliente.id === conta.cliente);
          if (cliente) {
            conta.nomeCliente = cliente.nome;
          }
          return conta;
        });
        this.contas = contasComNomesDeClientes;
      });
    })
  }

  cadastrar() {
    const deposito: SaqueDeposito = this.formGroup.value;
      // Modo de criação
      this.contaService.saque(deposito).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Saque registrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta']);
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao registrar saque!',
          });
        }
      });
    }
}
