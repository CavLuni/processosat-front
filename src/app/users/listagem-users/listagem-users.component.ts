import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from 'src/app/core/users.service';
import { User } from 'src/app/shared/models/user';
import { ConfigParams } from 'src/app/shared/models/config-params';

@Component({
  selector: 'dio-listagem-users',
  templateUrl: './listagem-users.component.html',
  styleUrls: ['./listagem-users.component.scss']
})
export class ListagemUsersComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigParams = {
    pagina: 0,
    limite: 100
  };
  users: User[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

    this.listarUsers();
  }
/*
  onScroll(): void {
    this.listarUsers();
  }
*/
  abrir(id: number): void {
    this.router.navigateByUrl('/users/' + id);
  }

  inserir(): void {
    this.router.navigateByUrl('/users/cadastro/');
  }

  editar(id: number): void {
    this.router.navigateByUrl('/users/cadastro/' + id);
  }

  private listarUsers(): void {
    this.config.pagina++;
    this.usersService.listar(this.config)
      .subscribe((users: User[]) => this.users.push(...users));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.users = [];
    this.listarUsers();
  }
}
