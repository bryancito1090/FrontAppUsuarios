import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../Models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiUrl = 'https://localhost:7071/api/libros'; 

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  createLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  updateLibro(id: number, libro: Libro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, libro);
  }

  deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
