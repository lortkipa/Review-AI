import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile';
import { apiUrl } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  constructor(private http: HttpClient){}

  get(): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${apiUrl}/Profile`)
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${apiUrl}/Auth/Logout`, {})
  }
}
