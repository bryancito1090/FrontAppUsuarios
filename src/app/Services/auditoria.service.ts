import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auditoria } from '../Models/auditoria.model';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private apiUrl = 'https://localhost:7071/api/Auditorias';

  constructor(private http: HttpClient) { }

  getAuditorias(): Observable<Auditoria[]> {
    return this.http.get<Auditoria[]>(this.apiUrl);
  }
}
