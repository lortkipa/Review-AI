import { Component } from '@angular/core';
import { ScoreCard } from "./score-card/score-card";
import { SectionTitle } from './section-title/section-title';
import { Issue } from './issue/issue';

@Component({
  standalone: true,
  selector: 'app-issues',
  imports: [ScoreCard, SectionTitle, Issue],
  templateUrl: './issues.html',
  styleUrl: './issues.scss',
})
export class Issues {}
