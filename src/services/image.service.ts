import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from 'src/models/Image';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = "https://portfolio-backend-tklx.onrender.com/image"

  constructor(private http: HttpClient) { }

  saveImage(image: FormData): Observable<any> {
    return this.http.post(this.apiUrl, image);
  }

  getImage(id: number): Observable<Image> {
    return this.http.get<Image>(this.apiUrl);
  }
}