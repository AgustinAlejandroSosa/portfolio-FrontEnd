import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from 'src/models/profile';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://portfolio-backend-tklx.onrender.com/profile';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  get(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/get`);
  }

  create(profile: Profile): Observable<Profile> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.post<Profile>(`${this.apiUrl}`, profile, { headers });
  }

  savePhoto(image: FormData): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.post<any>(`${this.apiUrl}/savePhoto`, image, { headers });
  }

  update(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}