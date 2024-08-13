import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/articles';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticleBySerialNumber(serialNumber: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${serialNumber}`);
  }

  createArticle(article: any): Observable<any> {
    return this.http.post(this.apiUrl, article, this.httpOptions);
  }

  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, article, this.httpOptions);
  }

  deleteArticle(serialNumber: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${serialNumber}`);
  }

  getQrCode(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
  }
}
