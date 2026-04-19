import { Component } from '@angular/core';
import { Google } from '../../../services/google';
import { appName } from '../../../globals';

@Component({
  standalone: true,
  selector: 'app-google-callback',
  imports: [],
  templateUrl: './google-callback.html',
  styleUrl: './google-callback.scss',
})
export class GoogleCallback {
  appName = appName;

  constructor(private google: Google) { }

  ngOnInit() {
    this.google.handleAuthCallback()
  }
}
