import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platform_id: Object, ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username: username, password: password }).pipe(
      tap(response => {
        console.log(response.access_token)
        localStorage.setItem('token', response.access_token);
      }),
      catchError(error=>{
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platform_id)){
      let helper = new JwtHelperService();
      let token = localStorage.getItem('token');
      console.log(token, helper.isTokenExpired(token));
      return !!token && !helper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
