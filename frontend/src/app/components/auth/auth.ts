import { Component } from '@angular/core';
import { apiUrl, appName } from '../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Google } from '../../services/google';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  appName = appName;

  constructor(private google: Google) { }

  continueWithGoogle() {
    this.google.auth()
  }
}