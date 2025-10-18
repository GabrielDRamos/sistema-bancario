import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCliente } from './pages/cliente/cadastro-cliente/cadastro-cliente';
import { ListagemCliente } from './pages/cliente/listagem-cliente/listagem-cliente';
//import { LoginForm } from './pages/auth/login-form/login-form';
import { LoginTemplate } from './pages/auth/login-template/login-template';
import { ListagemConta } from './pages/conta/listagem-conta/listagem-conta';
import { CadastroConta } from './pages/conta/cadastro-conta/cadastro-conta';
import { Deposito } from './pages/conta/components/deposito/deposito';
import { Saque } from './pages/conta/components/saque/saque';
import { TransferenciaConta } from './pages/conta/components/transferencia/transferencia';



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
        path: 'saque',
        component: Saque
      },
      {
        path: 'deposito',
        component: Deposito
      },
      {
        path: 'transferencia',
        component: TransferenciaConta
      },
      {
        path: '',
        component: ListagemConta,
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
