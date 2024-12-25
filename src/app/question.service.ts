import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8080/api/question';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getQuestion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addQuestion(question: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.apiUrl, question, { headers });
  }

  updateQuestion(question: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<any>(this.apiUrl, question, { headers });
  }

  deleteQuestion(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}

export class Question {
    question_id: number;
    question_text: string;
    correct_answer: string; 
    dbsample_id: number;
    constructor(question_id: number, question_text: string, correct_answer: string, dbsample_id: number) {
        this.question_id = question_id;
        this.question_text = question_text;
        this.correct_answer = correct_answer;
        this.dbsample_id = dbsample_id;
    }
}