import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from '../shared/models/config-params';



const url = 'https://sat-selection.herokuapp.com/users/';// 'http://localhost:8080/users/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }


  salvar(user: User): Observable<User> {
    return this.http.post<User>(url, user);
  }

  editar(user: User): Observable<User> {
    return this.http.put<User>(url + user.id, user);
  }

  listar(config: ConfigParams): Observable<User[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<User[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<User> {
    return this.http.get<User>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
