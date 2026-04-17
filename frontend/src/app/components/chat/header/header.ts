import { Component } from '@angular/core';
import { appName } from '../../../globals';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  appName = appName
}
