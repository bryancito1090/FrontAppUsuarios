import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontAppUsuarios';
  horaActual?: string;
  fechaActual?: string;
  constructor(
    private router: Router
  ) { 
    const hoy = new Date();
    this.fechaActual = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;
    this.horaActual = this.obtenerHoraActual();
    setInterval(() => {
      this.horaActual = this.obtenerHoraActual();
    }, 1000);
  }
  
  obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString();
  }
  ngOnInit(): void {
  }
navigateToAutores(): void {
    this.router.navigate(['/autores']);
  }
  navigateToCategorias(): void {
    this.router.navigate(['/categorias']);
  }
  navigateToLibros(): void {
    this.router.navigate(['/libros']);
  }
navigateToUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }
  navigateToEmpleados(): void { 
    this.router.navigate(['/empleados']);
  }
  navigateToPrestamos(): void {
    this.router.navigate(['/prestamos']);
  }
  navigateToAuditorias(): void {
    this.router.navigate(['/auditorias']);
  }
}