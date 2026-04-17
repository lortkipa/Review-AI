import { Component } from '@angular/core';
import { Header } from "./header/header";
import { PanelLeft } from "./panel-left/panel-left";
import { PanelRight } from "./panel-right/panel-right";

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [Header, PanelLeft, PanelRight],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {}
