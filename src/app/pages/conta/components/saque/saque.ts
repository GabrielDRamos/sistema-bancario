import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Conta } from '../../../../shared/models/conta';
import { SaqueDeposito } from '../../../../shared/models/saqueDeposito';
import { ClienteService } from '../../../../shared/services/cliente/cliente-service';
import { ContaService } from '../../../../shared/services/conta/conta-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-saque',
  imports: [MatInputModule, MatFormFieldModule, MatRadioModule, MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './saque.html',
  styleUrl: './saque.scss'
})
export class Saque {
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
    this.contaService.listar().subscribe(contas => {
      this.clienteService.listar().subscribe(clientes => {
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
    const saque: SaqueDeposito = this.formGroup.value;
      // Modo de criação
      this.contaService.saque(saque).subscribe({
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
        error: (error) => {
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