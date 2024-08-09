import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private apiUrl = 'https://localhost:7071/api/Empleados'; 
  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
