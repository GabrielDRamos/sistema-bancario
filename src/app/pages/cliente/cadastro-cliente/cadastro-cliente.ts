import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../shared/models/cliente';
import { ClienteService } from '../../../shared/services/cliente/cliente-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.html',
  styleUrls: ['./cadastro-cliente.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, ReactiveFormsModule]
})
export class CadastroCliente implements OnInit{
  editar: boolean;
  formGroup: FormGroup;


  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute){
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      observacoes: new FormControl('', Validators.required),
      ativo: new FormControl(true)
    });
    this.editar = false
  }


  ngOnInit(): void {
    if (this.route.snapshot.params["id"]){
      this.editar = true
      this.clienteService.pesquisarPorId(this.route.snapshot.params["id"]).subscribe(
        cliente => {
          this.formGroup.patchValue(cliente)
        }
      )
    }
  }


  cadastrar() {
    const cliente: Cliente = this.formGroup.value;
    if (this.editar) {
      this.clienteService.atualizar(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar cliente!',
          });
        }
      });
    } else {
      // Modo de criação
      this.clienteService.inserir(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar cliente!',
          });
        }
      });
    }
  }
}
