import { Component, Input } from '@angular/core';
import { EmptyState } from "./empty-state/empty-state";
import { ReviewModel } from '../../../../models/review';
import { Loading } from "./loading/loading";
import { Issues } from "./issues/issues";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-content',
  imports: [EmptyState, Loading, Issues, CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})

export class Content {
  @Input() review: ReviewModel|null = null;
  @Input() loading: boolean = false;
}
