import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsersComponent } from './users/cadastro-users/cadastro-users.component';
import { ListagemUsersComponent } from './users/listagem-users/listagem-users.component';
import { VisualizarUsersComponent } from './users/visualizar-users/visualizar-users.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full'
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: ListagemUsersComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroUsersComponent
          },
          {
            path: ':id',
            component: CadastroUsersComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarUsersComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'users' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
