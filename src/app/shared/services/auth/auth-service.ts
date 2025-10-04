import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../models/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = `${environment.api}/token/` ;

  constructor(private clienteHttp: HttpClient, private router: Router) { }

  login(data: Auth) {
    return this.clienteHttp.post(this.api, data).subscribe(
      {
        next: (response: any) => {   
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login error', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário e/ou senha inválidos!',
          });
        }
      }
    ); 
  }

  refreshToken(refresh: string) {
    return this.clienteHttp.post(`${this.api}refresh/`, { refresh });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth']);
  }
}