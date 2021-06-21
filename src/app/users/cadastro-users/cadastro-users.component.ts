import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';


import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { UsersService } from 'src/app/core/users.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'dio-cadastro-users',
  templateUrl: './cadastro-users.component.html',
  styleUrls: ['./cadastro-users.component.scss']
})
export class CadastroUsersComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private usersService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.usersService.visualizar(this.id)
        .subscribe((user: User) => this.criarFormulario(user));
    } else {
      this.criarFormulario(this.criarUserEmBranco());
    }

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const user = this.cadastro.getRawValue() as User;
    if (this.id) {
      user.id = this.id;
      user.ativo = true;
      this.editar(user);
    } else {
      this.salvar(user);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(user: User): void {
    this.cadastro = this.fb.group({
      nome: [user.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [user.urlFoto, [Validators.minLength(10)]],
      email: [user.email, [Validators.required]],
      telefone: [user.telefone, [Validators.minLength(2), Validators.maxLength(256)]],
    });
  }

  private criarUserEmBranco(): User {
    return {
      id: null,
      nome: null,
      urlFoto: null,
      email: null,
      telefone: null,
      ativo: true,
      
    } as User;
  }

  private salvar(user: User): void {
    this.usersService.salvar(user).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo usuário',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('users');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(user: User): void {
    this.usersService.editar(user).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('users'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
