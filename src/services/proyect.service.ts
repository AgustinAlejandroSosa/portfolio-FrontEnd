import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyect } from 'src/models/proyect';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  private apiUrl = 'https://portfolio-backend-tklx.onrender.com/proyect';

  constructor(private http: HttpClient, private tokenService: TokenService) { }


  getAll(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(`${this.apiUrl}/get`);
  }

  getById(id: number): Observable<Proyect> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() })
    return this.http.get<Proyect>(`${this.apiUrl}/get/${id}`, { headers });
  }

  create(proyect: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() })
    return this.http.post<any>(`${this.apiUrl}`, proyect, { headers });
  }

  update(id: number, proyect: FormData): Observable<Proyect> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() })
    return this.http.put<Proyect>(`${this.apiUrl}/edit/${id}`, proyect, { headers });
  }

  delete(id: number): Observable<Proyect> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() })
    return this.http.delete<Proyect>(`${this.apiUrl}/delete/${id}`, { headers });
  }

}