import { Component, input, Input } from '@angular/core';
import { ScoreCard } from "./score-card/score-card";
import { SectionTitle } from './section-title/section-title';
import { Issue } from './issue/issue';
import { IssueModel } from '../../../../../models/issue';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-issues',
  imports: [SectionTitle, Issue, CommonModule, ScoreCard],
  templateUrl: './issues.html',
  styleUrl: './issues.scss',
})
export class Issues {
  @Input() score: number = 50
  @Input() issues: IssueModel[] = []
}
