import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-score-card',
  imports: [CommonModule],
  templateUrl: './score-card.html',
  styleUrl: './score-card.scss',
})
export class ScoreCard {
  @Input() score: number = 50

  @Input() criticalErrCount: number = 0
  @Input() mediumErrCount: number = 0
  @Input() lowErrCount: number = 0

  radius = 28;
  circumference = 2 * Math.PI * this.radius;

  get dashOffset(): number {
    return this.circumference * (1 - this.score / 100);
  }

  get scoreColor(): string {
    if (this.score >= 80) return '#22c55e';
    if (this.score >= 50) return '#fbbf24';
    return '#f87171';
  }
}
