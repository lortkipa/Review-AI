import { Component, Input, signal } from '@angular/core';
import { IssueModel } from '../../../../../../models/issue';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-issue',
  imports: [CommonModule],
  templateUrl: './issue.html',
  styleUrl: './issue.scss',
})
export class Issue {
  @Input() issue: IssueModel = {
    severity: '',
    title: '',
    description: '',
    lines: [],
    explanation: ''
  }

  showExplanation = signal<boolean>(false)
  toggleExplanation() {
    this.showExplanation.set(!this.showExplanation())
  }
}
