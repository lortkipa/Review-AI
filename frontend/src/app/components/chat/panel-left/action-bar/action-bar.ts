import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-action-bar',
  imports: [],
  templateUrl: './action-bar.html',
  styleUrl: './action-bar.scss',
})
export class ActionBar {
  constructor(private router: Router) { }

  @Input() disableBtns: boolean = true;

  @Output() submitReview = new EventEmitter()
  emitSubmitReview() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth'])
      return
    }

    this.submitReview.emit()
  }

  emitFixCode() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth'])
      return
    }
  }
}
