import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private apiUrl = 'https://localhost:7071/api/Prestamos';  
  constructor(private http: HttpClient) { }

  getPrestamos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
