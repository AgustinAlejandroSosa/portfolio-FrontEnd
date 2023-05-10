import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from 'src/models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = 'http://localhost:8080/skill';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los elementos
  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/get`);
  }

  // Método para obtener un elemento por su ID
  getById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo elemento
  create(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}`, skill);
  }

  // Método para actualizar un elemento existente
  update(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
  }

  // Método para eliminar un elemento existente
  delete(id: number): Observable<Skill> {
    return this.http.delete<Skill>(`${this.apiUrl}/${id}`);
  }

}