import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from 'src/models/experience';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = 'http://localhost:8080/experience';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/get`);
  }

  getById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/${id}`);
  }

  create(experience: Experience): Observable<any> {
    return this.http.post<Experience>(`${this.apiUrl}`, Experience);
  }

  update(id: number, experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, experience);
  }

  delete(id: number): Observable<Experience> {
    return this.http.delete<Experience>(`${this.apiUrl}/${id}`);
  }

  sendPhoto(date: Date): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.post<string>(`${this.apiUrl}/prueba`, date, { headers });
  }

}