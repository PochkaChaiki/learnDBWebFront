import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = 'http://localhost:8080/api/query';

  constructor(private http: HttpClient) { }

  getQueries(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getQuery(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  addQuery(query: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.apiUrl, query, { headers });
  }

}

export class Query {
    query_id: number;
    script: string;
    info: string;
    executed_at: string;
    user_id: number;
    db_id: number;
    constructor(query_id: number, script: string, info: string, executed_at: string, user_id: number, db_id: number) {
        this.query_id = query_id;
        this.script = script;
        this.info = info;
        this.executed_at = executed_at;
        this.user_id = user_id;
        this.db_id = db_id;
    }
}