import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../shared/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarUsersComponent } from './visualizar-users/visualizar-users.component';
import { ListagemUsersComponent } from './listagem-users/listagem-users.component';
import { CadastroUsersComponent } from './cadastro-users/cadastro-users.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroUsersComponent, ListagemUsersComponent, VisualizarUsersComponent]
})
export class UsersModule { }
