import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Experience } from 'src/models/experience';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl = 'http://localhost:8080/education';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAll(): Observable<Experience[]> {
    return (this.http.get<Experience[]>(`${this.apiUrl}/get`));
  }

  getById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/${id}`);
  }

  create(experience: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.post<any>(`${this.apiUrl}`, experience, { headers });
  }

  update(id: number, experience: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.put<any>(`${this.apiUrl}/edit/${id}`, experience, { headers });
  }

  delete(id: number): Observable<Experience> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.delete<Experience>(`${this.apiUrl}/delete/${id}`, { headers });
  }
}