import { Component, OnInit } from '@angular/core';
import { Libro } from '../../Models/libro.model';
import { LibroService } from '../../Services/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {

  libros: Libro[] = [];
  libro: Libro = new Libro();
  editMode = false;

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.libroService.getLibros().subscribe(data => {
      console.log(data);
      
      this.libros = data;
    });
  }

  createLibro(): void {
    this.libroService.createLibro(this.libro).subscribe(() => {
      this.getLibros();
      this.clearForm();
    });
  }

  editLibro(libro: Libro): void {
    this.libro = { ...libro };
    this.editMode = true;
  }

  updateLibro(): void {
    if (this.libro.libroid) {
      this.libroService.updateLibro(this.libro.libroid, this.libro).subscribe(() => {
        this.getLibros();
        this.clearForm();
      });
    }
  }

  deleteLibro(id: number): void {
    this.libroService.deleteLibro(id).subscribe(() => {
      this.getLibros();
    });
  }

  clearForm(): void {
    this.libro = new Libro();
    this.editMode = false;
  }
}
