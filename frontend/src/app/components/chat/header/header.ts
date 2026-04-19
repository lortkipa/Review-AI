import { Component, Input, signal } from '@angular/core';
import { appName } from '../../../globals';
import { RouterLink } from "@angular/router";
import { ProfileModel } from '../../../models/profile';
import { CommonModule } from '@angular/common';
import { Auth } from '../../auth/auth';
import { Profile } from '../../../services/profile';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() user: ProfileModel | null = null

  appName = appName

  showDropdown = signal<boolean>(false)

  constructor(private profile: Profile){}

  toggleDropdown() {
    this.showDropdown.set(!this.showDropdown())
  }

  logout() {
    this.profile.logout().subscribe({
      next: () => { localStorage.removeItem('token'); location.reload() },
      error: () => { localStorage.removeItem('token') }
    })
  }
}
