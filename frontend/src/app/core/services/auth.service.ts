import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LoginApiResponse,
  LoginRequest,
  LoginUser
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/Auth/login`;
  private isLoggedInState = false;
  private currentUser: LoginUser | null = null;
  private currentLocations: LoginUser['user_Locations'] = [];

  constructor() {
    this.clearSessionState();
  }

  login(credentials: LoginRequest): Observable<LoginApiResponse> {

    const requestBody = {
      API_Action: 'GetLoginData',
      Device_Id: 'D001',
      Sync_Time: '',
      Company_Code: 'info@enhanzer.com',
      API_Body: {
        Username: credentials.email,
        Pw: credentials.password
      }
    };

    return this.http.post<LoginApiResponse>(
      this.apiUrl,
      requestBody
    ).pipe(
      tap(response => {
        if (response.status_Code === 200 && response.response_Body?.length) {
          this.currentUser = response.response_Body[0];
          this.currentLocations = this.currentUser.user_Locations ?? [];
          this.isLoggedInState = true;

          sessionStorage.clear();
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedInState;
  }

  getUser(): LoginUser | null {
    return this.currentUser;
  }

  getLocations(): LoginUser['user_Locations'] {
    return this.currentLocations;
  }

  logout(): void {
    this.clearSessionState();
    sessionStorage.clear();
  }

  private clearSessionState(): void {
    this.isLoggedInState = false;
    this.currentUser = null;
    this.currentLocations = [];
  }
}