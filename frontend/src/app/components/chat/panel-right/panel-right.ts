import { Component } from '@angular/core';
import { Header } from './header/header';
import { Issues } from "./issues/issues";

@Component({
  standalone: true,
  selector: 'app-panel-right',
  imports: [Header, Issues],
  templateUrl: './panel-right.html',
  styleUrl: './panel-right.scss',
})
export class PanelRight { }
