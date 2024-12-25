import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:8080/api/answer';

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getAnswer(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  addAnswer(answer: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.apiUrl, answer, { headers });
  }

  deleteAnswer(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}

export class Answer {
    answer_id: number
    answer: string
    is_correct: boolean
    question_id: number
    query_id: number
    constructor(answer_id: number, answer: string, is_correct: boolean, question_id: number, query_id: number) {
        this.answer_id = answer_id
        this.answer = answer
        this.is_correct = is_correct
        this.question_id = question_id
        this.query_id = query_id
    }
}
