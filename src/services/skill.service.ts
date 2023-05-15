import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from 'src/models/skill';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://localhost:8080/skill';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getHardSkills(): Observable<Skill[]> {

    return this.http.get<Skill[]>(`${this.apiUrl}/get/hard`);
  }

  getSoftSkills(): Observable<Skill[]> {

    return this.http.get<Skill[]>(`${this.apiUrl}/get/soft`);
  }

  getAll(): Observable<Skill[]> {

    return this.http.get<Skill[]>(`${this.apiUrl}/get`);
  }

  getById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/get/${id}`);
  }

  create(skill: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.post<any>(`${this.apiUrl}`, skill, { headers });
  }

  update(id: number, skill: FormData): Observable<Skill> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.put<Skill>(`${this.apiUrl}/edit/${id}`, skill, { headers });
  }

  delete(id: number): Observable<Skill> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.delete<Skill>(`${this.apiUrl}/delete/${id}`, { headers });
  }

}