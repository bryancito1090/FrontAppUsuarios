import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../Models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'https://localhost:7071/api/PrestamoFragmento1';

  constructor(private http: HttpClient) {}

  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  getPrestamo(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.apiUrl}/${id}`);
  }

  createPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  updatePrestamo(id: number, prestamo: Prestamo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, prestamo);
  }

  deletePrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
