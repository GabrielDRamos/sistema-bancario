import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {Usuario} from '../models/usuario.ts/usuario.ts';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    api = `${environment.api}/usuarios`;

    constructor(private httpClient: HttpClient){}

    inserir(novoUsuario: Usuario): Observable<Usuario>{
      return this.httpClient.post<Usuario>(this.api, novoUsuario);
    }

    listar(): Observable<Usuario[]>{
      return this.httpClient.get<Usuario[]>(this.api);
    }

    listar_paginado(page: number, pageSize: number): Observable<Usuario[]>{
      return this.httpClient.get<Usuario[]>(`${this.api}?page=${page}&pageSize=${pageSize}`);
    }
    
    deletar(idUsuario: number): Observable<object>{
      return this.httpClient.delete(`${this.api}/${idUsuario}`);}

      pesquisarPorId(id: number): Observable<Usuario> {
      return this.httpClient.get<Usuario>(`${this.api}/${id}`);
    }


    atualizar(usuario: Usuario): Observable<Usuario> {
      return this.httpClient.put<Usuario>(`${this.api}${usuario.id}`, usuario);
    }

  }


