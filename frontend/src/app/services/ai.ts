import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewModel } from '../models/review';
import { apiUrl } from '../globals';

@Injectable({
  providedIn: 'root',
})
export class Ai {
  constructor(private http: HttpClient) { }

  reviewCode(code: string): Observable<ReviewModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ReviewModel>(
      `${apiUrl}/Chat`,
      JSON.stringify(code),
      { headers }
    );
  }
}
