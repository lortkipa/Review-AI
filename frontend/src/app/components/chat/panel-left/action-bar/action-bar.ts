import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-action-bar',
  imports: [],
  templateUrl: './action-bar.html',
  styleUrl: './action-bar.scss',
})
export class ActionBar {
  @Input() disableReviewBtn: boolean = true;
  @Input() disableFixBtn: boolean = true;

  @Output() submitReview = new EventEmitter()
  emitSubmitReview() {
    this.submitReview.emit()
  }
}
