import { Component, signal } from '@angular/core';
import { Header } from "./header/header";
import { PanelLeft } from "./panel-left/panel-left";
import { PanelRight } from "./panel-right/panel-right";
import { Ai } from '../../services/ai';
import { ReviewModel } from '../../models/review';
import { Profile } from '../../services/profile';
import { ProfileModel } from '../../models/profile';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [Header, PanelLeft, PanelRight],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  user = signal<ProfileModel|null>(null)
  
  code = signal<string>('')

  review = signal<ReviewModel | null>(null)
  isAiProcessing = signal<boolean>(false)

  constructor(private ai: Ai, private profile: Profile, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) return;

    this.profile.get().subscribe({
      next: (profile) => { this.user.set(profile) },
      error: () => {}
    })
  }

  updateCode(code: string) {
    this.code.set(code)
  }

  submitReview() {
    this.isAiProcessing.set(true)

    this.ai.reviewCode(this.code()).subscribe({
      next: (res) => {
        this.review.set(res)
        this.isAiProcessing.set(false)
      },
      error: (res) => {
        this.isAiProcessing.set(false)
      }
    })
  }
}
