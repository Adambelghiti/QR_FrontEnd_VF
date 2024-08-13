import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8080/api/fournisseurs'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }

  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiUrl}/${id}`);
  }

  createFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Fournisseur>(this.apiUrl, fournisseur, { headers });
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Fournisseur>(`${this.apiUrl}/${id}`, fournisseur, { headers });
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
