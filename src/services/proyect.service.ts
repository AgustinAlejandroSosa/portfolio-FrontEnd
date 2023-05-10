import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyect } from 'src/models/proyect';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private apiUrl = 'http://localhost:8080/proyect';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los elementos
  getAll(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(`${this.apiUrl}/get`);
  }

  // Método para obtener un elemento por su ID
  getById(id: number): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo elemento
  create(proyect: Proyect): Observable<Proyect> {
    return this.http.post<Proyect>(`${this.apiUrl}`, proyect);
  }

  // Método para actualizar un elemento existente
  update(id: number, proyect: Proyect): Observable<Proyect> {
    return this.http.put<Proyect>(`${this.apiUrl}/${id}`, proyect);
  }

  // Método para eliminar un elemento existente
  delete(id: number): Observable<Proyect> {
    return this.http.delete<Proyect>(`${this.apiUrl}/${id}`);
  }

}