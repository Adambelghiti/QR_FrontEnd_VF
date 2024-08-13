import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrepot } from './entrepot';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {
  private apiUrl = 'http://localhost:8080/api/entrepots'; // Replace with your actual API URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getEntrepots(): Observable<Entrepot[]> {
    return this.http.get<Entrepot[]>(this.apiUrl);
  }

  getEntrepotById(id: number): Observable<Entrepot> {
    return this.http.get<Entrepot>(`${this.apiUrl}/${id}`);
  }

  createEntrepot(entrepot: Entrepot): Observable<Entrepot> {
    return this.http.post<Entrepot>(this.apiUrl, entrepot, this.httpOptions);
  }

  updateEntrepot(id: number, entrepot: Entrepot): Observable<Entrepot> {
    return this.http.put<Entrepot>(`${this.apiUrl}/${id}`, entrepot, this.httpOptions);
  }

  deleteEntrepot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
