import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Admin } from 'src/models/admin';
import { JwtDto } from 'src/models/jwtDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(admin: Admin): Observable<JwtDto> {

    return this.http.post<JwtDto>('http://localhost:8080/login', admin)
  }
}
