import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../Services/autor.service';
import { Autor } from '../../Models/autor.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {
  autores: Autor[] = [];
  autor: Autor = new Autor();
  editMode: boolean = false;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.getAutores();
  }

  getAutores(): void {
    this.autorService.getAutores().subscribe(data => {
      console.log(data); // Añade esto para ver los datos recibidos
      this.autores = data;
    });
  }
  

  createAutor(): void {
    this.autorService.createAutor(this.autor).subscribe(() => {
      this.getAutores();
      this.autor = new Autor();
    });
  }
  

  editAutor(autor: Autor): void {
    this.autor = { ...autor };
    this.editMode = true;
  }

  updateAutor(): void {
    if (this.autor.autorid !== undefined) {
      this.autorService.updateAutor(this.autor.autorid, this.autor).subscribe(() => {
        this.getAutores();
        this.autor = new Autor();
        this.editMode = false;
      });
    }
  }

  deleteAutor(id: number): void {
    this.autorService.deleteAutor(id).subscribe(() => {
      this.getAutores();
    });
  }

  clearForm(): void {
    this.autor = new Autor();
    this.editMode = false;
  }
}