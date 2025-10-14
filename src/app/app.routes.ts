import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCliente } from './pages/cliente/cadastro-cliente/cadastro-cliente';
import { ListagemCliente } from './pages/cliente/listagem-cliente/listagem-cliente';
import { LoginForm } from './pages/auth/login-form/login-form';
import { LoginTemplate } from './pages/auth/login-template/login-template';
import { ListagemConta } from './pages/conta/listagem-conta/listagem-conta';
import { CadastroConta } from './pages/conta/cadastro-conta/cadastro-conta';
import { Deposito } from './pages/operacoes/deposito/deposito';
import { Transferencia } from './pages/operacoes/transferencia/transferencia';
import { Saque } from './pages/operacoes/saque/saque';


export const routes: Routes = [
  {
    path: 'auth',
    component: LoginTemplate
  },
    {
    path: 'cliente',
    children: [
      {
        path: 'novo',
        component: CadastroCliente
      },
      {
        path: 'editar/:id',
        component: CadastroCliente
      },
      {
        path: '',
        component: ListagemCliente,
      },
    ]
  },
   {
    path: 'conta',
    children: [
      {
        path: 'novo',
        component: CadastroConta
      },
      {
        path: 'editar/:id',
        component: CadastroConta
      },
      {
        path: '',
        component: ListagemConta,
      },
    ]
  },
  {
    path: 'operacoes',
    children: [
      {
        path: 'deposito',
        component: Deposito
      },
      {
        path: 'transferencia',
        component: Transferencia
      },
      {
        path: 'saque',
        component: Saque,
      },
    ]
  },
  {
    path: '',
    component: ListagemConta,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
