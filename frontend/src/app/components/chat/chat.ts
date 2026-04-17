import { Component } from '@angular/core';
import { Header } from "./header/header";

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [Header],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {}
