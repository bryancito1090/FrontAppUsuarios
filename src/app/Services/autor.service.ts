import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../Models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = 'https://localhost:7071/api/Autores'; 

  constructor(private http: HttpClient) { }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.apiUrl}`);
  }

  getAutor(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`);
  }

  createAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  updateAutor(id: number, autor: Autor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, autor);
  }

  deleteAutor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
