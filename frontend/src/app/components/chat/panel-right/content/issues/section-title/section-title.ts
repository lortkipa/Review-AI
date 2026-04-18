import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
})
export class SectionTitle {
  @Input() title: string = ''
}
