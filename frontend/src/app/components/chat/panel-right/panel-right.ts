import { Component } from '@angular/core';
import { Header } from './header/header';
import { Content } from "./content/content";

@Component({
  standalone: true,
  selector: 'app-panel-right',
  imports: [Header, Content],
  templateUrl: './panel-right.html',
  styleUrl: './panel-right.scss',
})
export class PanelRight { }
