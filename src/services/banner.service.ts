import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner } from 'src/models/banner';
import { TokenService } from './token.service';
import { Image } from 'src/models/Image';

@Injectable({
  providedIn: 'root'
})

export class BannerService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private apiUrl = 'https://portfolio-backend-tklx.onrender.com/banner';

  get(): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/get`);
  }

  create(image: FormData): Observable<Banner> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.post<Banner>(`${this.apiUrl}`, image, { headers });
  }

  update(id: number, banner: Banner, token: string): Observable<Banner> {
    return this.http.put<Banner>(`${this.apiUrl}/${id}`, banner);
  }

  // Método para eliminar un elemento existente
  delete(): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
    return this.http.delete<any>(`${this.apiUrl}/delete`, { headers });
  }

}