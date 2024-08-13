import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricant } from './fabricant';

@Injectable({
  providedIn: 'root'
})
export class FabricantService {
  private apiUrl = 'http://localhost:8080/api/fabricants'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getFabricants(): Observable<Fabricant[]> {
    return this.http.get<Fabricant[]>(this.apiUrl);
  }

  getFabricantById(id: number): Observable<Fabricant> {
    return this.http.get<Fabricant>(`${this.apiUrl}/${id}`);
  }

  createFabricant(fabricant: Fabricant): Observable<Fabricant> {
    console.log("fabricant=="+JSON.stringify(fabricant));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Fabricant>(this.apiUrl, fabricant, { headers });
  }

  updateFabricant(id: number, fabricant: Fabricant): Observable<Fabricant> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Fabricant>(`${this.apiUrl}/${id}`, fabricant, { headers });
  }

  deleteFabricant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
