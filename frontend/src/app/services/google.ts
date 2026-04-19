import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { apiUrl } from '../globals';
import { Router } from '@angular/router';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/google-callback',
  clientId: '938488875928-d3elcob7rtthbkev4ii400tq2nv4krdf.apps.googleusercontent.com',
  scope: 'openid profile email',

  responseType: 'token id_token',
  showDebugInformation: true
};

@Injectable({
  providedIn: 'root',
})
export class Google {

  constructor(private oAuthService: OAuthService, private http: HttpClient, private router: Router) {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocument();
  }

  auth() {
    this.oAuthService.initLoginFlow(undefined, { prompt: 'select_account' });
  }

  logout() {
    this.oAuthService.logOut();
  }

  handleAuthCallback() {
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.oAuthService.hasValidIdToken()) {
        console.error('login failed');
        return;
      }

      const idToken = this.oAuthService.getIdToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.http.post(`${apiUrl}/Auth/Google`, JSON.stringify(idToken), { headers }).subscribe({
          next: (res: any) => {
            localStorage.setItem('token', res.message);
            this.router.navigate(['/chat'])
          },
          error: (err) => {
            console.error('Backend login failed', err);
          }
        });
    });
  }


  // =========================
  // 2. HANDLE REDIRECT CALLBACK
  // =========================

}