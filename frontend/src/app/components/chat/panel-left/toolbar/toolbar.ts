import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  @Input() language: string = ''
}
